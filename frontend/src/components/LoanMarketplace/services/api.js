import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ENDPOINTS = {
    LOANS: '/loans/',
    INVESTMENTS: (id) => `/loans/${id}/invest/`,
    DOCUMENTS: (id) => `/loans/${id}/documents/`
};

export const fetchLoansAPI = async (params) => {
    const response = await api.get(ENDPOINTS.LOANS, { params });
    return response.data.results || response.data;
};

export const submitLoanApplication = async (formData) => {
    const response = await api.post(ENDPOINTS.LOANS, formData);
    return response.data;
};

export const submitInvestment = async (loanId, investmentData) => {
    const response = await api.post(ENDPOINTS.INVESTMENTS(loanId), investmentData);
    return response.data;
};

export const downloadDocument = async (loanId, documentId) => {
    const response = await api.get(
        `${ENDPOINTS.DOCUMENTS(loanId)}/${documentId}`,
        { responseType: 'blob' }
    );
    return response.data;
};

export default api;