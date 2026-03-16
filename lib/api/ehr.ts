import api from './client';

export const currentVisitApi = {
 
  getCurrentVisit: (patientId: string, appointmentId?: string) => {
    const url = appointmentId
      ? `/api/ehr/${patientId}/current-visit?appointmentId=${appointmentId}`
      : `/api/ehr/${patientId}/current-visit`;
    return api.get(url);
  },


  saveCurrentVisit: (patientId: string, data: any) => 
    api.post(`/api/ehr/${patientId}/current-visit`, data),

  getCurrentVisitByDate: (patientId: string, date: string) => 
  api.get(`/api/ehr/${patientId}/current-visit?date=${date}`),

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
};

