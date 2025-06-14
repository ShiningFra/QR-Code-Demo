import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reserve } from '../services/api';
import jwtDecode from 'jwt-decode';

export default function Login() {
  const [fournisseur, setFournisseur] = useState('');
  const [role, setRole] = useState('client');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { token } = await reserve(fournisseur);
    localStorage.setItem('token', token);
    const info = jwtDecode(token);
    localStorage.setItem('id', info.id);
    navigate(role);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="driver">Chauffeur</option>
      </select>
      <input
        placeholder="Fournisseur"
        value={fournisseur}
        onChange={e => setFournisseur(e.target.value)}
        required
      />
      <button type="submit">Connexion</button>
    </form>
  );
}