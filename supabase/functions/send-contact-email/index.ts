import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sendCopy: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message, 
      sendCopy 
    }: ContactEmailRequest = await req.json();

    const fullName = `${firstName} ${lastName}`;
    
    // Email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Invest-Ex Support <onboarding@resend.dev>",
      to: ["invest.exch@gmail.com"],
      subject: `Новое обращение: ${subject}`,
      html: `
        <h2>Новое обращение от ${fullName}</h2>
        <p><strong>Имя:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Тема:</strong> ${subject}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send copy to sender if requested
    if (sendCopy) {
      const copyEmailResponse = await resend.emails.send({
        from: "Invest-Ex Support <onboarding@resend.dev>",
        to: [email],
        subject: `Копия вашего обращения: ${subject}`,
        html: `
          <h2>Копия вашего обращения</h2>
          <p>Здравствуйте, ${firstName}!</p>
          <p>Это копия вашего обращения в службу поддержки Invest-Ex.</p>
          <hr>
          <p><strong>Тема:</strong> ${subject}</p>
          <p><strong>Сообщение:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Мы ответим вам в течение 48 часов в рабочее время.</p>
          <p>С уважением,<br>Команда Invest-Ex</p>
        `,
      });
      console.log("Copy email sent successfully:", copyEmailResponse);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
