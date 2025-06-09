import axios from 'axios';

export const fetchNotifications = async()=>{

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/notification/my/`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return response.data;
}