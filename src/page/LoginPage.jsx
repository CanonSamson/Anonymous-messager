import { useState } from "react";


import { Link, Navigate, useNavigate } from "react-router-dom";


import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserAuth } from "../Auth";
import InputField from "../components/InputField";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { LoginSchema } from "../validation/login";

const LoginPage = ({ onClick, onClickR }) => {

  const [submit, setSubmit] = useState(false)
  const [errorM, setErrorM] = useState('')

  const navigate = useNavigate()

  const { auth } = useUserAuth();

  const onSubmit = async () => {
    setSubmit(!submit)

    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate("/home")
      }
    } catch (error) {
      setSubmit(false)
      console.log(error.message)

      if (error.message === `Firebase: Error (auth/user-not-found).`) {
        setErrorM("Sorry This User Is Not Register")

      }

      if (error.message === `Firebase: Error (auth/wrong-password).`) {
        setErrorM('Your Password Is Wrong')
      }

      if (error.message === `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
        setErrorM('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
      }
    }

  }
  console.log(errorM)

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: LoginSchema,
    onSubmit

  })



  return !auth.currentUser ?

    <div className=" relative  text-black text-[11px] shadow-xl  items-center  px-5 rounded-lg  bg-white max-w-[400px]">
      < MdClose onClick={onClick} className=" absolute top-[-10px] p-2 right-[-10px] rounded-full text-white bg-red-500 font-semibold" size={30} />

      <h1 className=" text-3xl mt-8">LOG IN</h1>
      <p >Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

      <form onSubmit={handleSubmit} className=" my-5">
        <div className="  my-2 items-start justify-start flex flex-col">
          <InputField
            label="Email"
            id="email"
            required={true}
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
          />
        </div>

        <div className="  my-2 items-start justify-start flex flex-col">
          <InputField
            label="Password"
            id="password"
            required={true}
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
        </div>
        <div>
          <small className="  text-[10px] text-red-600">{errorM && errorM}</small>
        </div>

        <div className=" flex flex-col  py-2">
          <button className=" bg-blue-600 text-[14px] text-white w-full  p-3 rounded shadow-lg active:scale-105"> {submit ? <p className="w-5 m flex justify-center items-center m-auto border-4 border-dotted border-white border-r-0 animate-spin duration-150 transition-all  relative h-5 rounded-full"></p> : `Login`} </button>
          <Link className=" text-end my-3" to=""> Forgot Password</Link>
          <p className=" hover:cursor-pointer">   Don't Have an Account? <small onClick={onClickR} className=" text-blue-600" to="/signup"> Register</small></p>
        </div>
      </form>

    </div>
    :
    <Navigate to="/home" />

}

export default LoginPage;