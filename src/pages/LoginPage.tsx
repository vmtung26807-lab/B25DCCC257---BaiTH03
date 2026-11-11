import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Sai mật khẩu. (Gợi ý: 123456)');
    }
  };

  return (
    <section className="form-box">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Tài khoản
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Mật khẩu
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="field-error">{error}</p>}
        <button className="btn" type="submit">Đăng nhập</button>
      </form>
    </section>
  );
}