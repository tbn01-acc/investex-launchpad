import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  context?: string;
  projectId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, projectId }: ChatRequest = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Сообщение обязательно" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Необходима авторизация" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user from JWT
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Недействительный токен" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get user's API configuration
    const { data: apiConfig, error: configError } = await supabaseAdmin
      .rpc('get_user_api_config', { p_user_id: user.id });

    if (configError || !apiConfig || apiConfig.length === 0) {
      return new Response(
        JSON.stringify({ error: "API конфигурация не найдена. Настройте API ключи в настройках." }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const config = apiConfig[0];
    let apiResponse;

    // Make API call based on provider
    if (config.provider === 'openai') {
      apiResponse = await callOpenAI(config.api_key, config.model, message, context);
    } else if (config.provider === 'anthropic') {
      apiResponse = await callAnthropic(config.api_key, config.model, message, context);
    } else if (config.provider === 'openrouter') {
      apiResponse = await callOpenRouter(config.api_key, config.model, message, context);
    } else if (config.provider === 'perplexity') {
      apiResponse = await callPerplexity(config.api_key, config.model, message, context);
    } else {
      return new Response(
        JSON.stringify({ error: "Неподдерживаемый провайдер API" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Update last used timestamp
    await supabaseAdmin
      .from('user_api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('provider', config.provider);

    return new Response(
      JSON.stringify({ 
        response: apiResponse.content,
        provider: config.provider,
        model: config.model
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: any) {
    console.error('AI Chat error:', error);
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

async function callOpenAI(apiKey: string, model: string, message: string, context?: string) {
  const systemPrompt = context 
    ? `Вы — ИИ-ассистент платформы InvestEx. Контекст: ${context}`
    : "Вы — ИИ-ассистент платформы InvestEx, помогающий пользователям с проектами и инвестициями.";

  const isLegacyModel = model.includes('gpt-4o');
  const bodyParams: any = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
  };

  if (isLegacyModel) {
    bodyParams.max_tokens = 1000;
    bodyParams.temperature = 0.7;
  } else {
    bodyParams.max_completion_tokens = 1000;
    // Don't include temperature for newer models
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return { content: data.choices[0].message.content };
}

async function callAnthropic(apiKey: string, model: string, message: string, context?: string) {
  const systemPrompt = context 
    ? `Вы — ИИ-ассистент платформы InvestEx. Контекст: ${context}`
    : "Вы — ИИ-ассистент платформы InvestEx, помогающий пользователям с проектами и инвестициями.";

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: message }
      ]
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  return { content: data.content[0].text };
}

async function callOpenRouter(apiKey: string, model: string, message: string, context?: string) {
  const systemPrompt = context 
    ? `Вы — ИИ-ассистент платформы InvestEx. Контекст: ${context}`
    : "Вы — ИИ-ассистент платформы InvestEx, помогающий пользователям с проектами и инвестициями.";

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  return { content: data.choices[0].message.content };
}

async function callPerplexity(apiKey: string, model: string, message: string, context?: string) {
  const systemPrompt = context 
    ? `Вы — ИИ-ассистент платформы InvestEx с доступом к интернету. Контекст: ${context}`
    : "Вы — ИИ-ассистент платформы InvestEx с доступом к интернету, помогающий пользователям с проектами и инвестициями.";

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.2,
      top_p: 0.9,
      return_images: false,
      return_related_questions: false,
      search_domain_filter: ['perplexity.ai'],
      search_recency_filter: 'month',
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Perplexity API error: ${error}`);
  }

  const data = await response.json();
  return { content: data.choices[0].message.content };
}