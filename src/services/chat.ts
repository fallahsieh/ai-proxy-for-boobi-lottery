export async function callAI(message: string): Promise<string> {
  const res = await fetch('https://ai-proxy-for-boobi-lottery.vercel.app/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('API call failed');
  }

  const data = await res.json();
  return data.reply;
}
