import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from '../components/ProductCard';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const q = keyword.trim().toLowerCase();
  const filtered = q ? products.filter((p) => p.title.toLowerCase().includes(q)) : products;

  return (
    <section>
      <h1>Sản phẩm</h1>
      <input
        className="search"
        type="search"
        placeholder="Tìm kiếm theo tên sản phẩm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {status === 'loading' && (
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

      {status === 'succeeded' && (
        <>
          <p className="muted">Tìm thấy {filtered.length} sản phẩm</p>
          {filtered.length === 0 ? (
            <p>Không có sản phẩm nào phù hợp.</p>
          ) : (
            <div className="grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}