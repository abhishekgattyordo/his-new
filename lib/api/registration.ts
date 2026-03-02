import api from './client';

export const patientsApi = {
  // ========== Registration API ==========
  // Submit step 1 (personal details)
  registerStep1: (data: any) => api.post('/api/registration', data),

  // Submit step 2 (medical history)
  registerStep2: (data: any) => api.post('/api/registration', data),

  // Submit step 3 (insurance & complete)
  registerStep3: (data: any) => api.post('/api/registration', data),

  // Get a single registration by patientId (includes medical history)
  getRegistration: (patientId: string) => api.get(`/api/registration?patientId=${patientId}`),

  // List all registrations (from registration_details view)
  getAllRegistrations: () => api.get('/api/registration?list=true'),

 

    adminGetPatient: (patientId: string) => api.get(`/api/admin/patients?patientId=${patientId}`),

  // List all patients (optionally with full details)
  adminGetAllPatients: (listAll = false) => 
    api.get(listAll ? '/api/admin/patients?list=true' : '/api/admin/patients'),

  // Create a new patient – expects JSON object
  adminCreatePatient: (data: object) => api.post('/api/admin/patients', data),

  // Update an existing patient – expects JSON object (must include patientId)
  adminUpdatePatient: (data: object) => api.put('/api/admin/patients', data),

  // Delete a patient
  adminDeletePatient: (patientId: string) => api.delete(`/api/admin/patients?patientId=${patientId}`),
};