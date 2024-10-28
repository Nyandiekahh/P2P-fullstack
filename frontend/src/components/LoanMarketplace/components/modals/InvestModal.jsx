import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, DollarSign, ArrowRight, Calculator, AlertCircle, CheckCircle, Smartphone, Building2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import PaymentForm from '../../../PaymentForm';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modal Base Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 42rem;
  overflow: hidden;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const CloseButton = styled.button`
  color: #6b7280;
  transition: all 0.2s;
  padding: 0.5rem;
  border-radius: 9999px;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
`;

// Step Navigation Styled Components
const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  padding: 0 1rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`;

const StepCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  background-color: ${props => 
    props.active ? '#2563eb' : 
    props.completed ? '#22c55e' : 
    '#e5e7eb'};
  color: ${props => 
    props.active || props.completed ? 'white' : '#4b5563'};
  transition: all 0.3s ease;
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.active ? '#2563eb' : '#6b7280'};
  font-weight: ${props => props.active ? '500' : '400'};
`;

const StepLine = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 50%;
  width: 100%;
  height: 0.125rem;
  background-color: #e5e7eb;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #2563eb;
    transition: width 0.3s ease;
  }
`;

// Form Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const HelperText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

// Button Components
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  ${props => props.secondary && `
    color: #4b5563;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #f3f4f6;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
  
  ${props => props.primary && `
    background-color: #2563eb;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #1d4ed8;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `}
`;

// Payment Method Styled Components
const PaymentMethodOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid ${props => props.selected ? '#2563eb' : '#e5e7eb'};
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.selected ? '#eff6ff' : 'white'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: ${props => props.selected ? '#eff6ff' : '#f9fafb'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${props => props.selected ? '#2563eb' : 'transparent'};
    transition: all 0.2s ease-in-out;
  }
`;

const PaymentMethodIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background-color: ${props => props.selected ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.selected ? 'white' : '#6b7280'};
  transition: all 0.2s ease-in-out;
`;

const PaymentMethodContent = styled.div`
  flex: 1;
`;

const PaymentMethodTitle = styled.p`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const PaymentMethodDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

