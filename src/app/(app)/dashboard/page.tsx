'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import EditProfileForm from '@/components/EditProfile';

const ProfilePage = () => {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      {isEditing ? (
        <EditProfileForm />
      ) : (
        <div>
          <h2>Profile Details</h2>
          <div>{profile.username}</div>
          <div>{profile.email}</div>
          <div>{new Date(profile.createdAt).toLocaleDateString()}</div>
          <div>
            <img
              src={profile.profileImage || '/default-avatar.png'}
              alt="Profile"
            />
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
