import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, password, action = 'login' } = await req.json();

    // Создаем Supabase клиент с service role для привилегированных запросов
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Для действий кроме логина проверяем, что вызывающий — авторизованный суперадмин
    if (action !== 'login') {
      const supabaseAuth = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: req.headers.get('Authorization') || '' } } }
      );

      const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: "Не авторизован" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: isSuperadmin, error: roleError } = await supabaseAdmin.rpc('has_role', { _user_id: user.id, _role: 'superadmin' });
      if (roleError || !isSuperadmin) {
        return new Response(
          JSON.stringify({ error: "Недостаточно прав" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (action === 'login') {
      // Проверка параметров логина
      if (!username || !password) {
        return new Response(
          JSON.stringify({ error: "Требуется логин и пароль" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Аутентификация администратора
      const { data: adminData, error: authError } = await supabaseAdmin
        .rpc('authenticate_admin', {
          p_username: username,
          p_password: password
        });

      if (authError || !adminData || adminData.length === 0) {
        console.error('Admin auth error:', authError);
        return new Response(
          JSON.stringify({ error: "Неверные данные для входа" }),
          { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      const admin = adminData[0];

      // Получаем статистику платформы
      const { data: stats, error: statsError } = await supabaseAdmin
        .rpc('get_platform_stats');

      if (statsError) {
        console.error('Stats error:', statsError);
      }

      return new Response(
        JSON.stringify({
          success: true,
          admin: {
            id: admin.user_id,
            username: admin.username,
            role: admin.role,
            lastLogin: admin.last_login
          },
          stats: stats || {}
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );

    } else if (action === 'getStats') {
      // Получаем только статистику (для обновления дашборда)
      const { data: stats, error: statsError } = await supabaseAdmin
        .rpc('get_platform_stats');

      if (statsError) {
        console.error('Stats error:', statsError);
        return new Response(
          JSON.stringify({ error: "Ошибка получения статистики" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      return new Response(
        JSON.stringify({ stats }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else if (action === 'getProjects') {
      // Получаем все проекты для суперадминистратора (service role обходит RLS)
      const { data: projects, error: projectsError } = await supabaseAdmin
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.error('Projects fetch error:', projectsError);
        return new Response(
          JSON.stringify({ error: "Ошибка получения проектов" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      return new Response(
        JSON.stringify({ projects: projects || [] }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Неизвестное действие" }),
      { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});