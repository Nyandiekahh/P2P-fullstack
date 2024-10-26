import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { 
  DollarSign, Calendar, Percent, Shield, User, AlertCircle,
  Search, Eye, CheckCircle, Info, FileText, Download, 
  TrendingUp, X, AlertTriangle
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ENDPOINTS = {
    LOANS: '/loans/',  // For both fetching and creating loans
    INVESTMENTS: (id) => `/loans/${id}/invest/`,  // Function to generate URL
    DOCUMENTS: (id) => `/loans/${id}/documents/`  // Function to generate URL
};

const baseButtonStyles = `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;
  padding: 8px 16px;
`;

const MarketplaceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-height: 600px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  color: #1a1a1a;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
`;

const SubTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  padding-left: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const ApplyButton = styled(motion.button)`
  ${baseButtonStyles}
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  font-weight: 600;

  &:hover {
    background-color: #43a047;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FilterButton = styled.button`
  ${baseButtonStyles}
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4CAF50' : '#e0e0e0'};

  &:hover {
    background-color: ${props => props.active ? '#43a047' : '#f5f5f5'};
  }
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: white;
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const LoanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const LoanCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoanAmount = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #1a1a1a;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'available':
        return '#e8f5e9';
      case 'funding':
        return '#fff3e0';
      case 'funded':
        return '#f5f5f5';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'available':
        return '#2e7d32';
      case 'funding':
        return '#f57c00';
      case 'funded':
        return '#616161';
      default:
        return '#616161';
    }
  }};
`;

const CardBody = styled.div`
  padding: 20px;
`;

const LoanDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailLabel = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

const DetailValue = styled.span`
  color: #1a1a1a;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin: 16px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
`;

const CardActions = styled.div`
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
`;

const ActionButton = styled(motion.button)`
  ${baseButtonStyles}
  flex: 1;
  padding: 10px;
  background-color: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#4CAF50'};
  border: 1px solid #4CAF50;

  &:hover {
    background-color: ${props => props.primary ? '#43a047' : '#e8f5e9'};
  }

  &:disabled {
    background-color: #f0f0f0;
    border-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

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
  max-width: ${props => props.wide ? '900px' : '600px'};
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

const InvestmentSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 50px;
    right: 50px;
    height: 2px;
    background-color: #e0e0e0;
    z-index: 0;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
  flex: 1;
  text-align: center;
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  border: 2px solid ${props => props.active ? '#4CAF50' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 500;
  transition: all 0.3s ease;
`;

const StepLabel = styled.span`
  color: ${props => props.active ? '#4CAF50' : '#666'};
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '500' : 'normal'};
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

const InfoBox = styled.div`
  background-color: ${props => {
    switch (props.type) {
      case 'warning':
        return '#fff3e0';
      case 'success':
        return '#e8f5e9';
      case 'error':
        return '#ffebee';
      default:
        return '#e3f2fd';
    }
  }};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 16px 0;
`;

const InfoText = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 4px 0;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    font-weight: 500;
    color: #666;
    font-size: 0.9rem;
  }

  td {
    color: #1a1a1a;
  }
`;

const DocumentBox = styled.div`
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: #4CAF50;
  }
