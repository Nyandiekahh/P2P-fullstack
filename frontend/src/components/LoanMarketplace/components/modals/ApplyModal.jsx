import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #1a1a1a;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #43a047;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const ApplyModal = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        loan_type: '',
        amount: '',
        duration: '',
        interest_rate: '',
        purpose: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formattedData = {
                loan_type: parseInt(formData.loan_type),
                amount: parseFloat(formData.amount),
                term_months: parseInt(formData.duration),
                interest_rate: parseFloat(formData.interest_rate),
                purpose: formData.purpose,
                description: formData.description,
                status: 'Available'
            };

            // Replace with your API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            toast.success('Loan application submitted successfully!');
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit loan application');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ModalContent
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <ModalHeader>
                    <ModalTitle>Apply for a Loan</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <X size={24} />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Loan Type</Label>
                            <Select
                                required
                                value={formData.loan_type}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    loan_type: e.target.value
                                })}
                            >
                                <option value="">Select loan type</option>
                                <option value="1">Business Loan</option>
                                <option value="2">Personal Loan</option>
                                <option value="3">Education Loan</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Amount (KES)</Label>
                            <Input
                                type="number"
                                required
                                min="5000"
                                max="1000000"
                                value={formData.amount}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    amount: e.target.value
                                })}
                                placeholder="Enter loan amount"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Duration (months)</Label>
                            <Select
                                required
                                value={formData.duration}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    duration: e.target.value
                                })}
                            >
                                <option value="">Select duration</option>
                                <option value="3">3 months</option>
                                <option value="6">6 months</option>
                                <option value="12">12 months</option>
                                <option value="24">24 months</option>
                                <option value="36">36 months</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Interest Rate (%)</Label>
                            <Input
                                type="number"
                                required
                                step="0.1"
                                min="5"
                                max="25"
                                value={formData.interest_rate}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    interest_rate: e.target.value
                                })}
                                placeholder="Enter proposed interest rate"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Purpose</Label>
                            <Select
                                required
                                value={formData.purpose}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    purpose: e.target.value
                                })}
                            >
                                <option value="">Select purpose</option>
                                <option value="Business Expansion">Business Expansion</option>
                                <option value="Education">Education</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Personal">Personal</option>
                                <option value="Debt Consolidation">Debt Consolidation</option>
                                <option value="Emergency">Emergency</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Description</Label>
                            <Textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    description: e.target.value
                                })}
                                placeholder="Provide detailed information about your loan request..."
                                rows={4}
                            />
                        </FormGroup>

                        <SubmitButton
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <DollarSign size={18} />
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </SubmitButton>
                    </Form>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ApplyModal;