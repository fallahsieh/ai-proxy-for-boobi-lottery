export async function askAI(userMessage: string) {
  const response = await fetch("https://ai-proxy-for-boobi-lottery.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const result = await response.json();
  return result.response;
}
