
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import { useUserAuth } from "../Auth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MyMessage = ({ match }) => {
    const { id } = useParams();
    const [message, setMessage] = useState([])
    const { userDetail } = useUserAuth();

    async function getMessage() {

        try {
            const data = await getDocs(collection(db, "messages"))
            const user = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = user.filter(user => user.uid === userDetail.name);
            console.log(userCurrentData)
            setMessage(userCurrentData)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMessage()
    }, [])
    return (
        <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

            <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                <h1 className=" text-3xl mt-10 text-center">My Answers</h1>
                <p className=" text-xs  text-center">👇 Scroll 👇 down to check out the messages that you have received</p>

                {
                    <div className=" border my-10 border-red-400 rounded-lg p-5">
                        <p>Oops! 😅 No one has sent you a message in last 3 Days! Share your profile link and check back later again!</p>
                    </div>
                    &&
                    message.map((item) => (
                        <div key={item.id} className=" border my-10 border-red-400 rounded-lg p-5">
                            <p>{item.text}</p>
                        </div>
                    ))
                }


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