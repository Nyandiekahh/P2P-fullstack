import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/transactions?page=${page}`, {
          headers: { 'x-auth-token': token }
        });
        setTransactions(prevTransactions => [...prevTransactions, ...response.data]);
        setHasMore(response.data.length > 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="card transaction-history">
      <h2>Transaction History</h2>
      {transactions.length === 0 && !loading ? (
        <p>No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td>{transaction.type}</td>
                <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                  KES {Math.abs(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {loading && <div className="loading-message">Loading transactions...</div>}
      {hasMore && !loading && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default TransactionHistory;