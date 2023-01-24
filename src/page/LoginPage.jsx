import {  useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {

    const [submit, setSubmit] = useState(false)
  
    const navigate = useNavigate()
  
    
    const [formData, setformData] = useState({
      email: "",
      password: ""
    })
  
    const { email, password } = formData
    const onChange = (e) => {
      setformData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }
  
    const auth = getAuth();
    const onSubmit = async (e) => {
      setSubmit(!submit)
      e.preventDefault()
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
        setSubmit(false)
        if (userCredential.user) {
            navigate("/home")
        }
      } catch (error) {
        setSubmit(false)
        console.log(error)
      }
  
    }
    useEffect(() => {

      if(auth ) {
       navigate("/home")  
      }
    }, [])


    return (
           <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                                <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" />
                                <h1 className=" text-3xl mt-10">Login</h1>
                                <p className=" text-xs">Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

                                <form onSubmit={onSubmit} className=" my-5">
                                    <div className="  my-5 items-start justify-start flex flex-col">
                                        <label className=" mb-2" >Your Email</label>
                                        <input 
                                            className=" p-3 focus:outline-none w-full bg-transparent border-b "
                                            type="text"
                                            value={email}
                                            id="email"
                                            onChange={onChange}
                                            placeholder="Enter Your Username"
                                        />
                                    </div>

                                    <div className="  my-5 items-start justify-start flex flex-col">
                                        <label >Password</label>
                                        <input 
                                            className=" p-3 w-full bg-transparent border-b "
                                            type="text"
                                            onChange={onChange}
                                            id="password"
                                            value={password}
                                            placeholder="Enter Your PassWord"
                                        />
                                    </div>
                                </form>
                                <div className=" flex flex-col items-center py-4">
                                            <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Login</button>
                                            <Link className=" text-[#ef95f1] my-3" to=""> Forgot Password</Link>
                                            <Link to="/signup">Don't Have an Account? Register</Link>
                                    </div>

                </div>

           </section>
     );
}
 
export default LoginPage;