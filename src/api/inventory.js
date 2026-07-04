import apiClient from './apiClient';

export const getTransactions = async (type) => {
  const response = await apiClient.get(`/inventory/${type}`);
  return response.data;
};

export const createTransaction = async (type, data) => {
  const response = await apiClient.post(`/inventory/${type}`, data);
  return response.data;
};

export const getExpiryReport = async (filter, startDate, endDate) => {
  let url = '/products/expiry-report';
  const params = new URLSearchParams();
  if (filter) params.append('filter', filter);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const response = await apiClient.get(url);
  return response.data;
};
