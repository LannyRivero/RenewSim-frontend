
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const { token, username, roles } = await loginUser(credentials);
      login(token, { username, roles });
      navigate('/');
    } catch (error) {
      alert('Credenciales incorrectas o error del servidor.');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;


