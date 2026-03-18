import api from './client';


interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const appointmentsApi = {
  // Get all appointments (with optional filters)
  getAppointments: (params?: any) => api.get('/api/appointments', { params }),

  // Get a single appointment by ID
  getAppointment: (id: string) => api.get(`/api/appointments/${id}`),

  // Get appointments for a specific patient
  getPatientAppointments: (patientId: string) =>
    api.get(`/api/appointments/patient/${patientId}`),

  // Get appointments for a specific doctor
  getDoctorAppointments: (doctorId: number) =>
    api.get(`/api/appointments/doctor/${doctorId}`),

   getDoctorAppointmentsByDate: (doctorId: number, date: string) =>
    api.get(`/api/appointments/doctor/${doctorId}?date=${date}`),

  // Create a new appointment
    createAppointment: (data: any): Promise<ApiResponse> =>
    api.post('/api/appointments/patient', data),

  // Update an existing appointment
  updateAppointment: (id: string, data: any) =>
    api.put(`/api/appointments/${id}`, data),

  // Delete an appointment
  deleteAppointment: (id: string): Promise<ApiResponse> =>
    api.delete(`/api/appointments/${id}`),
};