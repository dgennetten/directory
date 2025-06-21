import React, { useState } from 'react';
import { NotebookTabs, Lock, Eye, EyeOff, Mail, Key } from 'lucide-react';
import { familyMembers } from '../data/familyData';

interface LoginFormProps {
  onLogin: () => void;
}

const getAllEmails = () =>
  familyMembers.map((m) => m.email).filter((e) => e && e.trim() !== '');

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'code'>('login');
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [info, setInfo] = useState('');

  const validEmails = getAllEmails();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      setIsLoading(false);
      return;
    }
    if (!validEmails.includes(email.trim())) {
      setError('Email not recognized.');
      setIsLoading(false);
      return;
    }
    if (password !== 'DelbertLovesVirginia') {
      setError('Incorrect password. Please try again.');
      setPassword('');
      setIsLoading(false);
      return;
    }

    // Call backend to send code
    try {
      const response = await fetch('/api/send_code.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await response.json();
      if (data.success) {
        setStep('code');
        setInfo("If your email is recognized, you'll receive a code. Enter that code here.");
      } else {
        setError(data.message || 'Failed to send code.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/verify_code.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim() })
      });
      const data = await response.json();
      if (data.success) {
        if (rememberDevice) {
          localStorage.setItem('familyDirectoryRemembered', 'true');
        }
        onLogin();
      } else {
        setError(data.message || 'Incorrect code. Please try again.');
        setCode('');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <NotebookTabs className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Extended Family Directory
            </h1>
            <p className="text-gray-600 text-sm">
              {step === 'login'
                ? 'Please enter your email and password to access the family directory'
                : info}
            </p>
          </div>

          {step === 'login' && (
            <form onSubmit={handleLoginSubmit} className="px-8 pb-8">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLoading || !email.trim() || !password.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Access Directory'
                )}
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleCodeSubmit} className="px-8 pb-8">
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  2FA Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter the code you received"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  If your email is recognized, you'll receive a code. Enter that code here.
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {error}
                  </p>
                )}
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="rememberDevice"
                  checked={rememberDevice}
                  onChange={() => setRememberDevice((v) => !v)}
                  className="mr-2"
                />
                <label htmlFor="rememberDevice" className="text-sm text-gray-700">
                  Remember this device
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading || !code.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLoading || !code.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify Code & Access'
                )}
              </button>
            </form>
          )}

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              This directory contains private family information. 
              <br />
              Please keep the password confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;