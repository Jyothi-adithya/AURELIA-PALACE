import api from '../lib/api';

export const spaceService = {
  getAll: async () => {
    const response = await api.get('/spaces');
    return response.data.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/spaces/${slug}`);
    return response.data.data;
  }
};
