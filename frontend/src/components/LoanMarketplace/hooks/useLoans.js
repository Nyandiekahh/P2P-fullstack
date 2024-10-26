import { useState, useEffect, useMemo } from 'react';
import { fetchLoansAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useLoans = (searchTerm, activeFilter, sortOption, sortDirection) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const data = await fetchLoansAPI({
                search: searchTerm,
                status: activeFilter !== 'all' ? activeFilter : undefined,
                sort: sortOption,
                direction: sortDirection
            });
            setLoans(data);
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

    return {
        loans: filteredAndSortedLoans,
        loading,
        error,
        refetchLoans: fetchLoans
    };
};