import api from './api';

export const userService = {
  async getProfile() {
    const res = await api.get('/user/me');
    return res.data;
  },

  async updateProfile(data) {
    const res = await api.put('/user/update', data);
    return res.data;
  },
};
