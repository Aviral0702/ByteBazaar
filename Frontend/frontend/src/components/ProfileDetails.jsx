// src/components/ProfileDetails.jsx
import React, { useState } from 'react';

const ProfileDetails = ({ user, onEmailChange, onPhoneChange }) => {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    onEmailChange(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    onPhoneChange(e.target.value);
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
