import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { loginUser } from '../api/loginApi'

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        
            const { access, refresh } = await loginUser(username,password);
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            window.location.href = "/dashboard";
        }
        catch (error) {
            alert("Login failed");
            console.error(error);
        }
    }

    return (
        <div class="tank1" >
            <h2>Login</h2>
            <form class="f1" onSubmit={handleLogin}>
                <input
                    class="in1" 
                    type='text'
                    placeholder='Username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
                <input
                    class="in2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
                <button class="bt" type='submit' >
                    Login
                    </button>
                    

            </form>
        </div>
    )
}

export default Login