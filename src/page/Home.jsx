
import { useUserAuth } from "../Auth";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
        const user = useUserAuth();
        const [copy, setCopy] = useState(false);
        const link = `https://mestid.netlify.app/${user.name}`
        const linkText = `Write a *secret anonymous message* for me.. 😉 I *won't know* who wrote it.. 😂❤ 👉 ${link}`
        const handleCopyClick = () => {
                navigator.clipboard.writeText(linkText);
                setCopy(!copy)
        };

        return (
                <section className=" min-h-screen w-full px-5 flex justify-center items-center  bg-[#cc50cf]">

                        <div className="  text-white shadow-xl    p-5 rounded-lg  bg-[#7d247f]">
                                <h1 className=" text-center my-2  text-3xl mt-10">{user.name} Profile</h1>
                                <p onClick={() => { setCopy(!copy) }} className="text-center text-xs mb-5">{link}</p>
                                <p className=" text-xs text-center">Share your profile link ❤️ to get responses from your friend. Go to "View Messages" to check out the responses. 👌</p>

                                <div className=" border-t mt-10">
                                        <Link to={`/mymessage/${user.id}`} className=" flex flex-col items-center py-4">
                                                <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">View Messages</button>
                                        </Link>


                                        <a
                                                className=" flex flex-col items-center py-4"
                                                href={`whatsapp://send?text=${linkText}`}
                                                data-action="share/whatsapp/share">
                                                <button className=" bg-[#4ba29b] w-full  p-3 rounded-lg shadow-lg active:scale-105">Share on WhatsApp</button>
                                        </a>
                                </div>

                        </div>

                        <div className={` ${copy ? " top-0 right-0 w-full h-screen transition-all duration-150" : " overflow-hidden w-[0px] h-[0px] transition-all duration-150 "}  bg-[#7d247f]/50 text-white   fixed  flex justify-center items-center`}>
                                <div className="  p-5 m-5 rounded-lg bg-[#fb01ff] ">
                                        <div onClick={() => { setCopy(!copy) }} className=" absolute p-3 rounded-full z-20 bg-[#7d247f]/50 top-[10px]  right-[10px] ">
                                                <FiCheckCircle />
                                        </div>
                                        <div className=" flex justify-center items-center">
                                                <h1 className=" text-center my-2  text-3xl mt-10">Copy Link</h1>
                                                <div onClick={handleCopyClick} className="">
                                                        <FiCopy size={50} />
                                                </div>
                                        </div>

                                        <p className="text-center mb-5  bg-[#fb01ff]">https://mestid.netlify.app/{` ${user.name}`} </p>

                                </div>
                        </div>
                </section>
        );
}

export default Home;