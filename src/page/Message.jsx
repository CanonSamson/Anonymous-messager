import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config"
import { getDoc, setDoc } from "firebase/firestore"
import InputField from "../components/InputField";
import { useUserAuth } from "../Auth";


const Messsage = ({ match }) => {
    const [idHandle, setIdHandle] = useState([])

    const { auth, users } = useUserAuth()
    const { id } = useParams();

    const navigate = useNavigate()

    const [message, setMessage] = useState({
        text: "",
        userName: id,
        timestamp: serverTimestamp()
    })

    const { text, timestamp } = message;

    const onChange = (e) => {
        setMessage((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
        console.log(message)
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await setDoc(doc(db, "messages", crypto.randomUUID()), message);
            navigate("/home")
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    useEffect(() => {
        if (auth.currentUser.displayName === id) {
            navigate("/home")
        }

        const CurrentUser = users.filter(user => user.name === id)
        setIdHandle(CurrentUser[0])
    }, [id]);


    return idHandle ?
        <section className=" p-5 min-h-screen justify-center flex items-center  bg-blue-600 text-[11px]">

            <div className="  text-black shadow-xl  items-center p-3 py-10 rounded-lg  bg-white max-w-[400px]">
                <h1 className=" text-2xl text-center">Say Something..</h1>

                <form onSubmit={onSubmit} className="">
                    <div className="  my-5 items-start justify-start flex flex-col">
                        <label className=" mb-2" >Say Something About Me <span className=" text-red-600">*</span></label>
                        <InputField
                            required={true}
                            onChange={onChange}
                            className=" p-3 focus:outline-none w-full  bg-[ rounded-lg"
                            type="text"
                            value={text}
                            id="text"
                            placeholder={`Leave a message for  ${id}`}
                        />

                    </div>

                    <div className=" flex flex-col items-center py-4">
                        <button className=" bg-blue-600 w-full  h-[40px] text-white rounded shadow-lg active:scale-105">Send Message</button>
                        <div className=" mt-2">
                            <Link className=" text-blue-500" to=""> By using this service, you agree to our Privacy Policy, Terms of Service and any related policies.</Link>

                        </div>
                    </div>


                </form>
            </div>

        </section>
        :
        <Navigate to="/" />
}

export default Messsage;