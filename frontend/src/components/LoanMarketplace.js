import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Calendar, 
  Percent, 
  Shield, 
  User, 
  AlertCircle,
  Search,
  SortAsc,
  ArrowRight,
  XCircle,
  CheckCircle,
  Info,
  CreditCard,
  FileText,
  Download,
  Clock,
  TrendingUp,
  Filter,
  X,
  ChevronRight,
  ChevronDown,
  Eye,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

// Base button styles for reuse
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

// Core styled components
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

// Grid and Card Components
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


// Progress Bar Components
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

// Modal Components
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

// Investment Flow Components
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

// Form Components
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

// Main Component
const LoanMarketplace = () => {
  // State Management
  const [loans, setLoans] = useState([
    {
      id: 1,
      amount: 50000,
      status: 'Available',
      interestRate: 12,
      duration: 12,
      creditScore: 750,
      borrower: 'John D.',
      progress: 0,
      purpose: 'Business Expansion',
      dateCreated: '2024-01-15',
      documents: ['business_plan.pdf', 'financial_statement.pdf'],
      riskLevel: 'Low',
      monthlyPayment: 4650,
      totalReturn: 55800,
      description: 'Expanding local retail business with new inventory and equipment.'
    },
    {
      id: 2,
      amount: 25000,
      status: 'Funding',
      interestRate: 15,
      duration: 6,
      creditScore: 720,
      borrower: 'Sarah M.',
      progress: 65,
      purpose: 'Education',
      dateCreated: '2024-01-20',
      documents: ['admission_letter.pdf', 'cost_breakdown.pdf'],
      riskLevel: 'Medium',
      monthlyPayment: 4375,
      totalReturn: 26250,
      description: 'Master\'s degree program in Business Administration.'
    },
    // Add more sample loans as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('dateCreated');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Modal States
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [investmentStep, setInvestmentStep] = useState(1);

  // Form States
  const [loanApplication, setLoanApplication] = useState({
    amount: '',
    duration: '',
    interestRate: '',
    purpose: '',
    description: ''
  });

  const [investmentForm, setInvestmentForm] = useState({
    amount: '',
    paymentMethod: '',
    agreedToTerms: false
  });

  // Filtering and Sorting Logic
  const filteredAndSortedLoans = useMemo(() => {
    return loans
      .filter(loan => {
        // Filter by search term
        const searchMatch = loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.borrower.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status
        const statusMatch = activeFilter === 'all' || 
          loan.status.toLowerCase() === activeFilter.toLowerCase();

        return searchMatch && statusMatch;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (sortOption) {
          case 'amount':
            comparison = a.amount - b.amount;
            break;
          case 'interestRate':
            comparison = a.interestRate - b.interestRate;
            break;
          case 'duration':
            comparison = a.duration - b.duration;
            break;
          case 'creditScore':
            comparison = a.creditScore - b.creditScore;
            break;
          case 'dateCreated':
            comparison = new Date(a.dateCreated) - new Date(b.dateCreated);
            break;
          default:
            comparison = 0;
        }

        return sortDirection === 'desc' ? -comparison : comparison;
      });
  }, [loans, searchTerm, activeFilter, sortOption, sortDirection]);

  // Handler Functions
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (e) => {
    const [option, direction] = e.target.value.split('-');
    setSortOption(option);
    setSortDirection(direction);
  };

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  const handleInvestClick = (loan) => {
    setSelectedLoan(loan);
    setInvestmentStep(1);
    setShowInvestModal(true);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to submit loan application
      console.log('Submitting loan application:', loanApplication);
      // Add your API logic here
      
      setShowApplyModal(false);
      // Show success message or handle response
    } catch (error) {
      console.error('Error submitting loan application:', error);
      // Handle error
    }
  };

  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    if (investmentStep < 3) {
      setInvestmentStep(prev => prev + 1);
    } else {
      try {
        // API call to submit investment
        console.log('Submitting investment:', investmentForm);
        // Add your API logic here
        
        setShowInvestModal(false);
        // Show success message or handle response
      } catch (error) {
        console.error('Error submitting investment:', error);
        // Handle error
      }
    }
  };

  // Calculate loan statistics
  const calculateStats = () => {
    const totalAvailable = loans.filter(loan => loan.status === 'Available').length;
    const totalFunding = loans.filter(loan => loan.status === 'Funding').length;
    const averageInterestRate = loans.reduce((acc, loan) => acc + loan.interestRate, 0) / loans.length;
    
    return {
      totalAvailable,
      totalFunding,
      averageInterestRate
    };
  };

  const stats = calculateStats();

  return (
    <MarketplaceContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
              onChange={handleSearchChange}
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
            active={activeFilter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            All Loans
          </FilterButton>
          <FilterButton
            active={activeFilter === 'available'}
            onClick={() => handleFilterChange('available')}
          >
            Available
          </FilterButton>
          <FilterButton
            active={activeFilter === 'funding'}
            onClick={() => handleFilterChange('funding')}
          >
            Funding
          </FilterButton>
          <FilterButton
            active={activeFilter === 'funded'}
            onClick={() => handleFilterChange('funded')}
          >
            Funded
          </FilterButton>
        </FilterGroup>
        
        <SortSelect onChange={handleSortChange}>
          <option value="dateCreated-desc">Newest First</option>
          <option value="dateCreated-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
          <option value="interestRate-desc">Highest Interest</option>
          <option value="interestRate-asc">Lowest Interest</option>
          <option value="duration-asc">Shortest Duration</option>
          <option value="duration-desc">Longest Duration</option>
        </SortSelect>
      </FilterBar>

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
                <LoanAmount>KES {loan.amount.toLocaleString()}</LoanAmount>
                <StatusBadge status={loan.status}>{loan.status}</StatusBadge>
              </CardHeader>

              <CardBody>
                <LoanDetailGrid>
                  <DetailItem>
                    <Percent size={16} />
                    <DetailLabel>Interest:</DetailLabel>
                    <DetailValue>{loan.interestRate}%</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <Calendar size={16} />
                    <DetailLabel>Duration:</DetailLabel>
                    <DetailValue>{loan.duration} months</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <Shield size={16} />
                    <DetailLabel>Credit Score:</DetailLabel>
                    <DetailValue>{loan.creditScore}</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <TrendingUp size={16} />
                    <DetailLabel>Risk Level:</DetailLabel>
                    <DetailValue>{loan.riskLevel}</DetailValue>
                  </DetailItem>
                </LoanDetailGrid>

                <DetailItem>
                  <User size={16} />
                  <DetailLabel>Borrower:</DetailLabel>
                  <DetailValue>{loan.borrower}</DetailValue>
                </DetailItem>

                {loan.status === 'Funding' && (
                  <>
                    <ProgressBar>
                      <ProgressFill progress={loan.progress} />
                    </ProgressBar>
                    <DetailValue style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                      {loan.progress}% Funded
                    </DetailValue>
                  </>
                )}

                <CardActions>
                  <ActionButton
                    onClick={() => handleLoanClick(loan)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye size={16} />
                    View Details
                  </ActionButton>
                  
                  <ActionButton
                    primary
                    onClick={() => handleInvestClick(loan)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loan.status === 'Funded'}
                  >
                    <DollarSign size={16} />
                    {loan.status === 'Funded' ? 'Fully Funded' : 'Invest Now'}
                  </ActionButton>
                </CardActions>
              </CardBody>
            </LoanCard>
          ))}
        </AnimatePresence>
      </LoanGrid>

      {/* Loan Application Modal */}
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
                <Form onSubmit={handleApplySubmit}>
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
                      value={loanApplication.interestRate}
                      onChange={(e) => setLoanApplication({
                        ...loanApplication,
                        interestRate: e.target.value
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

                  <InfoBox type="info">
                    <Info size={20} />
                    <InfoText>
                      <h4>Important Note</h4>
                      <p>Your application will be reviewed by our team. Make sure all information is accurate and complete.</p>
                    </InfoText>
                  </InfoBox>

                  <ActionButton
                    type="submit"
                    primary
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Application
                  </ActionButton>
                </Form>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Loan Details Modal */}
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
                          <td>{selectedLoan.interestRate}% per annum</td>
                        </tr>
                        <tr>
                          <th>Duration</th>
                          <td>{selectedLoan.duration} months</td>
                        </tr>
                        <tr>
                          <th>Monthly Payment</th>
                          <td>KES {selectedLoan.monthlyPayment.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>Total Return</th>
                          <td>KES {selectedLoan.totalReturn.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <th>Risk Level</th>
                          <td>
                            <StatusBadge status={selectedLoan.riskLevel}>
                              {selectedLoan.riskLevel}
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
                          <td>{selectedLoan.creditScore}</td>
                        </tr>
                        <tr>
                          <th>Date Listed</th>
                          <td>{new Date(selectedLoan.dateCreated).toLocaleDateString()}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <h4>Documents</h4>
                    {selectedLoan.documents.map((doc, index) => (
                      <DocumentBox key={index}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FileText size={20} />
                          <span>{doc}</span>
                        </div>
                        <Download size={20} style={{ cursor: 'pointer' }} />
                      </DocumentBox>
                    ))}
                  </div>
                </div>

                {selectedLoan.status !== 'Funded' && (
                  <ActionButton
                    primary
                    onClick={() => {
                      setShowDetailModal(false);
                      handleInvestClick(selectedLoan);
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

      {/* Investment Modal */}
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

                <Form onSubmit={handleInvestmentSubmit}>
                  {investmentStep === 1 && (
                    <>
                      <InfoBox>
                        <Info size={20} />
                        <InfoText>
                          <h4>Loan Overview</h4>
                          <p>Amount: KES {selectedLoan.amount.toLocaleString()}</p>
                          <p>Interest Rate: {selectedLoan.interestRate}%</p>
                          <p>Duration: {selectedLoan.duration} months</p>
                        </InfoText>
                      </InfoBox>

                      <FormGroup>
                        <Label>Investment Amount (KES)</Label>
                        <Input
                          type="number"
                          required
                          min="1000"
                          max={selectedLoan.amount}
                          value={investmentForm.amount}
                          onChange={(e) => setInvestmentForm({
                            ...investmentForm,
                            amount: e.target.value
                          })}
                        />
                      </FormGroup>

                      <Table>
                        <tbody>
                          <tr>
                            <th>Expected Monthly Return</th>
                            <td>
                              KES {((investmentForm.amount * (selectedLoan.interestRate / 100)) / 12).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <th>Total Expected Return</th>
                            <td>
                              KES {(investmentForm.amount * (1 + (selectedLoan.interestRate / 100) * (selectedLoan.duration / 12))).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  )}

                  {investmentStep === 2 && (
                    <>
                      <InfoBox type="warning">
                        <AlertTriangle size={20} />
                        <InfoText>
                          <h4>Review Your Investment</h4>
                          <p>Please review all details carefully before proceeding to payment.</p>
                        </InfoText>
                      </InfoBox>

                      <Table>
                        <tbody>
                          <tr>
                            <th>Investment Amount</th>
                            <td>KES {parseFloat(investmentForm.amount).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <th>Interest Rate</th>
                            <td>{selectedLoan.interestRate}% per annum</td>
                          </tr>
                          <tr>
                            <th>Investment Term</th>
                            <td>{selectedLoan.duration} months</td>
                          </tr>
                          <tr>
                            <th>Expected Total Return</th>
                            <td>
                              KES {(investmentForm.amount * (1 + (selectedLoan.interestRate / 100) * (selectedLoan.duration / 12))).toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  )}

                  {investmentStep === 3 && (
                    <>
                      <InfoBox type="success">
                        <CheckCircle size={20} />
                        <InfoText>
                          <h4>Complete Your Investment</h4>
                          <p>Choose your preferred payment method to complete the investment.</p>
                        </InfoText>
                      </InfoBox>

                      <FormGroup>
                        <Label>Payment Method</Label>
                        <Select
                          required
                          value={investmentForm.paymentMethod}
                          onChange={(e) => setInvestmentForm({
                            ...investmentForm,
                            paymentMethod: e.target.value
                          })}
                        >
                          <option value="">Select payment method</option>
                          <option value="mpesa">M-Pesa</option>
                          <option value="bank">Bank Transfer</option>
                          <option value="card">Credit/Debit Card</option>
                        </Select>
                      </FormGroup>

                      {investmentForm.paymentMethod && (
                        <InfoBox>
                          <Info size={20} />
                          <InfoText>
                            <h4>Next Steps</h4>
                            <p>
                              {investmentForm.paymentMethod === 'mpesa' && 
                                'You will receive an M-Pesa prompt to complete the payment.'}
                              {investmentForm.paymentMethod === 'bank' && 
                                'You will receive bank transfer details via email.'}
                              {investmentForm.paymentMethod === 'card' && 
                                'You will be redirected to secure payment gateway.'}
                            </p>
                          </InfoText>
                        </InfoBox>
                      )}
                    </>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    {investmentStep > 1 && (
                      <ActionButton
                        type="button"
                        onClick={() => setInvestmentStep(prev => prev - 1)}
                      >
                        Back
                      </ActionButton>
                    )}
                    <ActionButton
                      primary
                      type="submit"
                    >
                      {investmentStep === 3 ? 'Complete Investment' : 'Continue'}
                    </ActionButton>
                  </div>
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