import { useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase-config"
import { setDoc, doc } from "firebase/firestore"
import { Link , useNavigate } from "react-router-dom";

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
            delete formDataCopy.password
            await setDoc(doc(db, "users", user.uid), formDataCopy);

            setSubmit(submit)
            navigate("/home")
        } catch (e) {
            console.error("Error adding document: ", e);
            setSubmit(submit)
        }

    }


    useEffect(() => {
        if (auth) {
            navigate("/home")
        }
      },[])

    console.log(formData);
    return (
           <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                                <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" />
                                <h1 className=" text-3xl mt-10">Register</h1>

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
                                            className=" p-3 w-full bg-transparent border-b "
                                            type="text"
                                            placeholder="Enter Your PassWord"
                                        />
                                    </div>

                                <div className=" flex flex-col items-center py-4">
                                        <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Risgister </button>
                                        <Link className=" text-[#ef95f1] my-3" to="/">Already Have an Account? Login</Link>
                                        <Link className=" text-xs text-center">By using this service, you agree to our Privacy Policy, Terms of Service and any related policies. (Check Disclaimer)</Link>
                                </div>
                            </form>
                </div>

           </section>
     );
}
 
export default SignUp;