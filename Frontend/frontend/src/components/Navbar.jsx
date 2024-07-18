import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [cartItems, setCartItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/landingpage');
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdRes = await fetch('/api/auth/signedinuserid');
        const userIdData = await userIdRes.json();
        if (userIdData.success === false) return;

        const userRes = await fetch(`/api/user/${userIdData.userId}`);
        const userData = await userRes.json();
        if (userData.success !== false) {
          setAvatar(userData.avatar);
        }

        const cartRes = await fetch(`/api/cart/getcart/${userIdData.userId}`);
        const cartData = await cartRes.json();
        console.log(cartData); // Debugging statement
        if (Array.isArray(cartData) && cartData.length > 0) {
          setCartItems(cartData.length);
          setCartTotal(cartData.reduce((total, item) => total + item.quantity * item.discountPrice, 0));
          console.log(cartItems); // Debugging statement
          console.log(cartTotal); // Debugging statement
        } else {
          setCartItems(0);
          setCartTotal(0);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md">
        <div className="flex-1 flex items-center justify-between">
          <Link to="/landingpage" className="btn btn-ghost text-2xl font-bold">ByteBazaar</Link>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="btn btn-outline btn-primary">About Us</button>
            </Link>
            <Link to="/pricing">
              <button className="btn btn-outline btn-primary">Pricing</button>
            </Link>
            <Link to="/sign-in">
              <button className="btn btn-outline btn-secondary">Login</button>
            </Link>
            <Link to="/getstarted">
              <button className="btn btn-outline btn-secondary">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{cartItems}</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{cartItems} Items</span>
                <span className="text-info">Subtotal: ${cartTotal}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={avatar} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="justify-between">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="justify-between">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="justify-between">
                  Orders
                </Link>
              </li>
              <li>
                <button className="justify-between" onClick={handleSignOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
