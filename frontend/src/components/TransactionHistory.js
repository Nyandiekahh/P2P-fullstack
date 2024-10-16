import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

const TransactionContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f0f4f8;
  font-size: 14px;
`;

const TransactionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled(motion.li)`
  background-color: #f0f4f8;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

const TransactionType = styled.span`
  font-weight: bold;
  color: ${props => props.type === 'credit' ? '#4CAF50' : '#F44336'};
`;

const TransactionAmount = styled.span`
  font-weight: bold;
  color: ${props => props.type === 'credit' ? '#4CAF50' : '#F44336'};
`;

const TransactionDetails = styled(motion.div)`
  padding: 0 15px 15px;
`;

const TransactionInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const TransactionInfo = styled.div`
  font-size: 14px;
`;

const TransactionInfoLabel = styled.span`
  color: #666;
`;

const TransactionInfoValue = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #f0f4f8;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  margin: 0 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #F44336;
`;

const mockTransactions = [
  { id: 1, type: 'credit', amount: 50000, date: '2023-05-01', description: 'Loan repayment received', status: 'Completed' },
  { id: 2, type: 'debit', amount: 100000, date: '2023-04-28', description: 'New loan issued', status: 'Completed' },
  { id: 3, type: 'credit', amount: 5000, date: '2023-04-25', description: 'Interest earned', status: 'Completed' },
  // Add more mock transactions as needed
];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Here you would normally fetch data from your API
        // For this example, we'll use the mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setTransactions(mockTransactions);
        setTotalPages(Math.ceil(mockTransactions.length / 5));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, filter]);

  const toggleTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const paginatedTransactions = filteredTransactions.slice((page - 1) * 5, page * 5);

  return (
    <TransactionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <FileText size={24} style={{ marginRight: '10px' }} />
        Transaction History
      </Title>

      <FilterContainer>
        <FilterSelect value={filter} onChange={handleFilterChange}>
          <option value="all">All Transactions</option>
          <option value="credit">Credits Only</option>
          <option value="debit">Debits Only</option>
        </FilterSelect>
      </FilterContainer>

      {loading && <LoadingMessage>Loading transactions...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <TransactionList>
          <AnimatePresence>
            {paginatedTransactions.map((transaction) => (
              <TransactionItem key={transaction.id}>
                <TransactionHeader onClick={() => toggleTransaction(transaction.id)}>
                  <div>
                    {transaction.type === 'credit' ? (
                      <ArrowUpCircle size={18} color="#4CAF50" style={{ marginRight: '10px' }} />
                    ) : (
                      <ArrowDownCircle size={18} color="#F44336" style={{ marginRight: '10px' }} />
                    )}
                    <TransactionType type={transaction.type}>
                      {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                    </TransactionType>
                  </div>
                  <TransactionAmount type={transaction.type}>
                    KES {transaction.amount.toLocaleString()}
                  </TransactionAmount>
                  {expandedTransaction === transaction.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </TransactionHeader>
                <AnimatePresence>
                  {expandedTransaction === transaction.id && (
                    <TransactionDetails
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TransactionInfoGrid>
                        <TransactionInfo>
                          <TransactionInfoLabel>Date:</TransactionInfoLabel>
                          <TransactionInfoValue>{transaction.date}</TransactionInfoValue>
                        </TransactionInfo>
                        <TransactionInfo>
                          <TransactionInfoLabel>Status:</TransactionInfoLabel>
                          <TransactionInfoValue>{transaction.status}</TransactionInfoValue>
                        </TransactionInfo>
                        <TransactionInfo>
                          <TransactionInfoLabel>Description:</TransactionInfoLabel>
                          <TransactionInfoValue>{transaction.description}</TransactionInfoValue>
                        </TransactionInfo>
                      </TransactionInfoGrid>
                    </TransactionDetails>
                  )}
                </AnimatePresence>
              </TransactionItem>
            ))}
          </AnimatePresence>
        </TransactionList>
      )}

      <PaginationContainer>
        <PaginationButton onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft size={20} />
        </PaginationButton>
        <PageInfo>Page {page} of {totalPages}</PageInfo>
        <PaginationButton onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          <ChevronRight size={20} />
        </PaginationButton>
      </PaginationContainer>
    </TransactionContainer>
  );
};

export default TransactionHistory;