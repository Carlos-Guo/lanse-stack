export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
  const json = (data, status=200) => new Response(JSON.stringify(data), { status, headers: { "content-type":"application/json; charset=utf-8" }});

  if (path.endsWith("/auth")) {
    const redirect_uri = new URL("/api/callback", url.origin).toString();
    const gh = new URL("https://github.com/login/oauth/authorize");
    gh.searchParams.set("client_id", GITHUB_CLIENT_ID);
    gh.searchParams.set("redirect_uri", redirect_uri);
    gh.searchParams.set("scope", "repo");
    gh.searchParams.set("state", crypto.randomUUID());
    return Response.redirect(gh.toString(), 302);
  }

  if (path.endsWith("/callback")) {
    const code = url.searchParams.get("code");
    if (!code) return json({ error: "missing code" }, 400);
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new URLSearchParams({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code })
    });
    const data = await res.json();
    if (!data.access_token) return json({ error: "token_exchange_failed", detail: data }, 400);
    return json({ token: data.access_token, provider: "github", token_type: "bearer", backend: "github" });
  }

  return json({ ok: true, endpoints: ["/api/auth", "/api/callback"] });
}
