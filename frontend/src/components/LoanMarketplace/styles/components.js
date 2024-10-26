import styled from 'styled-components';
import { motion } from 'framer-motion';

export const baseButtonStyles = `
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

export const MarketplaceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-height: 600px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  color: #1a1a1a;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

export const SearchInput = styled.input`
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

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

export const ApplyButton = styled(motion.button)`
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

export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const FilterButton = styled.button`
  ${baseButtonStyles}
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4CAF50' : '#e0e0e0'};

  &:hover {
    background-color: ${props => props.active ? '#43a047' : '#f5f5f5'};
  }
`;

export const SortSelect = styled.select`
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

export const LoanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const LoanCard = styled(motion.div)`
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

export const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoanAmount = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #1a1a1a;
  font-weight: 600;
`;

export const StatusBadge = styled.span`
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

export const CardBody = styled.div`
  padding: 20px;
`;

export const LoanDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DetailLabel = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

export const DetailValue = styled.span`
  color: #1a1a1a;
  font-weight: 500;
  font-size: 0.9rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin: 16px 0;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
`;

export const CardActions = styled.div`
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled(motion.button)`
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
export const ModalOverlay = styled(motion.div)`
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

export const ModalContent = styled(motion.div)`
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

export const ModalHeader = styled.div`
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

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #1a1a1a;
`;

export const CloseButton = styled.button`
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

export const ModalBody = styled.div`
  padding: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`;

export const Input = styled.input`
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

export const Select = styled.select`
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

export const InfoBox = styled.div`
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

export const InfoText = styled.div`
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

export const Table = styled.table`
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

export const DocumentBox = styled.div`
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

export const LoadingSpinner = styled(motion.div)`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 40px auto;
`;

export const InvestmentSteps = styled.div`
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

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
  flex: 1;
  text-align: center;
`;

export const StepCircle = styled.div`
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
`;