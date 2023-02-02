import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase-config"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Auth";


const SignUp = () => {
    const [submit, setSubmit] = useState(false)
    const [errorM, setErrorM] = useState('')
    const [focused, setFocused] = useState(false)



    const navigate = useNavigate()

    const [formData, setformData] = useState({
        name: "",
        email: "",
        timestamp: serverTimestamp()
    })

    const { name, email, password, timestamp } = formData


    const { auth } = useUserAuth();

    const onChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
        console.log(formData)
    }

    const onSubmit = async (e) => {
        setSubmit(!submit)
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // Signed in 
            const user = userCredential.user;
            // ...
            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = { ...formData }
            // delete formDataCopy.password
            await setDoc(doc(db, "users", user.uid), formDataCopy);

            setSubmit(submit)
            navigate("/home")
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



    console.log(formData);
    return !auth.currentUser ?
        <>
            <Helmet>
                <meta property="og:image:type" content="image/svg" />
                <link rel="apple-touch-icon" href="/logo.svg" />
                <meta name="description" content="Experience the thrill of anonymous communication with friends. Send and receive compliments without revealing your identity. Sign up now for a free and fun way to connect with your friends anonymously." />
            </Helmet>
            <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#DDC7F3]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg    bg-[#7821CE]">
                    {/* <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" /> */}
                    <h1 className=" text-3xl mt-10">Register</h1>
                    <p className=" text-xs">Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

                    <div className="text-[#fb01ff] font-medium text-center my-2 ">
                        <p>Now it's your turn to create an account and dare your friends to tell you what they think about you</p>
                    </div>
                    <form onSubmit={onSubmit} className=" my-5">
                        <div className="  my-5 items-start justify-start flex flex-col">
                            <label className=" mb-2" >Your UserName</label>
                            <input
                                autoCapitalize="off"
                                autoCorrect="off"
                                maxLength="30"
                                required={true}
                                onChange={onChange}
                                pattern="^\S{3,}$"
                                id="name"
                                value={name}
                                className=" p-3 input focus:outline-none w-full bg-transparent border-b "
                                type="text"
                                onBlur={() => { setFocused(true) }}
                                focused={focused.toString()}
                                placeholder="Enter Your Username"
                            />
                            <p className=" text-xs mt-2 pre"> Ensure UserName does not contain spaces and has a minimum length of 3 characters</p>
                        </div>


                        <div className="  my-5 items-start justify-start flex flex-col">
                            <label className=" mb-2" >Your E-Mail</label>
                            <input
                                autoCapitalize="off"
                                autoCorrect="off"
                                required={true}
                                onChange={onChange}
                                value={email}
                                id="email"
                                className=" p-3 focus:outline-none w-full bg-transparent border-b "
                                type="text"
                                placeholder="Enter Your Email here"
                            />
                        </div>

                        <div className="  my-5 items-start justify-start flex flex-col">
                            <label >Password</label>
                            <input
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="new-password"
                                required={true}
                                onChange={onChange}
                                value={password}
                                id="password"
                                className=" p-3 w-full bg-transparent focus:outline-none border-b "
                                type="password"
                                placeholder="Enter Your Password"
                            />
                        </div>
                        <p className=" ">{errorM}</p>

                        <div className=" flex flex-col items-center py-4">
                            <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105"> {submit ? <p className="w-5 border-4 border-dotted m-auto flex justify-center items-center border-white border-r-0 animate-spin duration-150 transition-all  relative h-5 rounded-full"></p> : `Register`} </button>
                            <Link className=" text-[#ef95f1] my-3" to="/">Already Have an Account? Login</Link>
                            <Link className=" text-xs text-center">By using this service, you agree to our Privacy Policy, Terms of Service and any related policies. (Check Disclaimer)</Link>
                        </div>
                    </form>
                </div>

            </section>
        </> :
        <Navigate to="/home" />

}

export default SignUp;