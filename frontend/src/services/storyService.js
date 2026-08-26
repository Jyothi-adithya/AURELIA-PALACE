import api from '../lib/api';

export const storyService = {
  getAll: async () => {
    const response = await api.get('/stories');
    return response.data.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/stories/${slug}`);
    return response.data.data;
  }
};
