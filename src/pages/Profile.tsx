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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AVAILABLE_ROLES = ['freelancer', 'investor', 'founder', 'outsourcer', 'contractor'] as const;

type Role = typeof AVAILABLE_ROLES[number];

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

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
        .select('role')
        .eq('user_id', user.id);
      if (!error && data) {
        setUserRoles(data.map(r => r.role as Role));
      }
    };
    fetchRoles();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName || null,
          last_name: lastName || null,
          bio: bio || null,
          role: currentRole || profile?.role,
        })
        .eq('user_id', user.id);

      if (error) throw error;
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
    const { error } = await supabase.from('user_roles').insert({ user_id: user.id, role: newRole });
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
        <div className="container mx-auto px-4 space-y-8">
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
                      {AVAILABLE_ROLES.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full md:w-auto" onClick={handleSave} disabled={saving}>
                  {saving ? 'Сохранение...' : t('common.save')}
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
                  {userRoles.map((r) => (
                    <Badge key={r} variant="secondary">{r}</Badge>
                  ))}
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
                        {AVAILABLE_ROLES
                          .filter(r => !userRoles.includes(r))
                          .map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddRole} disabled={!newRole}>Добавить</Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Удаление ролей будет доступно позже.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
