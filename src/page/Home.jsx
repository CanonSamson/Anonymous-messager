
import { useUserAuth } from "../Auth";

const Home = () => {
        const user  = useUserAuth();
    return (
           <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                        <h1 className=" text-center my-2  text-3xl mt-10">{user.name} Profile</h1>
                        <p className="text-center mb-5">https://gdpd.xyz/{user.name} </p>
                        <p className=" text-xs text-center">Share your profile link ❤️ to get responses from your friend. Go to "View Messages" to check out the responses. 👌</p>

                              

                        <div className=" border-t mt-10">
                                <div className=" flex flex-col items-center py-4">
                                        <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">View Messages</button>
                                </div>

                                <div className=" flex flex-col items-center py-4">
                                        <button className=" bg-[#4ba29b] w-full  p-3 rounded-lg shadow-lg active:scale-105">Share on WhatsApp</button>
                                </div>
                        </div>

                </div>

           </section>
     );
}
 
export default Home;