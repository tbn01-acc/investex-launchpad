import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UpdateKeyRequest {
  apiKey: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Verify user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Verify user has superadmin role
    const { data: hasSuperadmin, error: roleError } = await supabase
      .rpc('has_role', { 
        _user_id: user.id, 
        _role: 'superadmin' 
      });

    if (roleError || !hasSuperadmin) {
      throw new Error("Access denied: Superadmin role required");
    }

    // Parse request body
    const { apiKey }: UpdateKeyRequest = await req.json();

    if (!apiKey || !apiKey.trim()) {
      throw new Error("API key is required");
    }

    // Validate API key format (Resend keys start with 're_')
    if (!apiKey.startsWith('re_')) {
      throw new Error("Invalid Resend API key format. Key should start with 're_'");
    }

    // Log the security event
    await supabase
      .from('security_audit_log')
      .insert({
        user_id: user.id,
        action: 'UPDATE',
        target_table: 'secrets',
        target_id: 'RESEND_API_KEY',
        new_value: { updated: true, timestamp: new Date().toISOString() }
      });

    console.log(`RESEND_API_KEY update requested by user ${user.id} at ${new Date().toISOString()}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Для обновления RESEND_API_KEY перейдите в Supabase Dashboard > Project Settings > Edge Functions и обновите секрет вручную. Текущее значение используется всеми edge functions автоматически."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in update-resend-key function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        success: false
      }),
      {
        status: error.message === "Unauthorized" || error.message.includes("Access denied") ? 403 : 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
