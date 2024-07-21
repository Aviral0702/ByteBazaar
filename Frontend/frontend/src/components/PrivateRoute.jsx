import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const isCreateListingPage = location.pathname === '/createlisting';

  if (!currentUser) {
    return <Navigate to='/sign-in' />;
  }

  if (isCreateListingPage && !currentUser.isSeller) {
    return <Navigate to='/landingpage' />; 
  }

  return <Outlet />;
}
