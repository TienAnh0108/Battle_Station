import React, { useEffect, useState, useContext } from 'react'; 
import API from '../services/api';
import Navbar from '../components/Navbar'; // Imported: global navigation bar layout
import { CartContext } from '../context/CartContext.jsx'; // Imported: global cart state manager

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract cart handler function from the global context middleware
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Call API to get products when loading page 
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
    <>
      {/* Inject navigation layout component at the top of web view */}

      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333' }}>Battlestation Store</h1>
        <p>Danh sách sản phẩm công nghệ và góc setup của bạn:</p>

        {products.length === 0 ? (
          <p style={{ color: 'gray' }}>Chưa có sản phẩm nào trong kho. Hãy vào trang Django Admin để thêm sản phẩm nhé!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {products.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3>{product.name}</h3>
                  <p style={{ color: 'green', fontWeight: 'bold' }}>Giá: ${product.base_price}</p>
                  <p>Kho còn: {product.stock_quantity}</p>
                </div>

                {/* Added: Interaction button to trigger global cart state manipulation */}
                <button
                  type="button"
                  onClick={() => {
                    // Mapping base_price to price parameter to maintain architectural consistency with CartContext logic
                    addToCart({ ...product, price: product.base_price });
                    alert(`Added "${product.name}" to cart successfully!`);
                  }}
                  style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;