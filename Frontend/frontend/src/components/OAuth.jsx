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

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/landingpage');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="text-center">
      <button
        className="btn btn-outline btn-primary flex items-center justify-center w-full"
        onClick={handleGoogleClick}
      >
        <FaGoogle className="w-6 h-6 mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
