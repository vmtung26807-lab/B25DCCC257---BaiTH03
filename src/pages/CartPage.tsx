import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <section className="center">
        <h1>Giỏ hàng trống</h1>
        <p>Bạn chưa thêm sản phẩm nào.</p>
        <Link to="/" className="btn">Tiếp tục mua sắm</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className="cart-info">
            <Link to={`/products/${item.id}`}>{item.title}</Link>
            <p className="price">${item.price.toFixed(2)}</p>
          </div>
          <div className="qty">
            <button
              className="btn btn-outline"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-outline"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              +
            </button>
          </div>
          <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>
          <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
            Xóa
          </button>
        </div>
      ))}

      <div className="summary">
        <p>Tổng số lượng: <strong>{totalQuantity}</strong></p>
        <p>Tổng tiền: <strong>${totalPrice.toFixed(2)}</strong></p>
        <div className="actions">
          <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
            Xóa giỏ hàng
          </button>
          <Link to="/checkout" className="btn">Thanh toán</Link>
        </div>
      </div>
    </section>
  );
}