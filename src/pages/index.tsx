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
    <div style={{ padding: '2rem' }}>
      <h1>Boobi Lottery AI</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入你的問題"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '送出中...' : '送出'}
      </button>
      <div style={{ marginTop: '1rem' }}>{response}</div>
    </div>
  );
}
