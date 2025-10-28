import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, Monitor, Smartphone, Tablet, X, CheckCircle } from 'lucide-react';

interface DeviceFingerprint {
  id: string;
  fingerprint_hash: string;
  device_info: any;
  browser_info: string;
  ip_address: string;
  is_authorized: boolean;
  last_seen_at: string;
  authorized_at: string | null;
  created_at: string;
}

interface UserSession {
  id: string;
  fingerprint_id: string;
  started_at: string;
  last_activity_at: string;
  is_active: boolean;
}

export const DeviceManagement = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState<DeviceFingerprint[]>([]);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [terminateDialogOpen, setTerminateDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchDevices();
      fetchSessions();
    }
  }, [user]);

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase
        .from('device_fingerprints')
        .select('*')
        .eq('user_id', user?.id)
        .order('last_seen_at', { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error: any) {
      console.error('Error fetching devices:', error);
      toast.error('Ошибка при загрузке устройств');
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .order('last_activity_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleAuthorizeDevice = async (deviceId: string) => {
    try {
      const { data, error } = await supabase.rpc('authorize_device', {
        p_fingerprint_id: deviceId
      });

      if (error) throw error;
      
      const result = data as any;
      if (result?.success) {
        toast.success('Устройство успешно авторизовано');
        fetchDevices();
      } else {
        toast.error(result?.error || 'Не удалось авторизовать устройство');
      }
    } catch (error: any) {
      console.error('Error authorizing device:', error);
      toast.error('Ошибка при авторизации устройства');
    }
  };

  const confirmRevokeDevice = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setRevokeDialogOpen(true);
  };

  const handleRevokeDevice = async () => {
    if (!selectedDevice) return;

    try {
      const { data, error } = await supabase.rpc('revoke_device_authorization', {
        p_fingerprint_id: selectedDevice
      });

      if (error) throw error;

      const result = data as any;
      if (result?.success) {
        toast.success('Авторизация устройства отменена');
        fetchDevices();
        fetchSessions();
      } else {
        toast.error(result?.error || 'Не удалось отменить авторизацию');
      }
    } catch (error: any) {
      console.error('Error revoking device:', error);
      toast.error('Ошибка при отмене авторизации');
    } finally {
      setRevokeDialogOpen(false);
      setSelectedDevice(null);
    }
  };

  const confirmTerminateSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setTerminateDialogOpen(true);
  };

  const handleTerminateSession = async () => {
    if (!selectedSession) return;

    try {
      const { data, error } = await supabase.rpc('terminate_session', {
        p_session_id: selectedSession
      });

      if (error) throw error;

      const result = data as any;
      if (result?.success) {
        toast.success('Сессия завершена');
        fetchSessions();
      } else {
        toast.error(result?.error || 'Не удалось завершить сессию');
      }
    } catch (error: any) {
      console.error('Error terminating session:', error);
      toast.error('Ошибка при завершении сессии');
    } finally {
      setTerminateDialogOpen(false);
      setSelectedSession(null);
    }
  };

  const getDeviceIcon = (deviceInfo: any) => {
    if (!deviceInfo) return <Monitor className="h-5 w-5" />;
    const type = deviceInfo.type?.toLowerCase();
    if (type === 'mobile') return <Smartphone className="h-5 w-5" />;
    if (type === 'tablet') return <Tablet className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Authorized Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Авторизованные устройства</CardTitle>
            <CardDescription>
              Устройства, которые вы авторизовали для доступа к вашему аккаунту
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.filter(d => d.is_authorized).length === 0 ? (
                <p className="text-sm text-muted-foreground">Нет авторизованных устройств</p>
              ) : (
                devices.filter(d => d.is_authorized).map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.device_info)}
                      <div>
                        <p className="font-medium">{device.browser_info || 'Неизвестное устройство'}</p>
                        <p className="text-sm text-muted-foreground">
                          Последний вход: {formatDate(device.last_seen_at)}
                        </p>
                        <p className="text-xs text-muted-foreground">IP: {device.ip_address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Авторизовано
                      </Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmRevokeDevice(device.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Unauthorized Devices */}
        {devices.filter(d => !d.is_authorized).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Неавторизованные устройства</CardTitle>
              <CardDescription>
                Устройства, требующие вашей авторизации
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.filter(d => !d.is_authorized).map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.device_info)}
                      <div>
                        <p className="font-medium">{device.browser_info || 'Неизвестное устройство'}</p>
                        <p className="text-sm text-muted-foreground">
                          Попытка входа: {formatDate(device.created_at)}
                        </p>
                        <p className="text-xs text-muted-foreground">IP: {device.ip_address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Не авторизовано</Badge>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAuthorizeDevice(device.id)}
                      >
                        Авторизовать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Активные сессии</CardTitle>
            <CardDescription>
              Текущие активные сессии на ваших устройствах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Нет активных сессий</p>
              ) : (
                sessions.map((session) => {
                  const device = devices.find(d => d.id === session.fingerprint_id);
                  return (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getDeviceIcon(device?.device_info)}
                        <div>
                          <p className="font-medium">{device?.browser_info || 'Неизвестное устройство'}</p>
                          <p className="text-sm text-muted-foreground">
                            Начато: {formatDate(session.started_at)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Последняя активность: {formatDate(session.last_activity_at)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => confirmTerminateSession(session.id)}
                      >
                        Завершить
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revoke Device Dialog */}
      <AlertDialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение отмены авторизации</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите отменить авторизацию этого устройства? Все активные сессии на этом устройстве будут завершены.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeDevice}>
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Terminate Session Dialog */}
      <AlertDialog open={terminateDialogOpen} onOpenChange={setTerminateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение завершения сессии</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите завершить эту сессию? Пользователь будет отключен от системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleTerminateSession}>
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
