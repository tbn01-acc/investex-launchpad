import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DeviceManagement } from '@/components/DeviceManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ROLE_CATEGORIES = {
  "Инвесторы": [
    { value: 'investor', label: 'Инвестор' },
    { value: 'co_investor', label: 'Соинвестор' },
    { value: 'franchisee', label: 'Франчайзи' },
  ],
  "Стартап/Франшиза": [
    { value: 'founder', label: 'Фаундер' },
    { value: 'co_founder', label: 'Ко-фаундер' },
    { value: 'co_partner', label: 'Соучредитель' },
    { value: 'franchiser', label: 'Франчайзер' },
  ],
  "Исполнители": [
    { value: 'freelancer', label: 'Фрилансер' },
    { value: 'expert', label: 'Эксперт' },
    { value: 'consultant', label: 'Консультант' },
    { value: 'outsourcer', label: 'Аутсорсер' },
    { value: 'contractor', label: 'Подрядчик' },
  ],
  "Сотрудники": [
    { value: 'administrator', label: 'Администратор' },
    { value: 'employee', label: 'Сотрудник' },
    { value: 'job_seeker', label: 'Соискатель' },
  ],
  "Партнеры": [
    { value: 'ambassador', label: 'Амбассадор' },
    { value: 'partner', label: 'Партнер' },
    { value: 'blogger', label: 'Блогер' },
  ],
  "Администрация": [
    { value: 'superadmin', label: 'Суперадминистратор' },
  ],
} as const;

const AVAILABLE_ROLES = Object.values(ROLE_CATEGORIES).flat().map(r => r.value);

type Role = typeof AVAILABLE_ROLES[number];

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [currentRole, setCurrentRole] = useState<Role | ''>((profile?.role as Role) || '');
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<Role | ''>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
    setBio(profile?.bio || '');
    setCurrentRole((profile?.role as Role) || '');
  }, [profile]);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_roles')
        .select('role, is_current')
        .eq('user_id', user.id);
      if (!error && data) {
        const roles = data.map(r => r.role as Role);
        setUserRoles(roles);
        const current = (data as any[]).find(r => r.is_current);
        if (current) setCurrentRole(current.role as Role);
        setIsSuperadmin(roles.includes('superadmin' as Role));
      }
    };
    fetchRoles();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Обновляем текущую роль через безопасную RPC-функцию
      if (currentRole) {
        if (!userRoles.includes(currentRole)) {
          throw new Error('Выбранная роль не добавлена пользователю');
        }
        const { error: switchErr } = await (supabase.rpc as any)('switch_user_role', { p_role: currentRole as any });
        if (switchErr) throw switchErr;
      }

      const basePayload = {
        first_name: firstName || null,
        last_name: lastName || null,
        bio: bio || null,
        updated_at: new Date().toISOString(),
      };

      // Проверяем, есть ли профиль
      const { data: existing, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      if (existing) {
        const { error: updError } = await supabase
          .from('profiles')
          .update({ ...basePayload })
          .eq('user_id', user.id);
        if (updError) throw updError;
      } else {
        const { error: insError } = await supabase
          .from('profiles')
          .insert([{ user_id: user.id, ...basePayload }]);
        if (insError) throw insError;
      }

      await refreshProfile();
      toast({ title: t('common.success'), description: 'Профиль обновлен' });
    } catch (e: any) {
      toast({ title: t('common.error'), description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddRole = async () => {
    if (!user || !newRole) return;
    if (userRoles.includes(newRole)) {
      toast({ title: 'Роль уже добавлена', description: 'Выберите другую роль' });
      return;
    }
    const { error } = await supabase.from('user_roles').insert([{ user_id: user.id, role: newRole as any }]);
    if (error) {
      toast({ title: t('common.error'), description: error.message, variant: 'destructive' });
      return;
    }
    setUserRoles(prev => [...prev, newRole]);
    setNewRole('');
    toast({ title: t('common.success'), description: 'Роль добавлена' });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="devices">Устройства и сессии</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <header>
                <h1 className="text-3xl font-bold">Настройки профиля</h1>
                <p className="text-muted-foreground">Обновите свои данные и роли аккаунта</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Личные данные</CardTitle>
                <CardDescription>Имя, фамилия и описание профиля</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <div>
                  <Label>Текущая роль</Label>
                  <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as Role)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ROLE_CATEGORIES).map(([category, roles]) => {
                        // Скрыть категорию "Администрация" для не-суперадминов
                        if (category === "Администрация" && !isSuperadmin) return null;
                        
                        return (
                          <SelectGroup key={category}>
                            <SelectLabel>{category}</SelectLabel>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full md:w-auto" onClick={handleSave} disabled={saving}>
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Мои роли</CardTitle>
                <CardDescription>Добавьте дополнительные роли аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {userRoles.map((r) => {
                    const roleLabel = Object.values(ROLE_CATEGORIES)
                      .flat()
                      .find(role => role.value === r)?.label || r;
                    return (
                      <Badge key={r} variant="secondary">{roleLabel}</Badge>
                    );
                  })}
                  {userRoles.length === 0 && (
                    <p className="text-sm text-muted-foreground">Пока нет дополнительных ролей</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Добавить роль</Label>
                  <div className="flex gap-2">
                    <Select value={newRole} onValueChange={(v) => setNewRole(v as Role)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ROLE_CATEGORIES).map(([category, roles]) => {
                          // Скрыть категорию "Администрация" для не-суперадминов
                          if (category === "Администрация" && !isSuperadmin) return null;
                          
                          return (
                            <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {roles
                                .filter(role => !userRoles.includes(role.value as Role))
                                .map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddRole} disabled={!newRole}>Добавить</Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Удаление ролей будет доступно позже.</p>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <DeviceManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
