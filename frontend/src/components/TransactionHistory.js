import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle
} from 'lucide-react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [filter, setFilter] = useState('all');
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isAuthenticated) {
        setError('Please login to view transactions');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams({
          page,
          page_size: pageSize,
          ...(filter !== 'all' && { type: filter }),
        }).toString();

        const response = await fetch(`http://localhost:8000/api/transactions/?${params}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setTransactions(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / pageSize));
        setError(null);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, filter, pageSize, isAuthenticated]);

  const toggleTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount) => {
    return parseFloat(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace('KES', 'KES ');
  };

  return (
    <div className="transaction-container">
      {/* Header */}
      <div className="transaction-header">
        <FileText className="header-icon" />
        <h2>Transaction History</h2>
      </div>

      {/* Filter */}
      <div className="filter-container">
        <select 
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">All Transactions</option>
          <option value="credit">Credits Only</option>
          <option value="debit">Debits Only</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <span>Loading transactions...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <AlertTriangle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Transactions List */}
      {!loading && !error && transactions.length > 0 && (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="transaction-item"
            >
              <div
                onClick={() => toggleTransaction(transaction.id)}
                className={`transaction-header-content ${expandedTransaction === transaction.id ? 'expanded' : ''}`}
              >
                <div className="transaction-type">
                  {transaction.type === 'credit' ? (
                    <ArrowUpCircle className="type-icon credit" />
                  ) : (
                    <ArrowDownCircle className="type-icon debit" />
                  )}
                  <span className={`type-label ${transaction.type}`}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </div>

                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {formatAmount(transaction.amount)}
                  </span>
                  {expandedTransaction === transaction.id ? (
                    <ChevronUp className="expand-icon" />
                  ) : (
                    <ChevronDown className="expand-icon" />
                  )}
                </div>
              </div>

              {/* Transaction Details */}
              {expandedTransaction === transaction.id && (
                <div className="transaction-details">
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{formatDate(transaction.timestamp)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">User:</span>
                      <span className="detail-value">{transaction.username}</span>
                    </div>
                    <div className="detail-item full-width">
                      <span className="detail-label">Description:</span>
                      <span className="detail-value">{transaction.description}</span>
                    </div>
                    {transaction.loan && (
                      <div className="detail-item full-width">
                        <span className="detail-label">Related Loan ID:</span>
                        <span className="detail-value">{transaction.loan}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && transactions.length === 0 && (
        <div className="empty-state">
          No transactions found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="pagination-button"
          >
            <ChevronLeft className="pagination-icon" />
          </button>
          
          <span className="pagination-text">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="pagination-button"
          >
            <ChevronRight className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
