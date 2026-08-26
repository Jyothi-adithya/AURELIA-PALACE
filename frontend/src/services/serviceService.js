import api from '../lib/api';

export const serviceService = {
  getAll: async () => {
    const response = await api.get('/services');
    return response.data.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/services/${slug}`);
    return response.data.data;
  }
};
