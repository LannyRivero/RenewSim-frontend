import React, { useState, useEffect } from 'react';
import useProfile from '../hooks/useProfile';

const ProfileForm = () => {
  const { profile, updateProfileData, loading } = useProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfileData(formData); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label>Apellidos:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  );
};

export default ProfileForm;
