import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { selectTotalQuantity } from '../features/cart/cartSlice';

export default function Header() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="brand">🛒 ShopMini</Link>
      <nav>
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/cart">
          Giỏ hàng <span className="count">{totalQuantity}</span>
        </NavLink>
        {user ? (
          <>
            <span className="hello">Xin chào, {user.username}</span>
            <button className="btn btn-outline" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <NavLink to="/login">Đăng nhập</NavLink>
        )}
        <button className="btn btn-outline" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
        </button>
      </nav>
    </header>
  );
}