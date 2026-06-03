import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API lấy danh sách sản phẩm khi trang vừa load
    API.get('products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Đang tải sản phẩm...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>Battlestation Store</h1>
      <p>Danh sách sản phẩm công nghệ và góc setup của bạn:</p>

      {products.length === 0 ? (
        <p style={{ color: 'gray' }}>Chưa có sản phẩm nào trong kho. Hãy vào trang Django Admin để thêm sản phẩm nhé!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{product.name}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>Giá: ${product.base_price}</p>
              <p>Kho còn: {product.stock_quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;