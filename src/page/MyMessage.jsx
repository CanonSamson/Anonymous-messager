
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
        <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#DDC7F3]">

            <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7821CE]">
                <h1 className=" text-3xl mt-10 text-center">My Answers</h1>
                <p className=" text-xs  text-center">👇 Scroll 👇 down to check out the messages that you have received</p>

                <div className="mt-10">

                    {
                        message.length === 0 ?

                            <div className=" border my-10 border-red-400 rounded-lg p-5">
                                <p>Oops! 😅 No one has sent you a message in last 3 Days! Share your profile link and check back later again!</p>
                            </div>


                            :

                            message.map((item) => (
                                <div key={item.id} className=" bg-[#47137c] border-dotted border border-[#fb01ff]  shadow-lg my-2  rounded-lg p-5">
                                    <p className=" my-2">{item.text}</p>
                                    {item.timestamp &&
                                        <p className=" mt-10">
                                            <span className="text-xs">{new Date(item.timestamp.seconds * 1000).toLocaleString("en-US")}</span>
                                        </p>}
                                </div>
                            ))
                        // <div className=" h-[100px] w-full flex justify-center relative items-center ">
                        //     <p className="w-5 border-4 border-dotted m-auto flex justify-center items-center border-white border-r-0 animate-spin duration-150 transition-all absolute h-5 rounded-full"></p>
                        // </div>

                    }




                </div>
                <div className=" flex flex-col items-center py-4">
                    <Link className="w-full" to="/home" >
                        <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Go Back</button>
                    </Link>
                    <div className=" mt-5">
                        <p className=" py-3">Mestid is a game where you can anonymously compliment and receive
                            compliments from friends and family. To use the platform, share your unique profile link and ask your friends to do the same. You can also share the dare on social media. Messages can be shared as a status/story or archived. Inappropriate messages can be reported to be reviewed by the support team.</p>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default MyMessage;