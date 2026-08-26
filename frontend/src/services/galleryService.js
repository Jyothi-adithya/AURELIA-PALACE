import api from '../lib/api';

export const galleryService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.eventTypeId) params.append('eventTypeId', filters.eventTypeId);
    
    const response = await api.get(`/gallery?${params.toString()}`);
    return response.data.data;
  }
};
