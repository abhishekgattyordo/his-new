import api from './client';


interface SlotsResponse {
  success: boolean;
  date: string;
  doctor_id: string;
  slots: string[];
}

export const doctorsApi = {
  getDoctors: (params?: any) => api.get('/api/doctors', { params }),
  getDoctor: (id: number) => api.get(`/api/doctors/${id}`),
  createDoctor: (data: FormData) => api.post('/api/doctors', data),
  updateDoctor: (id: number, data: any) => api.put(`/api/doctors/${id}`, data),
  deleteDoctor: (id: number) => api.delete(`/api/doctors/${id}`),
    getSpecialties: () => api.get('/api/doctors/specialties'),
  getSlots: (doctorId: number, date: string): Promise<SlotsResponse> =>
    api.get(`/api/doctors-appoitment/${doctorId}/slots?date=${date}`),

    
};