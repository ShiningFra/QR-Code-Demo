const API = 'http://localhost:8080/api';

// Récupère un JWT pour client ou chauffeur
export async function reserve(fournisseur) {
  const res = await fetch(`${API}/reserve`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ fournisseur })
  });
  return res.json();
}

// Génère un QR code PNG
export async function generateQR({ secret, expirationMillis, ...qrData }, token) {
  const url = new URL(`${API}/qr/generate`);
  url.searchParams.set('secret', secret);
  url.searchParams.set('expirationMillis', expirationMillis);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + token
    },
    body: JSON.stringify(qrData)
  });
  // Retourne le token JWT contenu dans le QR (ou une URL de l'image)
  return res.blob();
}

// Scanne et valide un QR
export async function scanQR(qrToken, secret, token) {
  const url = new URL(`${API}/qr/scan`);
  url.searchParams.set('qrCodeData', qrToken);
  url.searchParams.set('secret', secret);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + token
    },
    body: JSON.stringify({})
  });
  return res.json(); // renvoie QRData
}

// Vérifie si la course a été scannée (history)
export async function getHistory(clientId, token) {
  const res = await fetch(`${API}/history?clientId=${clientId}`, {
    headers: { 'Authorization':'Bearer ' + token }
  });
  return res.json();
}