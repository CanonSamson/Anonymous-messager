import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"
import { getDoc, setDoc } from "firebase/firestore"


const Messsage = ({ match }) => {
    const { id } = useParams();

    const navigate = useNavigate()

    const [message, setMessage] = useState({
        text: "",
        uid: id,
    })

    const { text } = message;

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
            navigate("/")
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    useEffect(() => {
    
    }, []);
    return (
        <section className="  p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

            <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                <h1 className=" text-3xl mt-10 text-center">Say Something..</h1>

                <form onSubmit={onSubmit} className=" my-5">
                    <div className="  my-5 items-start justify-start flex flex-col">
                        <label className=" mb-2" >Say Something About Me <span className=" text-red-600">*</span></label>
                        <input
                            onChange={onChange}
                            className=" p-3 focus:outline-none w-full  bg-[#5d185e] rounded-lg"
                            type="text"
                            value={text}
                            id="text"
                        placeholder={`Leave a message for  ${id}`}
                        />
                        <div className=" my-3 border-b border-gray-100/50 w-full py-2 mt-10">
                            <p className=" text-gray-100/50">254 characters remaining</p>
                        </div>
                    </div>

                    <div className=" flex flex-col items-center py-4">
                        <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Send Message</button>
                        <div className=" mt-5">
                            <Link className=" text-[#ef95f1] my-3 text-xs" to=""> By using this service, you agree to our Privacy Policy, Terms of Service and any related policies.</Link>
                            <p>Say what do you think about {id} or Leave a feedback for {id} anonymously using the form above.. 🥰 <br /> Thank You!! 😍😊</p>
                            <p className=" my-3">Guide to write perfect Anonymous Messages by Kubool: With the help of our anonymous message sender named Kubool now, you can easily message your heart's desire to your friends, family members, and anyone you know who are on Kubool. We care about our users and thus we are suggesting what you may choose to tell them anonymously. Everyone in this world loves to get affection from their loved ones be it their parents, partners, or close friends. Tell them how much they matter to you and how much you care for them! These compliments will increase their positive feelings and they will feel your friendly love from the core of their heart. If you feel like there is something you do not like out of them, you may choose to constructively criticize them about it. That is completely fine and in fact when constructive criticism is delivered right, one can develop themselves accordingly to become a better person as a whole. Make sure to be on point with the criticism and make sure that it does not become an insult at the end. You may also choose to suggest things that will help them become a better person as a whole! Future predictions are tough, as shown by the available future predictions apps just like the love predictions! No one knows what is going to happen next. But, it is always good to be aware of your cons, focuses on your pros, and transforming your cons to your pros. That is exactly what good constructive criticism helps you achieve! We hope you liked this little guide on how you can write better anonymous messages which are going to be very productive. Don't forget to play by the rules, keep it clean out there. </p>

                        </div>
                    </div>


                </form>
            </div>

        </section>
    );
}

export default Messsage;