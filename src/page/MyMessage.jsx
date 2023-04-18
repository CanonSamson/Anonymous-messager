
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import { useUserAuth } from "../Auth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MyMessage = ({ match }) => {
    const { id } = useParams();
    const [message, setMessage] = useState([])
    const { userDetail, auth } = useUserAuth();

    async function getMessages() {
        let uid = auth.currentUser.uid

        try {
            const data = await getDocs(collection(db, "users"))
            const user = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = user.find(user => user.id === id)

            const messageD = await getDocs(collection(db, "messages"))
            const messageData = (messageD.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const MData = messageData.filter(user => user.userName === userCurrentData.name);

            setMessage(MData)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMessages()

    }, [])
    return (
        <section className=" p-5 min-h-screen justify-center flex items-center  bg-blue-600 text-[11px]">

            <div className="  text-black max-w-[400px] shadow-xl  items-center p-3 rounded py-10  bg-white">
                <h1 className=" text-3xl text-center">My Answers</h1>
                <p className=" text-xs  text-center">👇 Scroll 👇 down to check out the messages that you have received</p>

                <div className="mt-10 grid gap-3 pb-3">

                    {
                        message.length === 0 ?

                            <div className=" border my-10 border-red-400 rounded-lg py-2 px-5 text-[10px]">
                                <p>Oops! 😅 No one has sent you a message in last 3 Days! Share your profile link and check back later again!</p>
                            </div>

                            :

                            message.map(({ id, text, timestamp }) => (
                                <div key={id} className=" bg-blue-400 text-white border-dotted border  shadow-lg  rounded px-5 py-3 min-h-[100px]  flex justify-between flex-col">
                                    <p className=" ">{text}</p>
                                    {timestamp &&
                                        <p className=" ">
                                            <span className="text-[8px]">{new Date(timestamp.seconds * 1000).toLocaleString("en-US")}</span>
                                        </p>}
                                </div>
                            ))

                    }

                </div>
                <div className=" flex flex-col items-center ">
                    <Link className="w-full" to="/home" >
                        <button className=" border-blue-600 border-2 w-full  p-3 rounded shadow-xl text-blue-600 active:scale-105">Go Back</button>
                    </Link>
                    <div className=" mt-3">
                        <p className=" text-[10px]">Mestid is a game where you can anonymously compliment and receive
                            compliments from friends and family. To use the platform, share your unique profile link and ask your friends to do the same. You can also share the dare on social media. Messages can be shared as a status/story or archived. Inappropriate messages can be reported to be reviewed by the support team.</p>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default MyMessage;