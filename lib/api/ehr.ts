import api from './client';

// Visit type (adjust fields if needed)
export interface Visit {
  id: string;
  diagnosis: string;
  notes: string;
  doctor_name: string;
  doctor_specialty?: string;
  follow_up_date?: string;
   created_at?: string;
  updated_at?: string;
  icd10_code?: string;            // ✅ add this
  clinical_notes?: string;        // ✅ add this
  patient_instructions?: string; 
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const currentVisitApi = {
 
getCurrentVisit: async (
  patientId: string,
  appointmentId?: string
): Promise<ApiResponse<Visit>> => {
  const url = appointmentId
    ? `/api/ehr/${patientId}/current-visit?appointmentId=${appointmentId}`
    : `/api/ehr/${patientId}/current-visit`;

  const response = await api.get(url);
  return response.data; // ✅ only return actual data
},


  saveCurrentVisit: (patientId: string, data: any) => 
    api.post(`/api/ehr/${patientId}/current-visit`, data),

getCurrentVisitByDate: async (
  patientId: string,
  date: string
): Promise<ApiResponse<Visit>> => {
  const res = await api.get(
    `/api/ehr/${patientId}/current-visit?date=${date}`
  );
  return res.data; // ✅ only API response
},

    getCompletedVisits: (patientId: string) => 
    api.get(`/api/ehr/${patientId}/visits`),

// ------------------vitals-----------------
       getVitalsByDate: async (patientId: string, date: string) => {
    const response = await api.get(`/api/ehr/${patientId}/vitals?date=${date}`);
    return response.data;
  },
  
  saveVitals: (patientId: string, data: any) =>
    api.post(`/api/ehr/${patientId}/vitals`, data),

   updateVital: (patientId: string, vitalId: string, data: any) =>
    api.put(`/api/ehr/${patientId}/vitals?vitalId=${vitalId}`, data),


  //  -----------------prescription------------------------

  // Inside currentVisitApi object

getPrescriptionsByDate: async (patientId: string, date: string) => {
  const response = await api.get(`/api/ehr/${patientId}/prescriptions?date=${date}`);
  return response.data; // returns { success, data }
},

savePrescriptions: (patientId: string, data: any) =>
  api.post(`/api/ehr/${patientId}/prescriptions`, data),

updatePrescription: (patientId: string, prescriptionId: string, data: any) =>
  api.put(`/api/ehr/${patientId}/prescriptions?prescriptionId=${prescriptionId}`, data),

deletePrescription: (patientId: string, prescriptionId: string) =>
  api.delete(`/api/ehr/${patientId}/prescriptions?prescriptionId=${prescriptionId}`),
};



