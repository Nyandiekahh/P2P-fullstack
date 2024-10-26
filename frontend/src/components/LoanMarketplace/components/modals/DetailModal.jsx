import React from 'react';
import { 
    DollarSign, 
    X, 
    FileText, 
    Download 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { downloadDocument } from '../../services/api';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
    Table,
    InfoBox,
    InfoText,
    DocumentBox,
    ActionButton,
    StatusBadge
} from '../../styles/components';

const DetailModal = ({ isOpen, onClose, loan, onInvestClick }) => {
    if (!isOpen || !loan) return null;

    const handleDocumentDownload = async (documentId) => {
        try {
            const blob = await downloadDocument(loan.id, documentId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document-${documentId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            toast.error('Failed to download document');
        }
    };

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ModalContent
                wide
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <ModalHeader>
                    <ModalTitle>Loan Details</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <X size={24} />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <InfoBox>
                                <DollarSign size={20} />
                                <InfoText>
                                    <h4>Loan Amount</h4>
                                    <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                                        KES {loan.amount.toLocaleString()}
                                    </p>
                                </InfoText>
                            </InfoBox>

                            <Table>
                                <tbody>
                                    <tr>
                                        <th>Interest Rate</th>
                                        <td>{loan.interest_rate}% per annum</td>
                                    </tr>
                                    <tr>
                                        <th>Duration</th>
                                        <td>{loan.term_months} months</td>
                                    </tr>
                                    <tr>
                                        <th>Monthly Payment</th>
                                        <td>KES {loan.monthly_payment.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Return</th>
                                        <td>KES {loan.total_return.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Risk Level</th>
                                        <td>
                                            <StatusBadge status={loan.risk_level}>
                                                {loan.risk_level}
                                            </StatusBadge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div>
                            <h4>Loan Purpose</h4>
                            <p>{loan.description}</p>

                            <h4>Borrower Information</h4>
                            <Table>
                                <tbody>
                                    <tr>
                                        <th>Credit Score</th>
                                        <td>{loan.credit_score}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Listed</th>
                                        <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <h4>Documents</h4>
                            {loan.documents.map((doc) => (
                                <DocumentBox 
                                    key={doc.id} 
                                    onClick={() => handleDocumentDownload(doc.id)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <FileText size={20} />
                                        <span>{doc.name}</span>
                                    </div>
                                    <Download size={20} />
                                </DocumentBox>
                            ))}
                        </div>
                    </div>

                    {loan.status !== 'Funded' && (
                        <ActionButton
                            primary
                            onClick={onInvestClick}
                            style={{ marginTop: '24px' }}
                        >
                            <DollarSign size={18} />
                            Invest in this Loan
                        </ActionButton>
                    )}
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default DetailModal;