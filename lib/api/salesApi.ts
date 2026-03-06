import api from './client';

export const salesApi = {
  // Create a new sale
  createSale: (data: any) => api.post('/api/pharmacy/sales', data),

  // Get paginated list of sales
getSales: (params?: { page?: number; limit?: number; delivered?: boolean }) =>
    api.get('/api/pharmacy/sales', { params }),

  // Get a single sale by ID
  getSale: (id: number) => api.get(`/api/pharmacy/sales/${id}`),

  


};