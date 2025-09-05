import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TokenVerificationRequest {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token }: TokenVerificationRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ 
          valid: false,
          error: "Token is required" 
        }),
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
      .select("user_id, email, expires_at, used_at, created_at")
      .eq("token", token)
      .maybeSingle();

    if (findError) {
      console.error("Error finding reset request:", findError);
      return new Response(
        JSON.stringify({ 
          valid: false,
          error: "Failed to verify token" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resetRequest) {
      return new Response(
        JSON.stringify({ 
          valid: false,
          error: "Invalid token" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Проверяем, не истёк ли токен
    const now = new Date();
    const expiresAt = new Date(resetRequest.expires_at);
    const createdAt = new Date(resetRequest.created_at);
    
    if (now > expiresAt) {
      return new Response(
        JSON.stringify({ 
          valid: false,
          error: "Token has expired",
          expired: true,
          expiresAt: resetRequest.expires_at
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Проверяем, не был ли токен уже использован
    if (resetRequest.used_at) {
      return new Response(
        JSON.stringify({ 
          valid: false,
          error: "Token has already been used",
          used: true,
          usedAt: resetRequest.used_at
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Получаем информацию о пользователе из профиля
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("user_id", resetRequest.user_id)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      // Не критично, продолжаем без имени пользователя
    }

    // Вычисляем оставшееся время действия токена
    const timeRemaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
    const minutesRemaining = Math.floor(timeRemaining / 60);

    console.log("Token verification successful for user:", resetRequest.user_id);

    return new Response(
      JSON.stringify({ 
        valid: true,
        email: resetRequest.email,
        userName: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : null,
        expiresAt: resetRequest.expires_at,
        timeRemaining: timeRemaining,
        minutesRemaining: minutesRemaining,
        createdAt: resetRequest.created_at
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in password-reset-verify function:", error);
    return new Response(
      JSON.stringify({ 
        valid: false,
        error: "An unexpected error occurred while verifying the token" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);