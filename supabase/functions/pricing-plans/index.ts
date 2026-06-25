const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

type Audience = "business" | "accountant_bookkeeper";

const OUTWORX_API_BASE = "https://app.outworx.ai/api/v1/accounts/subscription-plans/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const requestUrl = new URL(req.url);
  const requestedAudience = requestUrl.searchParams.get("audience");
  const audience: Audience = requestedAudience === "accountant_bookkeeper" ? "accountant_bookkeeper" : "business";
  const upstreamUrl = new URL(OUTWORX_API_BASE);

  // Always forward the audience param — upstream returns the full plan list
  // for `business` only when the param is present; omitting it collapses the
  // response to a single plan.
  upstreamUrl.searchParams.set("audience", audience);

  try {
    const upstreamRes = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    // Body is forwarded verbatim — do NOT parse/re-serialize. This keeps any
    // newly added upstream fields flowing through to the client automatically.
    const body = await upstreamRes.text();

    return new Response(body, {
      status: upstreamRes.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstreamRes.headers.get("Content-Type") || "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Pricing plans proxy failed", error);

    return new Response(JSON.stringify({ error: "Pricing plans unavailable" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});