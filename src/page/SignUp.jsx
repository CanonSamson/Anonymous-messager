import { useState } from "react";
import { Helmet } from 'react-helmet';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase-config"
import { setDoc, doc, serverTimestamp, collection, getDocs } from "firebase/firestore"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Auth";
import InputField from "../components/InputField";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { SignupSchema } from "../validation/formValidation";


const SignUp = ({ onClick, onClickL }) => {
    const [submit, setSubmit] = useState(false)
    const [errorM, setErrorM] = useState('')

    const navigate = useNavigate()


    const { auth } = useUserAuth();


    const onSubmit = async (values) => {
        setSubmit(!submit)
        const { email, password, name } = values;


        try {
            const data = await getDocs(collection(db, "users"))
            const users = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = users.find(user => user.name === name)

            if (userCurrentData) {
                setErrorM("Username is already in use ")
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                // Signed in 
                const user = userCredential.user;
                // ...
                updateProfile(auth.currentUser, {
                    displayName: name
                })

                const formDataCopy = values
                delete formDataCopy.password
                await setDoc(doc(db, "users", user.uid), formDataCopy);


                navigate("/home")
            }
            setSubmit(submit)
        } catch (error) {
            console.log(error.message)

            if (error.message === `Firebase: Error (auth/email-already-in-use).`) {
                setErrorM("Email address already in use")

            }

            if (error.message === `Firebase: Error (auth/invalid-email).`) {
                setErrorM("Enter a valid Email address")

            }
            if (error.message === `Firebase: Password should be at least 6 characters (auth/weak-password).`) {
                setErrorM("Password should be at least 6 characters ")

            }
            setSubmit(submit)
        }

    }


    const { errors, touched, handleChange, handleBlur, values, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",

        },
        validationSchema: SignupSchema,
        onSubmit

    })


    return !auth.currentUser ?


        <div className=" relative text-[11px] shadow-gray-500/50 text-black  shadow-xl  items-center  px-5 rounded-lg  bg-white max-w-[400px]">
            <MdClose onClick={onClick} className=" absolute top-[-10px] p-2 right-[-10px] rounded-full text-white bg-red-500 font-semibold" size={30} />

            <h1 className=" text-3xl mt-10">Register</h1>
            <p >Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

            <form onSubmit={handleSubmit} className=" my-5">
                <div className="  my-2 items-start justify-start flex flex-col">
                    <InputField
                        id="name"
                        label="Your User Name"
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && errors.name && errors.name}
                        type="text"
                        placeholder="Enter Your Username"
                    />
                </div>


                <div className="  my-2 items-start justify-start flex flex-col">
                    <InputField
                        label=" Email"
                        id="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email && errors.email}
                        placeholder="Enter Your Email"
                    />
                </div>

                <div className="  my-2 items-start justify-start flex flex-col">
                    <InputField
                        label="Password"
                        id="password"
                        required={true}
                        type="password"
                        error={touched.password && errors.password && errors.password}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                    />

                </div>
                <p className=" text-[10px] text-red-600">{errorM && errorM}</p>

                <div className="flex flex-col mt-3">
                    <button type="submit"
                        className=" bg-blue-600 text-white text-[14px] w-full  p-2 rounded 
                     shadow-lg active:scale-105"> {submit ?
                            <p className="w-5 h-5 border-[4px] border-dotted m-auto flex justify-center 
                            items-center border-white  animate-spin duration-150 transition-all  relative  rounded-full"></p>
                            : `Register`} </button>
                    <div className=" mt-2 pb-5">
                        <p className=" hover:cursor-pointer"> Already Have an Account?<small onClick={onClickL} className=" text-blue-600" > Login</small></p>
                    </div>
                </div>
            </form>
        </div>
        :
        <Navigate to="/home" />

}

export default SignUp;