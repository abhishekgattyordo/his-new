import api from './client';

export const quickAddApi = {
  createPatientAndAppointment: async (data: any) => {
    const res = await api.post('/api/quick-add', data);
    return res.data; // ✅ return only API data
  },
};