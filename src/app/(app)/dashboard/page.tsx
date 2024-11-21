'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import EditProfileForm from '@/components/EditProfile';
import UserBlogs from '@/components/UserBlog';

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
          <div>

        
          <h2>Profile Details</h2>
          <div>{profile.username}</div>
          <div>{profile.email}</div>
          <div>{new Date(profile.createdAt).toLocaleDateString()}</div>
          <div>
            <img
              src={profile.profileImage || '/default-avatar.png'}
              alt="Profile"
              className='w-40 h-40'
            />
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
          <div>
          <UserBlogs userId={profile._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
