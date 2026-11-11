import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useAuth } from '../contexts/AuthContext';
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section className="center">
        <h1>✅ Đặt hàng thành công!</h1>
        <p>Cảm ơn {user?.username} đã mua hàng tại ShopMini.</p>
        <Link to="/" className="btn">Tiếp tục mua sắm</Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="center">
        <h1>Giỏ hàng trống</h1>
        <p>Hãy thêm sản phẩm trước khi thanh toán.</p>
        <Link to="/" className="btn">Về trang chủ</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>Người đặt hàng: <strong>{user?.username}</strong></p>
      <ul className="order-list">
        {items.map((i) => (
          <li key={i.id}>
            {i.title} × {i.quantity} — ${(i.price * i.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="summary">Tổng tiền: <strong>${totalPrice.toFixed(2)}</strong></p>
      <button className="btn" onClick={handleOrder}>Đặt hàng</button>
    </section>
  );
}