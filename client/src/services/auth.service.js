import api from './api';

export const authService = {
  async signup(data) {
    const res = await api.post('/auth/signup', data);
    return res.data;
  },

  async verifyOtp(data) {
    const res = await api.post('/auth/verify-otp', data);
    return res.data;
  },

  async resendOtp(data) {
    const res = await api.post('/auth/resend-otp', data);
    return res.data;
  },

  async login(data) {
    const res = await api.post('/auth/login', data);
    if (res.data?.data?.token) {
      localStorage.setItem('can_auth_token', res.data.data.token);
    }
    return res.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('can_auth_token');
    }
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res.data;
  },
};
