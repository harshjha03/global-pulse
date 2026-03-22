import { useState, useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { toast } from 'sonner';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);
      login(response.data.token, response.data.user);
      toast.success(`Welcome ${response.data.user.name}!`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(155deg, #ECF4FF 0%, #EEF6FF 50%, #E8F3FF 100%)' }}>
      <div className="w-full max-w-md">
        <div
          className="bg-white rounded-[13px] shadow-lg p-8"
          style={{ border: '1px solid #E5E7EB', boxShadow: '0 6px 28px rgba(0,0,0,0.11)' }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
              style={{ background: '#007BFF' }}
            >
              <span className="text-white font-bold text-lg">GP</span>
            </div>
            <div className="text-2xl font-bold">
              <span style={{ color: '#111827' }}>GlobalData</span>
              <span style={{ color: '#007BFF' }}> Pulse</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold" style={{ color: '#111827' }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              {isLogin ? 'Sign in to access CPG intelligence' : 'Start exploring market insights'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase mb-2" style={{ color: '#6B7280', letterSpacing: '0.07em' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    color: '#111827'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007BFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase mb-2" style={{ color: '#6B7280', letterSpacing: '0.07em' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{
                  border: '1px solid #E5E7EB',
                  background: '#FFFFFF',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007BFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-2" style={{ color: '#6B7280', letterSpacing: '0.07em' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{
                  border: '1px solid #E5E7EB',
                  background: '#FFFFFF',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007BFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-sm"
              style={{
                background: '#007BFF',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#0056b3')}
              onMouseLeave={(e) => !loading && (e.target.style.background = '#007BFF')}
            >
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium"
              style={{ color: '#007BFF' }}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
