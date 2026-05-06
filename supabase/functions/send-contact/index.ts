import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  gdpr_consent: boolean;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://8kajis.lv",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: ContactPayload = await req.json();

    // Validate
    if (!payload.name || !payload.email || !payload.message || !payload.gdpr_consent) {
      return new Response(
        JSON.stringify({ ok: false, error: "Obligātie lauki nav aizpildīti" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "8kajis.lv <noreply@8kajis.lv>",
          to: ["info@8kajis.lv"],
          reply_to: payload.email,
          subject: `Jauns ziņojums no ${payload.name}`,
          html: `
            <h2>Jauns kontaktformas ziņojums</h2>
            <p><strong>Vārds:</strong> ${payload.name}</p>
            <p><strong>E-pasts:</strong> ${payload.email}</p>
            ${payload.phone ? `<p><strong>Tālrunis:</strong> ${payload.phone}</p>` : ""}
            <p><strong>Ziņojums:</strong></p>
            <p>${payload.message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-contact error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Servera kļūda" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
