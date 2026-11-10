import api from './api';

export const contactService = {
  async submitContact(data) {
    const res = await api.post('/contact', data);
    return res.data;
  },

  async getContactInfo() {
    const res = await api.get('/contact/info');
    return res.data;
  },
};
