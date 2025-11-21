// src/facebook-direct-callback.tsx

export default function FacebookDirectCallback() {
  // Extract the code & state from Facebook redirect
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  // Send the REAL Facebook code to n8n
  if (code) {
    fetch(import.meta.env.VITE_N8N_WEBHOOK_URL_FACEBOOK + "/oauth-callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "facebook", code, state }),
    })
      .then(() => {
        window.location.href = "/dashboard"; // wherever you want
      })
      .catch((err) => console.error(err));
  }

  return <div>Connecting your Facebook account…</div>;
}
