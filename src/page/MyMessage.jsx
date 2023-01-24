import { Link } from "react-router-dom";

const MyMessage = () => {
    return (
           <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                        <h1 className=" text-3xl mt-10 text-center">My Answers</h1>
                        <p className=" text-xs  text-center">👇 Scroll 👇 down to check out the messages that you have received</p>

                        <div className=" border my-10 border-red-400 rounded-lg p-5">
                                <p>Oops! 😅 No one has sent you a message in last 3 Days! Share your profile link and check back later again!</p>
                        </div>
                        <div className=" flex flex-col items-center py-4">
                            <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Go Back</button>
                        <div className=" mt-5">
                            <p className=" py-3">Kubool is an interactive Dare Game, where you can compliment and get complimented by your friends, family and closed ones keeping the privacy of the users safe.
                            One can only send you a private anonymous message in Kubool when he or she has your username. We recommend you share your unique profile link with everyone you love and care about. Not only them but you can also share the dare with everyone in your social media contact list and ask them to answer the dare. By doing this you will be able to know how people think about you in general. Ask your friends to join the platform and send their unique links too so that you can compliment them anonymously. Does not matter if you are shy to compliment someone or an introvert in general, you can always use the power of anonymity in front of everyone else on our platform and use it to send and receive anonymous compliments, and texts.
                            Suggestions and Compliments received by your friends and acquaintances are to be taken on a positive note.

                            Messages that you receive can be shared as a Status/Story using the "Share" button under the message, once you reach the share page you can follow the instructions and share the secret message that you received. You can archive a message by tapping on "Archive Message" under "More Options" below the message that you want to archive. In case, you think that you may have received an inappropriate message you can always choose to "report" the message. The reported secret message will be sent to the designated support team for review. If the message is found to be violating our terms and conditions, the message sender will be blocked from further accessing the system.</p>
                        </div>
                    </div>

                </div>

           </section>
     );
}
 
export default MyMessage;