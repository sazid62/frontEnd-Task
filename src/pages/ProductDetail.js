import { useNavigate, useParams } from 'react-router-dom';
import { useProduct, useDeleteProduct } from '../api/queries';
import Navbar from '../components/Navbar';

function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id);
  const deleteMutation = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;

  const product = data?.data;

  return (
    <div>
      <Navbar />
      <div style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
        <h2>{product?.name}</h2>
        <p>Price: ${product?.price}</p>
        <p>Stock: {product?.stock}</p>
        <p>Description: {product?.description}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProductDetail;
