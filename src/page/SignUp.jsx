import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase-config"
import { setDoc, doc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [submit, setSubmit] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const [formData, setformData] = useState({
        name: "",
        email: "",
    })

    const { name, email, password, } = formData

    const auth = getAuth();

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
        } catch (e) {
            console.error("Error adding document: ", e);
            setSubmit(submit)
        }

    }



    console.log(formData);
    return (
        <>
            <Helmet>
                <meta property="og:image" content="../assets/cover.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta name="description" content="Experience the thrill of anonymous communication with friends. Send and receive compliments without revealing your identity. Sign up now for a free and fun way to connect with your friends anonymously." />
            </Helmet>
            <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#DDC7F3]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7821CE]">
                    {/* <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" /> */}
                    <h1 className=" text-3xl mt-10">Register</h1>
                    <p className=" text-xs">Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

                    <form onSubmit={onSubmit} className=" my-5">
                        <div className="  my-5 items-start justify-start flex flex-col">
                            <label className=" mb-2" >Your UserName</label>
                            <input
                                onChange={onChange}
                                id="name"
                                value={name}
                                className=" p-3 focus:outline-none w-full bg-transparent border-b "
                                type="text"
                                placeholder="Enter Your Username"
                            />
                        </div>

                        <div className="  my-5 items-start justify-start flex flex-col">
                            <label className=" mb-2" >Your E-Mail</label>
                            <input
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
                                onChange={onChange}
                                value={password}
                                id="password"
                                className=" p-3 w-full bg-transparent focus:outline-none border-b "
                                type="password"
                                placeholder="Enter Your PassWord"
                            />
                        </div>

                        <div className=" flex flex-col items-center py-4">
                            <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Register </button>
                            <Link className=" text-[#ef95f1] my-3" to="/">Already Have an Account? Login</Link>
                            <Link className=" text-xs text-center">By using this service, you agree to our Privacy Policy, Terms of Service and any related policies. (Check Disclaimer)</Link>
                        </div>
                    </form>
                </div>

            </section>
        </>
    );
}

export default SignUp;