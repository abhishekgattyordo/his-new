import api from './client';

export const purchasesApi = {
  createPurchase: (data: any) => api.post('/api/pharmacy/purchases', data),
  getPurchases: (params?: any) => api.get('/api/pharmacy/purchases', { params }),
  getPurchase: (id: number) => api.get(`/api/pharmacy/purchases/${id}`),
  updatePurchase: (id: number, data: any) => api.put(`/api/pharmacy/purchases/${id}`, data),
  deletePurchase: (id: number) => api.delete(`/api/pharmacy/purchases/${id}`),

  updatePurchaseDelivery: (id: number, isDelivered: boolean) =>
  api.patch(`/api/pharmacy/purchases/${id}`, { isDelivered }),

    // Stock endpoints
  getStock: (params?: { search?: string; lowStock?: boolean }) =>
    api.get('/api/pharmacy/stock', { params }),
   getPurchaseItems: (medicineId: number, batchNo: string) =>
    api.get('/api/pharmacy/purchase-items', { params: { medicineId, batchNo } }),

};