import api from '../lib/api';

export const enquiryService = {
  submit: async (data) => {
    const response = await api.post('/enquiries', data);
    return response.data.data;
  }
};
