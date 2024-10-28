import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Percent } from 'lucide-react';
import './QuickStats.css';

const QuickStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Changed from 'token' to 'accessToken'
        if (!token) {
          throw new Error('No authentication token found');
        }

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/dashboard/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
          }
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        
        setStats([
          { 
            label: 'Total Invested', 
            value: data.total_invested.value, 
            icon: DollarSign, 
            color: '#4CAF50', 
            change: data.total_invested.change 
          },
          { 
            label: 'Total Borrowed', 
            value: data.total_borrowed.value, 
            icon: TrendingUp, 
            color: '#2196F3', 
            change: data.total_borrowed.change 
          },
          { 
            label: 'Active Investments', 
            value: data.active_investments.value, 
            icon: Users, 
            color: '#FFA000', 
            change: data.active_investments.change 
          },
          { 
            label: 'Avg. Return Rate', 
            value: data.avg_return_rate.value, 
            icon: Percent, 
            color: '#9C27B0', 
            change: data.avg_return_rate.change 
          }
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card skeleton">
            <div className="skeleton-circle"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Error loading statistics: {error}
        <p className="error-subtitle">
          {error.includes('authentication') ? 
            'Please log in to view your statistics.' : 
            'Please try refreshing the page.'}
        </p>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div 
            className="stat-icon"
            style={{ backgroundColor: `${stat.color}20` }}
          >
            <stat.icon 
              size={24}
              style={{ color: stat.color }}
            />
          </div>
          
          <div className="stat-content">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change.startsWith('+') ? '↑' : '↓'} {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;