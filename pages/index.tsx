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
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Boobi Lottery Chat</h1>
      <textarea
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="輸入訊息..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '送出中...' : '送出'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
        {response}
      </pre>
    </div>
  );
}
