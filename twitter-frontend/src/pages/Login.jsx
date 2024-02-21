import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from 'axios';
import { useAuth } from "../context/useAuth";

const Login = () => {
    const {token, setToken} = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email : "",
        password: ""
    });
    const loginUser = async(e)=>{
        e.preventDefault();
        const {email, password} = data;
        console.log(data);
        try {
            if(email && password){
                await axios.post('http://localhost:3003/api/auth/login',data).then((res)=>{
                    toast(res.data.msg);
                    setToken(res.data.token);
                    localStorage.setItem('token',res.data.token);
                    navigate('/');
                    console.log(res);
                }).catch((err)=>{
                    toast.error(err.response.data.msg)
                    console.log(err);
                })
            }
            else{
                toast.error('One or more fields empty');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-screen h-screen m-0 bg-gray-200 flex justify-center items-center">
            {token ? <h1>User is already logged in</h1> : 
            <div className="flex flex-col rounded-xl sm:flex-row text-white h-96">
                <div className="bg-blue-500 rounded-tl-lg rounded-bl-lg flex w-80 px-5 flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="108" height="108" className="bi bi-chat-quote" viewBox="0 0 16 16"> <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" fill="white"></path> <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" fill="white"></path> </svg>
                </div>
                <div className="flex flex-col h-full rounded-tr-lg rounded-br-lg px-5 bg-white text-black justify-center w-3/4">
                    <form className="flex flex-col" onSubmit={loginUser}>
                        <h1 className="my-2 font-bold text-3xl">Log in</h1>
                            <input type="text" id="email" className="mx-3 my-2 border p-2 rounded-md" onChange={e => setData({...data, ["email"]:e.target.value})} placeholder="Email"/>
                            <input type="password" className="mx-3 my-2 border p-2 rounded-md" id="password" onChange={e => setData({...data, ["password"]:e.target.value})} placeholder="Password" />
                        <button type="submit" className="w-max m-3 rounded-lg bg-black px-4 py-2 text-white">Login</button>
                    </form>
                    <p className="my-2">Don't have an account? <span className="text-blue-700 underline"><Link to='/register'>Register here</Link></span></p>
                </div>
            </div>}
        </div>
    )
}

export default Login