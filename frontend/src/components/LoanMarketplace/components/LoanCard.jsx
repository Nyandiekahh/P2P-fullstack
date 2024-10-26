import React from 'react';
import { 
    Percent, 
    Calendar, 
    Shield, 
    TrendingUp,
    User 
} from 'lucide-react';
import {
    LoanCard as StyledLoanCard,
    CardHeader,
    LoanAmount,
    StatusBadge,
    CardBody,
    LoanDetailGrid,
    DetailItem,
    DetailLabel,
    DetailValue,
    ProgressBar,
    ProgressFill,
    CardActions,
    ActionButton
} from '../styles/components';

const LoanCard = ({ loan, onViewDetails, onInvest }) => {
    return (
        <StyledLoanCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <CardHeader>
                <LoanAmount>KES {parseFloat(loan.amount).toLocaleString()}</LoanAmount>
                <StatusBadge status={loan.status}>{loan.status}</StatusBadge>
            </CardHeader>

            <CardBody>
                <LoanDetailGrid>
                    <DetailItem>
                        <Percent size={16} />
                        <DetailLabel>Interest:</DetailLabel>
                        <DetailValue>{loan.interest_rate}%</DetailValue>
                    </DetailItem>

                    <DetailItem>
                        <Calendar size={16} />
                        <DetailLabel>Duration:</DetailLabel>
                        <DetailValue>{loan.term_months} months</DetailValue>
                    </DetailItem>

                    <DetailItem>
                        <Shield size={16} />
                        <DetailLabel>Risk Level:</DetailLabel>
                        <DetailValue>{loan.risk_level}</DetailValue>
                    </DetailItem>

                    <DetailItem>
                        <TrendingUp size={16} />
                        <DetailLabel>Progress:</DetailLabel>
                        <DetailValue>{loan.progress}%</DetailValue>
                    </DetailItem>
                </LoanDetailGrid>

                <DetailItem>
                    <User size={16} />
                    <DetailLabel>Purpose:</DetailLabel>
                    <DetailValue>{loan.purpose}</DetailValue>
                </DetailItem>

                {loan.status === 'Funding' && (
                    <>
                        <ProgressBar>
                            <ProgressFill progress={loan.progress || 0} />
                        </ProgressBar>
                        <DetailValue style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                            {loan.progress || 0}% Funded
                        </DetailValue>
                    </>
                )}
            </CardBody>

            <CardActions>
                <ActionButton onClick={() => onViewDetails(loan)}>
                    View Details
                </ActionButton>
                {loan.status !== 'Funded' && (
                    <ActionButton primary onClick={() => onInvest(loan)}>
                        Invest Now
                    </ActionButton>
                )}
            </CardActions>
        </StyledLoanCard>
    );
};

export default LoanCard;