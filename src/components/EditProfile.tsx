import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const EditProfileForm = () => {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    userId: profile?._id,
    username: profile?.username || '',
    email: profile?.email || '',
    profileImage: profile?.profileImage || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      updateProfile(updatedProfile); // Use updateProfile to update the profile in context
      alert('Profile updated successfully');
      window.location.reload();
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Profile Image</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
