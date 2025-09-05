import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { PasswordResetEmail } from "./_templates/password-reset.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
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

    // Проверяем, существует ли пользователь с таким email
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, first_name, last_name")
      .eq("email", email)
      .single();

    if (profileError || !profile) {
      // Не раскрываем информацию о том, существует ли email
      return new Response(
        JSON.stringify({ 
          message: "If an account with this email exists, you will receive a password reset link." 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Генерируем токен для восстановления пароля
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 час

    // Сохраняем запрос на восстановление пароля
    const { error: insertError } = await supabase
      .from("password_reset_requests")
      .insert({
        user_id: profile.user_id,
        email: email,
        token: token,
        expires_at: expiresAt.toISOString(),
        ip_address: req.headers.get("x-forwarded-for") || "unknown",
        user_agent: req.headers.get("user-agent") || "unknown"
      });

    if (insertError) {
      console.error("Error saving password reset request:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Создаем ссылку для восстановления пароля
    const resetUrl = `${req.headers.get("origin") || "http://localhost:3000"}/reset-password?token=${token}`;

    // Генерируем HTML для письма
    const emailHtml = await renderAsync(
      React.createElement(PasswordResetEmail, {
        firstName: profile.first_name || "Пользователь",
        resetUrl: resetUrl,
        expiresAt: expiresAt.toLocaleString("ru-RU", {
          year: "numeric",
          month: "long", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      })
    );

    // Отправляем email
    const emailResponse = await resend.emails.send({
      from: "InvestEx <noreply@resend.dev>",
      to: [email],
      subject: "Восстановление пароля - InvestEx",
      html: emailHtml,
    });

    if (emailResponse.error) {
      console.error("Error sending email:", emailResponse.error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Password reset email sent successfully:", emailResponse.data);

    return new Response(
      JSON.stringify({ 
        message: "Password reset link has been sent to your email address." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in password-reset-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);