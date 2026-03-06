import api from './client';

export const deliveryApi = {
  deliverMedicines: (data: {
    saleId: number;
    items: {
      saleItemId: number;
      medicineId: number;
      quantity: number;
    }[];
  }) =>
    api.post('/api/pharmacy/deliver', data),
};