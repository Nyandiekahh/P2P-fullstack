import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Settings, LogOut, ChevronLeft, ChevronRight, DollarSign, Users } from 'lucide-react';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => (props.isOpen ? '240px' : '60px')};
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
`;

const ToggleButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: ${props => (props.isOpen ? '10px' : '-15px')};
  background: #3498db;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ecf0f1;
  z-index: 10;
`;

const Logo = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
  color: #3498db;
`;

const NavItems = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const NavItem = styled(motion.li)`
  margin-bottom: 10px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(52, 152, 219, 0.2);
  }

  &.active {
    background-color: rgba(52, 152, 219, 0.4);
  }
`;

const Icon = styled.span`
  margin-right: 15px;
  width: 20px;
`;

const LogoutButton = styled(motion.button)`
  margin-top: auto;
  margin-bottom: 20px;
  background-color: #e74c3c;
  border: none;
  padding: 10px;
  color: #ecf0f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const sidebarVariants = {
  open: { width: '240px' },
  closed: { width: '60px' }
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <SidebarContainer
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </ToggleButton>
      <Logo>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* P2P Lend */}
        </motion.span>
      </Logo>
      <NavItems>
        <NavItem>
          <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Icon><Home size={20} /></Icon>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            <Icon><User size={20} /></Icon>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Profile
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/investments" className={location.pathname === '/investments' ? 'active' : ''}>
            <Icon><DollarSign size={20} /></Icon>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Investments
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
            <Icon><Users size={20} /></Icon>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Admin
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
            <Icon><Settings size={20} /></Icon>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </NavItem>
      </NavItems>
      <LogoutButton onClick={handleLogout}>
        <Icon><LogOut size={20} /></Icon>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Logout
            </motion.span>
          )}
        </AnimatePresence>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;