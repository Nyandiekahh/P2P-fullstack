import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
import PaymentForm from './PaymentForm';
import Modal from './Modal';

const NotificationContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled(motion.li)`
  background-color: #f0f4f8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e8eef3;
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 5px;
  margin-left: 10px;

  &:hover {
    color: #666;
  }
`;

const MpesaButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
`;

const Notifications = ({ userPhoneNumber }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'loan', title: 'New Loan Request', message: 'A new loan request matching your criteria is available.', icon: TrendingUp, color: '#2196F3' },
    { id: 2, type: 'payment', title: 'Payment Due', message: 'Your M-Pesa payment is due in 3 days.', icon: CreditCard, color: '#FFA000' },
    { id: 3, type: 'alert', title: 'Market Update', message: 'Interest rates have changed. Check your investments.', icon: AlertCircle, color: '#F44336' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleMPesaInvestment = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <NotificationContainer>
      <Title>
        <Bell size={24} style={{ marginRight: '10px' }} />
        Notifications
      </Title>
      <NotificationList>
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <NotificationIcon color={notification.color}>
                <notification.icon size={20} color="#ffffff" />
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
              </NotificationContent>
              <DismissButton onClick={() => handleDismiss(notification.id)}>
                <X size={18} />
              </DismissButton>
            </NotificationItem>
          ))}
        </AnimatePresence>
      </NotificationList>
      
      <MpesaButton
        onClick={handleMPesaInvestment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CreditCard size={20} style={{ marginRight: '10px' }} />
        Invest via M-PESA
      </MpesaButton>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PaymentForm userPhoneNumber={userPhoneNumber} />
      </Modal>
    </NotificationContainer>
  );
};

export default Notifications;