import { useState } from 'react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data?.response || 'No response');
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎯 AI Proxy 測試頁面</h1>
      <textarea
        rows={3}
        style={{ width: '100%', marginTop: '1rem' }}
        placeholder="輸入訊息"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? '送出中...' : '送出'}
      </button>
      <pre style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
        {response}
      </pre>
    </main>
  );
}
