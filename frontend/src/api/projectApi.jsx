import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/project/projects/`;

const getAuthHeaders = ()=>{
    const token = localStorage.getItem('access_token');
    return{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchProjects =()=> axios.get(API_URL,getAuthHeaders());
export const fetchProjectsById=(id)=> axios.get(`${API_URL}${id}/`,getAuthHeaders());
export const createProject = (data) => axios.post(API_URL,data,getAuthHeaders());
export const updateProject = (id,data) => axios.put(`${API_URL}${id}/`,data,getAuthHeaders());
export const deleteProject = (id) => axios.delete(`${API_URL}${id}/`,getAuthHeaders());