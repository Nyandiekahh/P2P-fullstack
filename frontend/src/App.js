import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext'; // Make sure to update the path
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import EmailVerification from './components/EmailVerification';
import ResetPassword from './components/ResetPassword';
import RequestPasswordReset from './components/RequestPasswordReset';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: 60px;
  transition: margin-left 0.3s ease;
  padding: 20px;

  @media (min-width: 768px) {
    margin-left: 240px;
  }
`;

const Layout = ({ children }) => (
  <AppContainer>
    <Sidebar />
    <MainContent>{children}</MainContent>
  </AppContainer>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:userId/:token" element={<EmailVerification />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<RequestPasswordReset />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;