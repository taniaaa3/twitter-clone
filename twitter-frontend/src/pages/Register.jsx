import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../context/useAuth"

const Register = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const registerUser = async(e)=>{
        e.preventDefault();
        const {name, username, email, password} = data;
        try {
            if(name && username && email && password){
                await axios.post("https://twitter-clone-llkn.onrender.com/api/auth/register",data).then((res)=>{
                    console.log(res);
                    setToken(res.data.token);
                    localStorage.setItem('token',res.data.token);
                    navigate('/');
                    toast(res.data.msg);
                }).catch((err)=>{
                    console.log(err);
                    toast.error(err.response.data.msg);
                })
            }
            else{
                toast.error("One or more field empty");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="w-screen h-screen m-0 bg-gray-200 flex justify-center items-center">
            <div className="flex flex-col rounded-xl sm:flex-row text-white h-auto w-4/5 md:w-1/2">
                <div className="bg-blue-500 sm:rounded-none sm:rounded-tl-lg sm:rounded-bl-lg flex w-full sm:px-5 px-2 py-5 sm:py-0 flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Join Us</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="108" height="108" className="bi bi-chat-quote" viewBox="0 0 16 16"> <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" fill="white"></path> <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" fill="white"></path> </svg>
                </div>
                <div className="flex flex-col h-full w-full sm:rounded-tr-lg sm:rounded-br-lg px-5 bg-white text-black justify-center w-3/4">
                    <form className="flex flex-col m-0 sm:m-5" onSubmit={registerUser}>
                        <h1 className="my-2 font-bold text-3xl">Register</h1>
                        <input type="text" id="fullName" className="mx-3 my-2 border p-2 rounded-md" placeholder="Full Name" onChange={e => setData({...data, ["name"]:e.target.value})}/>
                            <input type="text" id="username" className="mx-3 my-2 border p-2 rounded-md" placeholder="Username" onChange={e => setData({...data, ["username"]:e.target.value})}/>
                        <input type="email" id="Email" className="mx-3 my-2 border p-2 rounded-md" placeholder="Email" onChange={e => setData({...data, ["email"]:e.target.value})}/>
                            <input type="password" className="mx-3 my-2 border p-2 rounded-md" id="password" placeholder="Password"  onChange={e => setData({...data, ["password"]:e.target.value})}/>
                        <button type="submit" className="w-max m-3 rounded-lg bg-black px-4 py-2 text-white">Register</button>
                    </form>
                    <p className="my-2">Already have an account? <span className="text-blue-700 underline"><Link to='/login'>Login Now</Link></span></p>
                </div>
            </div>
        </div>
  )
}

export default Register