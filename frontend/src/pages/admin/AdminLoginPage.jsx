import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-brand-gold mb-2">❖</h1>
          <h2 className="text-2xl font-serif text-brand-charcoal">Admin Portal</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" className="w-full mt-6" isLoading={loading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
