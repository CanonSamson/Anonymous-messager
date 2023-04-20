import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config"
import { getDoc, setDoc } from "firebase/firestore"
import InputField from "../components/InputField";
import { useUserAuth } from "../Auth";
import { useFormik } from "formik";
import { MessageSchema } from "../validation/formValidation";


const Messsage = ({ match }) => {
    const [idHandle, setIdHandle] = useState([])
    const [submit, setSubmit] = useState(false)

    const { auth, users } = useUserAuth()
    const { id } = useParams();

    const navigate = useNavigate()

    const [message, setMessage] = useState({
        userName: id,
        timestamp: serverTimestamp()
    })



    const onSubmit = async () => {
        setSubmit(true)

        const data = { ...values, ...message }

        console.log(data)
        try {
            await setDoc(doc(db, "messages", crypto.randomUUID()), data);
            setSubmit(false)
            navigate("/home")
        } catch (err) {
            console.error("Error adding document: ", err);
            setSubmit(false)
        }

    }


    const { errors, touched, handleChange, handleBlur, values, handleSubmit } = useFormik({
        initialValues: {
            text: "",
        },
        validationSchema: MessageSchema,
        onSubmit

    })
    useEffect(() => {
        if (auth.currentUser && auth.currentUser.displayName === id) {
            navigate("/home")
        }else {
            
        }

        const CurrentUser = users.filter(user => user.name === id)
        setIdHandle(CurrentUser[0])
    }, [id]);


    return idHandle && idHandle ?
        <section className=" p-5 min-h-screen justify-center flex items-center  bg-blue-600 text-[11px]">

            <div className="  text-black shadow-xl  items-center p-3 py-10 rounded-lg  bg-white max-w-[400px]">
                <h1 className=" text-2xl text-center">Say Something..</h1>

                <form onSubmit={handleSubmit} className="">
                    <div className="  my-5 items-start justify-start flex flex-col">
                        <label className=" mb-2" >Say Something About Me <span className=" text-red-600">*</span></label>
                        <InputField
                            id="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            value={values.text}
                            placeholder={`Leave a message for ${id}`}
                        />

                    </div>

                    <div className="  py-4">
                        {!submit ?
                            <button type="submit" className=" bg-blue-600 w-full  h-[35px] text-white rounded shadow-lg active:scale-105">
                                Send Message
                            </button>
                            :
                            <div className="hover:cursor-not-allowed w-[50px] flex justify-center items-center rounded bg-blue-500 h-[35px]">
                                <p className=" hover:cursor-not-allowed w-5 h-5 border-[3px] border-dashed m-auto flex justify-center 
                            items-center border-white  animate-spin duration-150 transition-all  relative  rounded-full"></p>
                            </div>
                        }
                        <div className=" mt-2">
                            <Link className=" text-blue-500" to=""> By using this service, you agree to our Privacy Policy, Terms of Service and any related policies.</Link>

                        </div>
                    </div>


                </form>
            </div>

        </section>
        :
        <Navigate to="/home" />
}

export default Messsage;