import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface BookingPayload {
  name: string;
  institution?: string;
  phone: string;
  email: string;
  message?: string;
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
    const payload: BookingPayload = await req.json();

    if (!payload.name || !payload.phone || !payload.email || !payload.gdpr_consent) {
      return new Response(
        JSON.stringify({ ok: false, error: "Obligātie lauki nav aizpildīti" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
          subject: `Jauns Bimini pieteikums — ${payload.name}`,
          html: `
            <h2>Jauns sensorās telpas apmeklējuma pieteikums</h2>
            <p><strong>Vārds:</strong> ${payload.name}</p>
            ${payload.institution ? `<p><strong>Iestāde:</strong> ${payload.institution}</p>` : ""}
            <p><strong>Tālrunis:</strong> ${payload.phone}</p>
            <p><strong>E-pasts:</strong> ${payload.email}</p>
            ${payload.message ? `<p><strong>Ziņojums:</strong></p><p>${payload.message}</p>` : ""}
          `,
        }),
      });

      // Auto-reply to client
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bimini Sensorā Telpa <noreply@8kajis.lv>",
          to: [payload.email],
          subject: "Jūsu pieteikums saņemts — Bimini sensorā telpa",
          html: `
            <h2>Paldies, ${payload.name}!</h2>
            <p>Jūsu pieteikums apmeklējumam Bimini sensorajā telpā ir saņemts.</p>
            <p>Sazināsimies ar jums 24 stundu laikā.</p>
            <br>
            <p><strong>Adrese:</strong> Nākotnes iela 2, Ķekava</p>
            <p><strong>Tālrunis:</strong> <a href="tel:+37120009028">+371 20009028</a></p>
            <br>
            <p>Ar cieņu,<br>8kajis.lv Bimini komanda</p>
          `,
        }),
      });
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("sensory-booking error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Servera kļūda" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
