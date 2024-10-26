import React from 'react';
import { X, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { submitInvestment } from '../../services/api';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Select,
    ActionButton,
    InvestmentSteps,
    Step,
    StepCircle,
    InfoBox
} from '../../styles/components';

const InvestModal = ({ isOpen, onClose, loan, onSuccess }) => {
    const [loading, setLoading] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        amount: '',
        payment_method: '',
        agreed_to_terms: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (step < 3) {
            setStep(prev => prev + 1);
            return;
        }

        try {
            setLoading(true);
            const response = await submitInvestment(loan.id, {
                amount: parseFloat(formData.amount),
                payment_method: formData.payment_method
            });

            // Handle different payment responses
            if (response.payment_method === 'mpesa') {
                toast.info('Please check your phone for M-Pesa prompt');
            } else if (response.payment_method === 'bank') {
                toast.info('Bank transfer details have been sent to your email');
            } else if (response.payment_url) {
                window.location.href = response.payment_url;
            }

            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to process investment');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !loan) return null;

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <FormGroup>
                            <Label>Investment Amount (KES)</Label>
                            <Input
                                type="number"
                                required
                                min={1000}
                                max={loan.amount - loan.funded_amount}
                                value={formData.amount}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    amount: e.target.value
                                })}
                            />
                            <InfoBox>
                                Minimum: KES 1,000 | Maximum: KES {(loan.amount - loan.funded_amount).toLocaleString()}
                            </InfoBox>
                        </FormGroup>
                    </>
                );
            case 2:
                return (
                    <>
                        <FormGroup>
                            <Label>Payment Method</Label>
                            <Select
                                required
                                value={formData.payment_method}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    payment_method: e.target.value
                                })}
                            >
                                <option value="">Select payment method</option>
                                <option value="mpesa">M-Pesa</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="card">Credit/Debit Card</option>
                            </Select>
                        </FormGroup>
                    </>
                );
            case 3:
                return (
                    <>
                        <InfoBox>
                            <div>
                                <h4>Investment Summary</h4>
                                <p>Amount: KES {parseFloat(formData.amount).toLocaleString()}</p>
                                <p>Payment Method: {formData.payment_method}</p>
                                <p>Expected Return: {loan.interest_rate}% per annum</p>
                            </div>
                        </InfoBox>
                        <FormGroup>
                            <Label>
                                <input
                                    type="checkbox"
                                    checked={formData.agreed_to_terms}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        agreed_to_terms: e.target.checked
                                    })}
                                    required
                                /> I agree to the terms and conditions
                            </Label>
                        </FormGroup>
                    </>
                );
            default:
                return null;
        }
    };

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
                    <ModalTitle>Invest in Loan</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <X size={24} />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <InvestmentSteps>
                        {['Investment Details', 'Payment Method', 'Confirm'].map((stepLabel, index) => (
                            <Step key={index}>
                                <StepCircle active={step === index + 1}>
                                    {index + 1}
                                </StepCircle>
                                <span>{stepLabel}</span>
                            </Step>
                        ))}
                    </InvestmentSteps>

                    <Form onSubmit={handleSubmit}>
                        {renderStepContent()}
                        
                        <ActionButton
                            type="submit"
                            primary
                            disabled={loading || (step === 3 && !formData.agreed_to_terms)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? 'Processing...' : step === 3 ? 'Confirm Investment' : 'Continue'}
                            <DollarSign size={18} />
                        </ActionButton>
                    </Form>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default InvestModal;