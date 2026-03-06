import api from './client';

export const prescriptionsApi = {
  getPrescriptions: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/api/pharmacy/prescriptions', { params }),
  dispense: (data: { prescriptionId: number; items: { medicineId: number; dispensedQty: number }[] }) =>
    api.post('/api/pharmacy/dispense', data),
};