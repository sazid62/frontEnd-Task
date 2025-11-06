import { useNavigate } from 'react-router-dom';
import { useProducts } from '../api/queries';
import Navbar from '../components/Navbar';

function Products() {
  const { data, isLoading } = useProducts();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <Navbar />
      <div>
      {data?.data?.length === 0 && <p>No products found</p>}

        {data?.data?.map((product) => (
          <div
            key={product.id}
            style={{ border: '1px solid black', padding: '10px', margin: '10px', cursor: 'pointer' }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
