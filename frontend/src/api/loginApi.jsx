import axios from 'axios'

export const loginUser= async(username,password)=>{
    
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login/`,{
            username,
            password,
        });
        return res.data;
    
}