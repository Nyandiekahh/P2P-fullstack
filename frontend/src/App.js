import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import LoanMarketplace from './components/LoanMarketplace';  // Import the LoanMarketplace component
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
  margin-left: ${props => (props.isSidebarOpen ? '240px' : '60px')}; /* Adjust based on sidebar state */
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

const Layout = ({ children, isSidebarOpen }) => (
  <AppContainer>
    <Sidebar />
    <MainContent isSidebarOpen={isSidebarOpen}>{children}</MainContent>
  </AppContainer>
);

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

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
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route 
              path="/dashboard" 
              element={<Layout isSidebarOpen={isSidebarOpen}><Dashboard /></Layout>} 
            />
            <Route 
              path="/profile" 
              element={<Layout isSidebarOpen={isSidebarOpen}><Profile /></Layout>} 
            />
            <Route 
              path="/admin" 
              element={<Layout isSidebarOpen={isSidebarOpen}><AdminDashboard /></Layout>} 
            />
            {/* Loan Marketplace Page */}
            <Route 
              path="/loan-marketplace" 
              element={<Layout isSidebarOpen={isSidebarOpen}><LoanMarketplace /></Layout>} 
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
