import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({
        name: "",
        username: "",
        profilePicture: ""
    });
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken(null);
    }
    const fetchUser = async()=>{
        await axios.get("http://192.168.1.111:3003/api/auth/user",{
            headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
            setUser(res.data.user);
        })
    }

    return <AuthContext.Provider value={{token, setToken, fetchUser, user, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}