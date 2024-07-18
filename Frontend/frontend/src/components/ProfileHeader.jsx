// src/components/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ user, onAvatarChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img className="w-16 h-16 rounded-full" src={user.avatar} alt="User avatar" />
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={onAvatarChange}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
