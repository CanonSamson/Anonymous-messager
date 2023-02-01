import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserAuth } from "../Auth";

const LoginPage = () => {

  const [submit, setSubmit] = useState(false)
  const [errorM, setErrorM] = useState('')

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

  const { auth } = useUserAuth();

  const onSubmit = async (e) => {
    setSubmit(!submit)
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate("/home")
      }
    } catch (error) {
      setSubmit(false)
      console.log(error.message)

      if (error.message === `Firebase: Error (auth/user-not-found).`) {
        setErrorM("Sorry this user is not register")

      } 

      if (error.message === `Firebase: Error (auth/wrong-password).`) {
        setErrorM('Your Password is ')
      }

      if (error.message === `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
        setErrorM('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
      }
    }

  }
  console.log(errorM)


  return (
    <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#DDC7F3]">

      <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7821CE]">
        {/* <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" /> */}
        <h1 className=" text-3xl mt-10">Login</h1>
        <p className=" text-xs">Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

        <form onSubmit={onSubmit} className=" my-5">
          <div className="  my-5 items-start justify-start flex flex-col">
            <label className=" mb-2" >Your Email</label>
            <input
              required={true}
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
              required={true}
              className=" p-3 w-full focus:outline-none bg-transparent border-b "
              type="password"
              onChange={onChange}
              id="password"
              value={password}
              placeholder="Enter Your PassWord"
            />
          </div>
          <div className=" border-b-red-400 border-b pb-2">
          <p className=" ">{errorM}</p>
          </div>
          <div className=" flex flex-col items-center py-4">
            <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105"> {submit ? <p className="w-5 m flex justify-center items-center m-auto border-4 border-dotted border-white border-r-0 animate-spin duration-150 transition-all  relative h-5 rounded-full"></p> : `Login`} </button>
            <Link className=" text-[#ef95f1] my-3" to=""> Forgot Password</Link>
            <Link to="/signup">Don't Have an Account? Register</Link>
          </div>
        </form>

      </div>

    </section>
  );
}

export default LoginPage;