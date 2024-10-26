import React from 'react';
import { Search, DollarSign } from 'lucide-react';
import {
  Header as StyledHeader,
  HeaderLeft,
  HeaderRight,
  Title,
  SubTitle,
  SearchContainer,
  SearchIcon,
  SearchInput,
  ApplyButton
} from '../styles/components';

const Header = ({ stats, searchTerm, onSearchChange, onApplyClick }) => {
  return (
    <StyledHeader>
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchContainer>
        <ApplyButton
          onClick={onApplyClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <DollarSign size={18} />
          Apply for Loan
        </ApplyButton>
      </HeaderRight>
    </StyledHeader>
  );
};

export default Header;