import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Prepare user data
      const userData = {
        name: user.displayName || 'Unnamed User',
        username: user.email.split('@')[0], // Generate a username from email or provide a default
        email: user.email,
        avatar: user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        // Password is not needed for OAuth users, but you need to handle this in your backend
      };

      // Post user data to your backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await res.json();
      if (res.status === 200) {
        dispatch(signInSuccess(data));
        navigate('/landingpage');
      } else {
        console.error('Failed to sign in:', data.message);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <button
        className="btn btn-outline btn-primary flex items-center justify-center w-full md:w-auto"
        onClick={handleGoogleClick}
      >
        <FaGoogle className="w-6 h-6 mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
