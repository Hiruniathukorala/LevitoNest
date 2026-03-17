import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loginDesigner, registerDesigner } from '../api';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        res = await registerDesigner(formData);
      } else {
        res = await loginDesigner(formData);
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('designer', JSON.stringify(res.data.designer));
      onLogin(res.data.designer);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-[32px] shadow-soft p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-darkText">
            Levito<span className="text-primary">Nest</span>
          </h1>
          <p className="text-gray-500 font-poppins mt-2">
            {isRegister ? 'Create your designer account' : 'Welcome back, Designer'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-poppins">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="designer@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-full font-medium font-poppins hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-soft mt-4"
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 font-poppins mt-6">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-primary font-medium ml-1 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;