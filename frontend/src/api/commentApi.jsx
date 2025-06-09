import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/comment/comments/`;

const getAuthHeaders = ()=>{
    return{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('access_token')}`
        }
    }
};

export const fetchComments = (taskId)=> axios.get(`${API_URL}?task=${taskId}`,getAuthHeaders());
export const createComment = (commentData)=> axios.post(`${API_URL}`,commentData,getAuthHeaders());