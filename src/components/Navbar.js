import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../api/queries';
import { clearUser } from '../store/userSlice';

function Navbar() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
      <button onClick={() => navigate('/')}>Home</button>
 
      <button style={{ marginLeft: '20px' }} onClick={() => navigate('/addProducts')}>Add Products</button>
            <span style={{ float: 'right' }}>Hello, {user?.fullName}!</span>
      <button style={{ float: 'right', marginRight: '20px' }} onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default Navbar;