`;

const LoadingSpinner = styled(motion.div)`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 40px auto;
`;

const LoanMarketplace = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('dateCreated');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [investmentStep, setInvestmentStep] = useState(1);

  const [loanApplication, setLoanApplication] = useState({
    loan_type: '',
    amount: '',
    duration: '',
    interest_rate: '',
    purpose: '',
    description: ''
  });

  const [investmentForm, setInvestmentForm] = useState({
    amount: '',
    payment_method: '',
    agreed_to_terms: false
  });

  // For fetching loans
const fetchLoans = async () => {
  try {
      setLoading(true);
      const response = await api.get(ENDPOINTS.LOANS, {
          params: {
              search: searchTerm,
              status: activeFilter !== 'all' ? activeFilter : undefined,
              sort: sortOption,
              direction: sortDirection
          }
      });
      setLoans(response.data.results || response.data);
  } catch (err) {
      setError('Failed to fetch loans. Please try again later.');
      toast.error(err.response?.data?.message || 'Error loading loans');
    } finally {
      setLoading(false);
    }
};

  useEffect(() => {
    fetchLoans();
  }, [searchTerm, activeFilter, sortOption, sortDirection]);

  const handleLoanApplication = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        
        const formattedData = {
            loan_type: parseInt(loanApplication.loan_type),
            amount: parseFloat(loanApplication.amount),
            term_months: parseInt(loanApplication.duration),
            interest_rate: parseFloat(loanApplication.interest_rate),
            purpose: loanApplication.purpose,
            description: loanApplication.description,
            status: 'Available'  // Match exact database value
        };

        console.log('Sending loan application:', formattedData);

        const response = await api.post(ENDPOINTS.LOANS, formattedData);
        toast.success('Loan application submitted successfully!');
        setShowApplyModal(false);
        fetchLoans();
    } catch (err) {
        console.error('Error creating loan:', err.response?.data);
        toast.error(err.response?.data?.message || 'Failed to submit loan application');
    } finally {
        setLoading(false);
    }
};

const handleInvestmentSubmit = async (e) => {
  e.preventDefault();
  if (investmentStep < 3) {
    setInvestmentStep(prev => prev + 1);
    return;
  }

  try {
    setLoading(true);
    
    const investmentData = {
      amount: parseFloat(investmentForm.amount),
      payment_method: investmentForm.payment_method
    };

    const response = await api.post(
      ENDPOINTS.INVESTMENTS(selectedLoan.id),
      investmentData
    );

    // Handle different payment responses
    if (response.data.payment_method === 'mpesa') {
      toast.info('Please check your phone for M-Pesa prompt');
    } else if (response.data.payment_method === 'bank') {
      toast.info('Bank transfer details have been sent to your email');
    } else if (response.data.payment_url) {
      window.location.href = response.data.payment_url;
    }

    setShowInvestModal(false);
    fetchLoans();
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to process investment');
  } finally {
    setLoading(false);
  }
};

const handleDocumentDownload = async (documentId) => {
  try {
    const response = await api.get(
      `${ENDPOINTS.DOCUMENTS(selectedLoan.id)}/${documentId}`,
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
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

  const calculateStats = () => {
    const totalAvailable = loans.filter(loan => loan.status === 'Available').length;
    const totalFunding = loans.filter(loan => loan.status === 'Funding').length;
    const averageInterestRate = loans.reduce((acc, loan) => acc + loan.interest_rate, 0) / loans.length;
    
    return {
      totalAvailable,
      totalFunding,
      averageInterestRate: averageInterestRate || 0
    };
  };

  const stats = calculateStats();

  const filteredAndSortedLoans = useMemo(() => {
    if (!loans) return [];
    
    return loans.filter(loan => {
      const searchMatch = loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.borrower.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = activeFilter === 'all' || 
        loan.status.toLowerCase() === activeFilter.toLowerCase();
      return searchMatch && statusMatch;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'interestRate':
          comparison = a.interest_rate - b.interest_rate;
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'dateCreated':
          comparison = new Date(a.created_at) - new Date(b.created_at);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [loans, searchTerm, activeFilter, sortOption, sortDirection]);

  return (
    <MarketplaceContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <InfoBox type="error">
          <AlertCircle size={20} />
          <InfoText>{error}</InfoText>
        </InfoBox>
      )}

      <Header>
        <HeaderLeft>
          <Title>Loan Marketplace</Title>
          <SubTitle>
            {stats.totalAvailable} loans available • {stats.totalFunding} currently funding • 
            {stats.averageInterestRate.toFixed(1)}% avg. interest rate
          </SubTitle>
        </HeaderLeft>
        <HeaderRight>
          <SearchContainer>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <ApplyButton
            onClick={() => setShowApplyModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DollarSign size={18} />
            Apply for Loan
          </ApplyButton>
        </HeaderRight>
      </Header>

      <FilterBar>
    <FilterGroup>
    <FilterButton
    active={activeFilter === 'Available'}
    onClick={() => setActiveFilter('Available')}
>
    Available
</FilterButton>
<FilterButton
    active={activeFilter === 'Funding'}
    onClick={() => setActiveFilter('Funding')}
>
    Funding
</FilterButton>
<FilterButton
    active={activeFilter === 'Funded'}
    onClick={() => setActiveFilter('Funded')}
>
    Funded
</FilterButton>
    </FilterGroup>
    
    <SortSelect onChange={(e) => {
        const [option, direction] = e.target.value.split('-');
        setSortOption(option);
        setSortDirection(direction);
    }}>
        <option value="dateCreated-desc">Newest First</option>
        <option value="dateCreated-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="interestRate-desc">Highest Interest</option>
        <option value="interestRate-asc">Lowest Interest</option>
    </SortSelect>
    </FilterBar>

      {loading ? (
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        <LoanGrid>
          <AnimatePresence>
            {filteredAndSortedLoans.map(loan => (
              <LoanCard
              key={loan.id}
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
            
                <DetailItem>
                  <User size={16} />
                  <DetailLabel>Borrower:</DetailLabel>
                  <DetailValue>{loan.user?.username || 'Anonymous'}</DetailValue>
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
                ...
              </CardBody>
            </LoanCard>
            ))}
          </AnimatePresence>
        </LoanGrid>
      )}
      
      <AnimatePresence>
        {showApplyModal && (
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
                <CloseButton onClick={() => setShowApplyModal(false)}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                <Form onSubmit={handleLoanApplication}>
                  <FormGroup>
                    <Label>Loan Amount (KES)</Label>
                    <Input
                      type="number"
                      required
                      min="5000"
                      max="1000000"
                      value={loanApplication.amount}
                      onChange={(e) => setLoanApplication({
                        ...loanApplication,
                        amount: e.target.value
                      })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Duration (months)</Label>
                    <Select
                      required
                      value={loanApplication.duration}
                      onChange={(e) => setLoanApplication({
                        ...loanApplication,
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
                    <Label>Proposed Interest Rate (%)</Label>
                    <Input
                      type="number"
                      required
                      min="5"
                      max="25"
                      step="0.5"
                      value={loanApplication.interest_rate}
                      onChange={(e) => setLoanApplication({
                        ...loanApplication,
                        interest_rate: e.target.value
                      })}
                    />
                  </FormGroup>

                  <FormGroup>
    <Label>Loan Type</Label>
    <Select
        required
        value={loanApplication.loan_type}
        onChange={(e) => setLoanApplication({
            ...loanApplication,
            loan_type: e.target.value
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
                    <Input
                      as="textarea"
                      rows={4}
                      required
                      value={loanApplication.description}
                      onChange={(e) => setLoanApplication({
                        ...loanApplication,
                        description: e.target.value
                      })}
                      placeholder="Provide detailed information about your loan request..."
                    />
                  </FormGroup>

                  <ActionButton
                    type="submit"
                    primary
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </ActionButton>
                </Form>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetailModal && selectedLoan && (
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
                <CloseButton onClick={() => setShowDetailModal(false)}>
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
                          KES {selectedLoan.amount.toLocaleString()}
                        </p>
                      </InfoText>
                    </InfoBox>

                    <Table>
                      <tbody>
                        <tr>
                          <th>Interest Rate</th>
                          <td>{selectedLoan.interest_rate}% per annum</td>
                        </tr>
                        <tr>
                          <th>Duration</th>
                          <td>{selectedLoan.duration} months</td>
                        </tr>
                        <tr>
                          <th>Monthly Payment</th>
                          <td>KES {selectedLoan.monthly_payment.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>Total Return</th>
                          <td>KES {selectedLoan.total_return.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>Risk Level</th>
                          <td>
                            <StatusBadge status={selectedLoan.risk_level}>
                              {selectedLoan.risk_level}
                            </StatusBadge>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div>
                    <h4>Loan Purpose</h4>
                    <p>{selectedLoan.description}</p>

                    <h4>Borrower Information</h4>
                    <Table>
                      <tbody>
                        <tr>
                          <th>Credit Score</th>
                          <td>{selectedLoan.credit_score}</td>
                        </tr>
                        <tr>
                          <th>Date Listed</th>
                          <td>{new Date(selectedLoan.created_at).toLocaleDateString()}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <h4>Documents</h4>
                    {selectedLoan.documents.map((doc) => (
                      <DocumentBox key={doc.id} onClick={() => handleDocumentDownload(doc.id)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FileText size={20} />
                          <span>{doc.name}</span>
                        </div>
                        <Download size={20} />
                      </DocumentBox>
                    ))}
                  </div>
                </div>

                {selectedLoan.status !== 'Funded' && (
                  <ActionButton
                    primary
                    onClick={() => {
                      setShowDetailModal(false);
                      setInvestmentStep(1);
                      setShowInvestModal(true);
                    }}
                    style={{ marginTop: '24px' }}
                  >
                    <DollarSign size={18} />
                    Invest in this Loan
                  </ActionButton>
                )}
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInvestModal && selectedLoan && (
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
                <CloseButton onClick={() => setShowInvestModal(false)}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                <InvestmentSteps>
                  {['Investment Details', 'Review', 'Payment'].map((step, index) => (
                    <Step key={index}>
                      <StepCircle active={investmentStep === index + 1}>
                        {index + 1}
                      </StepCircle>
                      <StepLabel active={investmentStep === index + 1}>{step}</StepLabel>
                    </Step>
                  ))}
                </InvestmentSteps>

                <Form onSubmit={handleLoanApplication}>
    <FormGroup>
        <Label>Loan Type</Label>
        <Select
            required
            value={loanApplication.loan_type}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
                loan_type: e.target.value
            })}
        >
            <option value="">Select loan type</option>
            <option value="1">Business Loan</option>
            <option value="2">Personal Loan</option>
            <option value="3">Education Loan</option>
            {/* Add other loan types as needed */}
        </Select>
    </FormGroup>

    <FormGroup>
        <Label>Amount (KES)</Label>
        <Input
            type="number"
            required
            min="5000"
            max="1000000"
            value={loanApplication.amount}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
                amount: e.target.value
            })}
        />
    </FormGroup>

    <FormGroup>
        <Label>Duration (months)</Label>
        <Select
            required
            value={loanApplication.duration}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
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
            value={loanApplication.interest_rate}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
                interest_rate: e.target.value
            })}
        />
    </FormGroup>

    <FormGroup>
        <Label>Purpose</Label>
        <Select
            required
            value={loanApplication.purpose}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
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
        <Input
            as="textarea"
            rows={4}
            required
            value={loanApplication.description}
            onChange={(e) => setLoanApplication({
                ...loanApplication,
                description: e.target.value
            })}
            placeholder="Provide detailed information about your loan request..."
        />
    </FormGroup>

    <ActionButton
        type="submit"
        primary
        disabled={loading}
    >
        {loading ? 'Submitting...' : 'Submit Application'}
    </ActionButton>
</Form>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </MarketplaceContainer>
  );
};

export default LoanMarketplace;