import api from './api';

export const registrationService = {
  async register(data) {
    const res = await api.post('/hackathon/register', data);
    return res.data;
  },

  async getMyEntry() {
    const res = await api.get('/hackathon/my-entry');
    return res.data;
  },

  async updateMyEntry(data) {
    const res = await api.put('/hackathon/my-entry', data);
    return res.data;
  },

  async deleteEntry(registrationId) {
    const res = await api.delete(`/hackathon/${registrationId}`);
    return res.data;
  },

  async getEventConfig() {
    const res = await api.get('/hackathon/config');
    return res.data;
  },

  // Admin extensions
  async getAdminStats() {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  async getAdminRegistrations(params) {
    const res = await api.get('/admin/registrations', { params });
    return res.data;
  },

  getExportCsvUrl() {
    const baseURL = import.meta.env.VITE_API_URL || '/api';
    return `${baseURL}/admin/export-csv`;
  },
};
