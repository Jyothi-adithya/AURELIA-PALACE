import api from '../lib/api';

export const eventService = {
  getAll: async () => {
    const response = await api.get('/event-types');
    return response.data.data;
  },
  getBySlug: async (slug) => {
    const response = await api.get(`/event-types/${slug}`);
    return response.data.data;
  }
};
