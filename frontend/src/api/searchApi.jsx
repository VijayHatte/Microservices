import axios from 'axios';

export const searchTask = async (query) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/task/search/?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );
  return res.data;
};
