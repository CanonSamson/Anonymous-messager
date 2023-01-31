
import { useUserAuth } from "../Auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";


const Home = () => {
        const { userDetail, logout } = useUserAuth();
        const [copy, setCopy] = useState(false);
        const [log, setLog] = useState(false);


        const link = `https://mestid.netlify.app/${userDetail.name}`
        const linkText = `Write a *secret anonymous message* for me.. 😉 I *won't know* who wrote it.. 😂❤ 👉 ${link}`
        const handleCopy = () => {
                navigator.clipboard.writeText(linkText);
                setCopy(!copy)
                alert(Copied)
        };



        return (
                <section className=" min-h-screen w-full px-5 flex justify-center items-center  bg-[#cc50cf]">
                        <div onClick={() => { setLog(!log) }} className=" bg-[#7d247f] text-white p-2 absolute flex items-center rounded-full top-5 right-5">
                                <p className=" mr-2">Log Out</p>
                                <MdOutlineLogout />
                        </div>

                        <div className={` ${log ? " top-0 right-0 w-full h-screen transition-all duration-150" : " overflow-hidden w-[0px] h-[0px] transition-all duration-150 "}  bg-[#7d247f]/50 text-white   fixed  flex justify-center items-center`}>
                                <div className="  p-5 m-5 rounded-lg bg-[#cc50cf]">
                                        <p>Are you sure you want To Log Out?  You can't undo this action.</p>

                                        <div className='flex items-center justify-end mt-4  pr-3  '>
                                                <div onClick={() => { setLog(!log) }} className=' w-[70px] mx-3 hover:cursor-pointer active:bg-[#fb01ff] bg-[#fb01ff]  active:scale-110
                                             active:text-white  border text-center border-orange rounded'>NO</div>
                                                <div onClick={logout} className=' w-[70px]  hover:cursor-pointer duration-150 active:scale-110 
                                            active:border-[#fb01ff] active:bg-white active:text-black  active:border  border border-[#4ba29b] bg-[#4ba29b] text-white text-center rounded'>YES</div>
                                        </div>
                                </div>
                        </div>
                        <div className="  text-white shadow-xl    p-5 rounded-lg  bg-[#7d247f]">
                                <h1 className=" text-center my-2  text-3xl mt-10">{userDetail.name} Profile</h1>
                                <p onClick={() => { setCopy(!copy) }} className="text-center text-xs mb-5">{link}</p>
                                <p className=" text-xs text-center">Share your profile link ❤️ to get responses from your friend. Go to "View Messages" to check out the responses. 👌</p>

                                <div className=" border-t mt-10">
                                        <Link to={`/mymessage/${userDetail.id}`} className=" flex flex-col items-center py-4">
                                                <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">View Messages</button>
                                        </Link>


                                        <a
                                                className=" flex flex-col items-center py-4"
                                                href={`whatsapp://send?text=${linkText}`}
                                                data-action="share/whatsapp/share">
                                                <button className=" bg-[#4ba29b] w-full  p-3 rounded-lg shadow-lg active:scale-105">Share on WhatsApp</button>
                                        </a>
                                        <div onClick={handleCopy} className=" flex flex-col items-center py-4">
                                                <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Copy Your Link</button>
                                        </div>
                                </div>

                        </div>

                </section>
        );
}

export default Home;