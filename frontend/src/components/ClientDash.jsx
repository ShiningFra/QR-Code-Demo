import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { generateQR, getHistory } from '../services/api';

export default function ClientDash() {
  const [params, setParams] = useState({
    clientId: localStorage.getItem('id'),
    chauffeurId: '',
    courseId: '', lieu: '', heure: '', date: '', ville: '', pays: '', fournisseur: '',
    secret: '', expirationMillis: 60000
  });
  const [qrBlob, setQrBlob] = useState(null);
  const [history, setHistory] = useState(null);
  const token = localStorage.getItem('token');

  async function handleGenerate() {
    const blob = await generateQR(params, token);
    setQrBlob(URL.createObjectURL(blob));
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getHistory(params.clientId, token);
      setHistory(data);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Générer QR Code</h2>
      {/* Form inputs pour params */}
      <button onClick={handleGenerate}>Générer</button>
      {qrBlob && <img src={qrBlob} alt="QR Code" />}

      <h2>Statut du Scan</h2>
      {history && history.length > 0
        ? <pre>{JSON.stringify(history[0], null, 2)}</pre>
        : <p>En attente de scan...</p>
      }
    </div>
  );
}