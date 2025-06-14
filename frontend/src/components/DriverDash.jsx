import { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { scanQR } from '../services/api';

export default function DriverDash() {
  const [secret, setSecret] = useState('');
  const token = localStorage.getItem('token');
  const [result, setResult] = useState(null);

  async function handleScan(data) {
    if (!data) return;
    const qrToken = data;
    const res = await scanQR(qrToken, secret, token);
    setResult(res);
  }

  return (
    <div>
      <h2>Scanner le QR Code</h2>
      <input
        placeholder="Secret utilisé"
        value={secret}
        onChange={e => setSecret(e.target.value)}
      />
      <QrReader
        delay={300}
        onError={(err) => console.error(err)}
        onScan={(data) => handleScan(data)}
        style={{ width: '100%' }}
      />

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}