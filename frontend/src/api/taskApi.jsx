import axios from "axios";

const API = axios.create({
    baseURL:'http://127.0.0.1:8000/api/task/',
});

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access_token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

export const fetchTasks = () =>API.get('tasks/tasks/');
export const createTask = (task) => API.post('tasks/tasks/',task);
export const updateTask  = (id,updatedTask) => API.put(`tasks/tasks/${id}/`,updatedTask);
export const deleteTask = (id) => API.delete(`tasks/tasks/${id}/`);