// Bank Transfer Details Styled Components
const BankDetailsContainer = styled(motion.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const BankDetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e5e7eb;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BankDetailLabel = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const BankDetailValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
  color: #1f2937;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  border: 1px dashed #d1d5db;
`;

const CopyButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #2563eb;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background-color: #eff6ff;
  }

  &:active {
    background-color: #dbeafe;
  }
`;

// Calculator and Returns Styled Components
const ReturnCalculator = styled(motion.div)`
  background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #bfdbfe;
  margin-top: 1.5rem;
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const CalculatorItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  &.col-span-2 {
    grid-column: span 2;
  }
`;

// Summary Styled Components
const SummaryContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

// Loading Components
const LoadingOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 60;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 500;
`;

// Alert Components
const AlertBox = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 0.5rem;
  color: #9a3412;
`;

// Stats Components
const LoanStats = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const StatBox = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #2563eb;
  border-radius: 9999px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

// Main Component Implementation
const InvestModal = ({ isOpen, onClose, loan = {}, onSuccess, onUpdate }) => {
  const {
    amount = 0,
    funded_amount = 0,
    interest_rate = 0,
    duration = 0,
  } = loan;

  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    payment_method: '',
    agreed_to_terms: false
  });

  const [calculations, setCalculations] = useState({
    monthlyYield: '0.00',
    totalYield: '0.00',
    returnAmount: '0.00'
  });

  const [stats, setStats] = useState({
    total: amount,
    funded: funded_amount,
    remaining: amount - funded_amount
  });

  // Update stats when loan data changes
  useEffect(() => {
    setStats({
      total: amount,
      funded: funded_amount,
      remaining: amount - funded_amount
    });
  }, [amount, funded_amount]);

  // Calculate investment returns
  useEffect(() => {
    if (formData.amount && !isNaN(formData.amount)) {
      const investAmount = parseFloat(formData.amount);
      const monthlyRate = interest_rate / 12 / 100;
      
      const monthlyYield = investAmount * monthlyRate;
      const totalYield = monthlyYield * duration;
      const returnAmount = investAmount + totalYield;

      setCalculations({
        monthlyYield: monthlyYield.toFixed(2),
        totalYield: totalYield.toFixed(2),
        returnAmount: returnAmount.toFixed(2)
      });
    }
  }, [formData.amount, interest_rate, duration]);

  // Methods for handling payment and updates
  const updateLoanStats = async (investedAmount) => {
    try {
      const response = await fetch(`/api/loans/${loan.id}/invest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          invested_amount: investedAmount,
          loan_id: loan.id
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update loan stats');
      }
  
      const updatedLoan = await response.json();
      
      // Update local stats with the response from server
      setStats({
        total: updatedLoan.amount,
        funded: updatedLoan.funded_amount || 0,
        remaining: updatedLoan.amount - (updatedLoan.funded_amount || 0)
      });
  
      // Call parent update handler
      onUpdate?.(updatedLoan);
      return true;
    } catch (error) {
      console.error('Error updating loan stats:', error);
      return false;
    }
  };

  // In InvestModal.jsx
  const simulatePaymentSuccess = async () => {
    setProcessingPayment(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 7000));
  
      const token = localStorage.getItem('token');
      
      // Use the full URL in development
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/loans/${loan.id}/invest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'  // Add this line
        },
        credentials: 'include',  // Add this line
        body: JSON.stringify({
          amount: parseFloat(formData.amount)
        })
      });
  
      // First check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || 'Failed to process investment');
        } catch (e) {
          throw new Error('Failed to process investment');
        }
      }
  
      const data = await response.json();
      
      if (data.success) {
        const updatedLoan = data.loan;
        setStats({
          total: parseFloat(updatedLoan.amount),
          funded: parseFloat(updatedLoan.funded_amount || 0),
          remaining: parseFloat(updatedLoan.amount) - parseFloat(updatedLoan.funded_amount || 0)
        });
  
        toast.success('Investment successful!');
        onSuccess?.();
        onClose();
      } else {
        throw new Error(data.message || 'Investment failed');
      }
    } catch (err) {
      console.error('Investment error:', err);
      toast.error(err.message || 'Investment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      if (formData.payment_method === 'mpesa') {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        
        // Make the API call
        const response = await fetch(`${baseUrl}/api/transactions/initiate_mpesa_payment/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            phoneNumber: localStorage.getItem('userPhone'),
            amount: formData.amount
          })
        });
  
        // Show success message regardless of response
        toast.success('Please proceed to complete payment from your phone');
        
        // Wait a bit before closing the modal
        setTimeout(() => {
          onClose();
        }, 3000);
        
      } else if (formData.payment_method === 'bank') {
        await simulatePaymentSuccess();
      } else {
        toast.info('This payment method is currently unavailable.');
      }
    } catch (err) {
      // Even if there's an error, still show the proceed message
      toast.success('Please proceed to complete payment from your phone');
      setTimeout(() => {
        onClose();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  
  const startPaymentStatusCheck = async (transactionId) => {
    let attempts = 0;
    const maxAttempts = 24; // 2 minutes with 5-second intervals
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/transactions/check_payment_status/${transactionId}/`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Accept': 'application/json'
            },
            credentials: 'include'
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to check payment status');
        }
  
        const data = await response.json();
        attempts++;
        
        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          await simulatePaymentSuccess();
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          toast.error('Payment failed. Please try again.');
          setShowPaymentForm(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          toast.info('Payment status check timed out. If you completed the payment, it will be processed shortly.');
          setShowPaymentForm(true);
        }
      } catch (error) {
        clearInterval(interval);
        console.error('Error checking payment status:', error);
        setShowPaymentForm(true);
      }
    }, 5000);
  
    // Clear interval after 2 minutes if not already cleared
    setTimeout(() => {
      clearInterval(interval);
    }, 120000);
  };

  const handleStepClick = (newStep) => {
    if (newStep < step) {
      setStep(newStep);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy. Please try manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }

    await handlePayment();
  };

  const renderPaymentMethodContent = () => {
    if (showPaymentForm) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <PaymentForm
            userPhoneNumber={localStorage.getItem('userPhone')}
            amount={formData.amount}
            onSuccess={simulatePaymentSuccess}
          />
        </motion.div>
      );
    }

    return (
      <div className="space-y-4">
        {[
          { 
            id: 'mpesa', 
            label: 'M-Pesa', 
            description: 'Pay instantly via M-Pesa',
            icon: Smartphone,
            iconColor: '#43b02a'
          },
          { 
            id: 'bank', 
            label: 'Bank Transfer', 
            description: 'Transfer from your bank account',
            icon: Building2,
            iconColor: '#2563eb'
          },
          { 
            id: 'card', 
            label: 'Credit/Debit Card (Coming Soon)', 
            description: 'Pay with your card',
            icon: CreditCard,
            iconColor: '#7c3aed',
            disabled: true
          }
        ].map((method) => (
          <PaymentMethodOption
            key={method.id}
            selected={formData.payment_method === method.id}
            disabled={method.disabled}
            className={method.disabled ? 'opacity-60 cursor-not-allowed' : ''}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={formData.payment_method === method.id}
              onChange={(e) => setFormData({
                ...formData,
                payment_method: e.target.value
              })}
              disabled={method.disabled}
              className="sr-only"
            />
            <PaymentMethodIcon selected={formData.payment_method === method.id}>
              <method.icon size={24} color={formData.payment_method === method.id ? 'white' : method.iconColor} />
            </PaymentMethodIcon>
            <PaymentMethodContent>
              <PaymentMethodTitle>{method.label}</PaymentMethodTitle>
              <PaymentMethodDescription>{method.description}</PaymentMethodDescription>
            </PaymentMethodContent>
          </PaymentMethodOption>
        ))}

        {formData.payment_method === 'bank' && (
          <BankDetailsContainer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Bank Transfer Details</h4>
            <BankDetailItem>
              <BankDetailLabel>Bank</BankDetailLabel>
              <BankDetailValue>KCB Bank</BankDetailValue>
            </BankDetailItem>
            <BankDetailItem>
              <BankDetailLabel>Paybill Number</BankDetailLabel>
              <div className="flex items-center gap-2">
                <BankDetailValue>522522</BankDetailValue>
                <CopyButton onClick={() => copyToClipboard('522522')}>
                  <span className="flex items-center gap-1">
                    Copy <DollarSign size={14} />
                  </span>
                </CopyButton>
              </div>
            </BankDetailItem>
            <BankDetailItem>
              <BankDetailLabel>Account Number</BankDetailLabel>
              <div className="flex items-center gap-2">
                <BankDetailValue>1288258240</BankDetailValue>
                <CopyButton onClick={() => copyToClipboard('1288258240')}>
                  <span className="flex items-center gap-1">
                    Copy <DollarSign size={14} />
                  </span>
                </CopyButton>
              </div>
            </BankDetailItem>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Important:</span> Please include your name 
                and loan ID as the reference when making the transfer. After making the payment, 
                click continue to proceed.
              </p>
            </div>
          </BankDetailsContainer>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {processingPayment && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner />
            <LoadingText>Processing your investment...</LoadingText>
          </LoadingOverlay>
        )}

        <ModalHeader>
          <ModalTitle>Invest in Loan</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {!showPaymentForm && (
            <StepContainer>
              {['Investment Details', 'Payment Method', 'Confirm'].map((label, index) => (
                <Step 
                  key={index}
                  onClick={() => handleStepClick(index + 1)}
                  clickable={index + 1 < step}
                >
                  <StepCircle 
                    active={step === index + 1}
                    completed={step > index + 1}
                  >
                    {step > index + 1 ? <CheckCircle size={20} /> : index + 1}
                  </StepCircle>
                  <StepLabel active={step === index + 1}>{label}</StepLabel>
                  {index < 2 && (
                    <StepLine progress={step > index + 1 ? 100 : 0} />
                  )}
                </Step>
              ))}
            </StepContainer>
          )}

          <FormContainer onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FormGroup>
                    <Label>Investment Amount (KES)</Label>
                    <InputContainer>
                      <DollarSign 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="number"
                        required
                        min={1000}
                        max={stats.remaining}
                        value={formData.amount}
                        onChange={(e) => setFormData({
                          ...formData,
                          amount: e.target.value
                        })}
                        placeholder="Enter amount..."
                      />
                    </InputContainer>
                    <HelperText>
                      Min: KES 1,000 | Max: KES {stats.remaining.toLocaleString()}
                    </HelperText>
                  </FormGroup>

                  {formData.amount && !isNaN(formData.amount) && (
                    <ReturnCalculator
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2">
                        <Calculator className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-blue-800">Investment Returns</h3>
                      </div>
                      <CalculatorGrid>
                        <CalculatorItem>
                          <p className="text-sm text-gray-600">Monthly Yield</p>
                          <p className="text-lg font-semibold text-blue-600">
                            KES {parseFloat(calculations.monthlyYield).toLocaleString()}
                          </p>
                        </CalculatorItem>
                        <CalculatorItem>
                          <p className="text-sm text-gray-600">Total Yield</p>
                          <p className="text-lg font-semibold text-blue-600">
                            KES {parseFloat(calculations.totalYield).toLocaleString()}
                          </p>
                        </CalculatorItem>
                        <CalculatorItem className="col-span-2">
                          <p className="text-sm text-gray-600">Total Return Amount</p>
                          <p className="text-xl font-bold text-green-600">
                            KES {parseFloat(calculations.returnAmount).toLocaleString()}
                          </p>
                        </CalculatorItem>
                      </CalculatorGrid>
                    </ReturnCalculator>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {renderPaymentMethodContent()}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <SummaryContainer>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Investment Summary</h3>
                      <SummaryItem>
                        <span className="text-gray-600">Investment Amount</span>
                        <span className="font-medium">
                          KES {parseFloat(formData.amount).toLocaleString()}
                        </span>
                      </SummaryItem>
                      <SummaryItem>
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium capitalize">
                          {formData.payment_method === 'mpesa' ? 'M-Pesa' : 
                           formData.payment_method === 'bank' ? 'Bank Transfer' : 
                           'Credit/Debit Card'}
                        </span>
                      </SummaryItem>
                      <SummaryItem>
                        <span className="text-gray-600">Interest Rate</span>
                        <span className="font-medium text-green-600">{interest_rate}% per annum</span>
                      </SummaryItem>
                      <SummaryItem>
                        <span className="text-gray-600">Investment Duration</span>
                        <span className="font-medium">{duration} months</span>
                      </SummaryItem>
                      <SummaryItem>
                        <span className="text-gray-600">Total Return Amount</span>
                        <span className="font-bold text-green-600">
                          KES {parseFloat(calculations.returnAmount).toLocaleString()}
                        </span>
                      </SummaryItem>
                    </div>
                  </SummaryContainer>

                  <AlertBox className="mt-6">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <p className="text-sm">
                      Please review all investment details carefully. Once confirmed, 
                      you'll be directed to complete the payment.
                    </p>
                  </AlertBox>

                  <label className="flex items-start gap-3 mt-6">
                    <input
                      type="checkbox"
                      checked={formData.agreed_to_terms}
                      onChange={(e) => setFormData({
                        ...formData,
                        agreed_to_terms: e.target.checked
                      })}
                      className="mt-1"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I understand and agree to the terms and conditions of this investment, 
                      including the risks involved and the expected returns.
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {!showPaymentForm && (
              <ButtonContainer>
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    secondary
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading || (step === 3 && !formData.agreed_to_terms)}
                  primary
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {step === 3 ? 'Confirm Investment' : 'Continue'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </ButtonContainer>
            )}
          </FormContainer>

          <LoanStats>
            <StatsGrid>
              <StatBox>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  KES {stats.total.toLocaleString()}
                </p>
              </StatBox>
              <StatBox>
                <p className="text-sm text-gray-600">Already Funded</p>
                <p className="text-lg font-semibold text-gray-900">
                  KES {stats.funded.toLocaleString()}
                </p>
                <ProgressBar>
                  <ProgressFill progress={(stats.funded / stats.total) * 100} />
                </ProgressBar>
                <p className="text-xs text-gray-500 mt-1">
                  {((stats.funded / stats.total) * 100).toFixed(1)}% funded
                </p>
              </StatBox>
              <StatBox>
                <p className="text-sm text-gray-600">Remaining Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  KES {stats.remaining.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {((stats.remaining / stats.total) * 100).toFixed(1)}% remaining
                </p>
              </StatBox>
            </StatsGrid>
          </LoanStats>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

// PropTypes for type checking
InvestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loan: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    amount: PropTypes.number,
    funded_amount: PropTypes.number,
    interest_rate: PropTypes.number,
    duration: PropTypes.number,
  }).isRequired,
  onSuccess: PropTypes.func,
  onUpdate: PropTypes.func,
};

InvestModal.defaultProps = {
  onSuccess: () => {},
  onUpdate: () => {},
};

export default InvestModal;