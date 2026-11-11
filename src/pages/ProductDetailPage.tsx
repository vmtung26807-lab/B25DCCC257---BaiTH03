import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const product = products.find((p) => p.id === Number(id));

  return (
    <section>
      <Link to="/">← Quay lại danh sách</Link>

      {(status === 'idle' || status === 'loading') && (
        <div className="loading">
          <div className="spinner" />
          <p>Đang tải sản phẩm...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="error-box" role="alert">
          <p>⚠️ {error}</p>
          <button className="btn" onClick={() => dispatch(fetchProducts())}>Thử lại</button>
        </div>
      )}

      {status === 'succeeded' && !product && <p>Không tìm thấy sản phẩm này.</p>}

      {product && (
        <div className="detail">
          <img src={product.image} alt={product.title} />
          <div>
            <span className="category">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="price">${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <button className="btn" onClick={() => dispatch(addToCart(product))}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}