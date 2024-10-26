import { useState } from 'react';
import { toast } from 'react-toastify';
import { submitInvestment } from '../services/api';

export const useInvestment = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const invest = async (loanId, investmentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submitInvestment(loanId, investmentData);
      
      if (response.payment_method === 'mpesa') {
        toast.info('Please check your phone for M-Pesa prompt');
      } else if (response.payment_method === 'bank') {
        toast.info('Bank transfer details have been sent to your email');
      } else if (response.payment_url) {
        window.location.href = response.payment_url;
      }

      if (onSuccess) onSuccess();
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to process investment';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { invest, loading, error };
};