
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600 mb-8">Login to access the Hospital Management Dashboard.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-danger text-sm mb-4">{error}</p>}
            <p className="text-xs text-gray-500 mb-4">Demo login: admin@hospital.com / password123</p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <img src="https://picsum.photos/800/1000?random=1" alt="Hospital" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
