import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

// Components
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

// Import new LoanMarketplace from its new location
import LoanMarketplace from './components/LoanMarketplace/LoanMarketplace';

// Styles
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f4f8;
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: ${props => (props.isSidebarOpen ? '240px' : '60px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
  min-height: 100vh;
  position: relative;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const GlobalStyle = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f4f8;
  }

  /* ScrollBar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Layout = ({ children, isSidebarOpen }) => (
  <AppContainer>
    <Sidebar />
    <MainContent isSidebarOpen={isSidebarOpen}>{children}</MainContent>
  </AppContainer>
);

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <AnimatePresence mode='wait'>
          <Routes>
            {/* Public Routes */}
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
                element={
                  <Layout isSidebarOpen={isSidebarOpen}>
                    <Dashboard onSidebarToggle={toggleSidebar} />
                  </Layout>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <Layout isSidebarOpen={isSidebarOpen}>
                    <Profile onSidebarToggle={toggleSidebar} />
                  </Layout>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <Layout isSidebarOpen={isSidebarOpen}>
                    <AdminDashboard onSidebarToggle={toggleSidebar} />
                  </Layout>
                } 
              />
              <Route 
                path="/loan-marketplace" 
                element={
                  <Layout isSidebarOpen={isSidebarOpen}>
                    <LoanMarketplace onSidebarToggle={toggleSidebar} />
                  </Layout>
                } 
              />
            </Route>
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AnimatePresence>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={3}
          style={{
            zIndex: 9999,
          }}
        />
      </Router>
    </AuthProvider>
  );
};

export default App;