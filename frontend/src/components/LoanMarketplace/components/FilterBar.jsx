import React from 'react';
import {
  FilterBar as StyledFilterBar,
  FilterGroup,
  FilterButton,
  SortSelect
} from '../styles/components';

const FilterBar = ({ activeFilter, onFilterChange, onSortChange }) => {
  return (
    <StyledFilterBar>
      <FilterGroup>
        <FilterButton
          active={activeFilter === 'Available'}
          onClick={() => onFilterChange('Available')}
        >
          Available
        </FilterButton>
        <FilterButton
          active={activeFilter === 'Funding'}
          onClick={() => onFilterChange('Funding')}
        >
          Funding
        </FilterButton>
        <FilterButton
          active={activeFilter === 'Funded'}
          onClick={() => onFilterChange('Funded')}
        >
          Funded
        </FilterButton>
      </FilterGroup>
      
      <SortSelect onChange={(e) => {
        const [option, direction] = e.target.value.split('-');
        onSortChange(option, direction);
      }}>
        <option value="dateCreated-desc">Newest First</option>
        <option value="dateCreated-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="interestRate-desc">Highest Interest</option>
        <option value="interestRate-asc">Lowest Interest</option>
      </SortSelect>
    </StyledFilterBar>
  );
};

export default FilterBar;