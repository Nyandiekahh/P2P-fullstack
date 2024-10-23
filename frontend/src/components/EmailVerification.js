import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import './Login.css';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/verify-email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            token: token
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          // Log the user in with the returned tokens
          login(data.user, data.tokens);
          // Redirect to dashboard after 3 seconds
          setTimeout(() => navigate('/dashboard'), 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [userId, token, navigate, login]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="verification-content text-center">
          <h2 className="form-title">Email Verification</h2>
          
          {status === 'verifying' && (
            <div className="verification-status">
              <Loader className="animate-spin" size={48} />
              <p>Verifying your email address...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="verification-status">
              <CheckCircle className="text-green-500" size={48} />
              <p className="success-message">Email verified successfully!</p>
              <p>You will be redirected to the dashboard in a moment...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="verification-status">
              <XCircle className="text-red-500" size={48} />
              <p className="error-message">Verification failed. The link may be expired or invalid.</p>
              <button 
                onClick={() => navigate('/login')} 
                className="form-button"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;