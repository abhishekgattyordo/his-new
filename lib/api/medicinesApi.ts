import api from './client';

export const medicinesApi = {
  // Get all medicines with optional filters (search, category, page, limit)
  getMedicines: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => api.get('/api/pharmacy/medicines', { params }),

  // Get single medicine by ID
getMedicine: (id: number) => {
  const url = `/api/pharmacy/medicines/${id}`;
  console.log('🔗 Actual URL:', url);
  return api.get(url);
},

  // Create new medicine (sends JSON)
  createMedicine: (data: any) => api.post('/api/pharmacy/medicines', data),

  // Update medicine (sends JSON)
  updateMedicine: (id: number, data: any) => api.put(`/api/pharmacy/medicines/${id}`, data),

  // Delete medicine (soft delete)
  deleteMedicine: (id: number) => api.delete(`/api/pharmacy/medicines/${id}`),
};