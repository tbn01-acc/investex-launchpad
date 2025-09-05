import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  token: string;
  newPassword: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, newPassword }: PasswordResetRequest = await req.json();

    if (!token || !newPassword) {
      return new Response(
        JSON.stringify({ error: "Token and new password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Валидация пароля
    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters long" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Инициализация Supabase клиента
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Находим запрос на восстановление пароля по токену
    const { data: resetRequest, error: findError } = await supabase
      .from("password_reset_requests")
      .select("user_id, email, expires_at, used_at")
      .eq("token", token)
      .maybeSingle();

    if (findError) {
      console.error("Error finding reset request:", findError);
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resetRequest) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Проверяем, не истёк ли токен
    const now = new Date();
    const expiresAt = new Date(resetRequest.expires_at);
    
    if (now > expiresAt) {
      return new Response(
        JSON.stringify({ error: "Token has expired. Please request a new password reset." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Проверяем, не был ли токен уже использован
    if (resetRequest.used_at) {
      return new Response(
        JSON.stringify({ error: "Token has already been used. Please request a new password reset." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Обновляем пароль пользователя в auth.users
    const { error: updatePasswordError } = await supabase.auth.admin.updateUserById(
      resetRequest.user_id,
      {
        password: newPassword
      }
    );

    if (updatePasswordError) {
      console.error("Error updating password:", updatePasswordError);
      return new Response(
        JSON.stringify({ error: "Failed to update password. Please try again." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Отмечаем токен как использованный
    const { error: markUsedError } = await supabase
      .from("password_reset_requests")
      .update({ used_at: new Date().toISOString() })
      .eq("token", token);

    if (markUsedError) {
      console.error("Error marking token as used:", markUsedError);
      // Не возвращаем ошибку, так как пароль уже обновлён
    }

    // Удаляем все остальные неиспользованные токены для этого пользователя
    const { error: cleanupError } = await supabase
      .from("password_reset_requests")
      .delete()
      .eq("user_id", resetRequest.user_id)
      .is("used_at", null);

    if (cleanupError) {
      console.error("Error cleaning up unused tokens:", cleanupError);
      // Не критично, токены очистятся автоматически
    }

    console.log("Password reset successful for user:", resetRequest.user_id);

    return new Response(
      JSON.stringify({ 
        message: "Password has been successfully updated. You can now log in with your new password." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in password-reset function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);