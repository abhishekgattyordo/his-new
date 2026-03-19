import api from './client';

export const helpdeskApi = {
  createAppointment: async (data: any) => {
    const response = await api.post('/api/helpdesk/appointments', data);
    return response.data;
  },
};