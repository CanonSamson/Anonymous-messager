
import { useUserAuth } from "../Auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";


const Home = () => {
        const { userDetail, logout } = useUserAuth();
        const [isCopied, setIsCopied] = useState(false);
        const [log, setLog] = useState(false);


        const link = `https://mestid.netlify.app/${userDetail.name}`
        const linkText = `Write a *secret anonymous message* for me.. 😉 I *won't know* who wrote it.. 😂❤ 👉 ${link}`
        const handleCopy = () => {
                navigator.clipboard.writeText(linkText);
                setIsCopied(true);
                alert("Copied");
        };

        return (
                <section className=" p-5 min-h-screen justify-center flex items-center bg-blue-600 text-[11px] ">

                        <div onClick={() => { setLog(!log) }} className=" bg-blue-800 text-white p-2 absolute flex items-center rounded-full top-5 right-5">
                                <p className=" mr-2  hover:cursor-pointer ">Log Out</p>
                                <MdOutlineLogout />
                        </div>

                        <div className={` ${log ? " top-0 right-0 w-full h-screen transition-all duration-150"
                                :
                                " overflow-hidden w-[0px] h-[0px] transition-all duration-150 "} 
                         bg-[#7d247f]/50 text-white   fixed  flex justify-center items-center`}>
                                <div className="  p-5 m-5 rounded-lg bg-white max-w-[300px]">
                                        <p className="text-red-600">Are you sure you want To Log Out?  You can't undo this action.</p>

                                        <div className='flex items-center justify-end mt-4  pr-3  '>
                                                <div onClick={() => { setLog(!log) }} className=' w-[70px] mx-3 hover:cursor-pointer active:bg-blue-600/400 bg-blue-600  active:scale-110
                                             active:text-white  border text-center border-orange rounded'>NO</div>
                                                <div onClick={logout} className=' w-[70px]  hover:cursor-pointer duration-150 active:scale-110 
                                            active:border-red-600 active:bg-white active:text-black  active:border  border border-red-600 bg-red-600 text-white text-center rounded'>YES</div>
                                        </div>
                                </div>
                        </div>
                        <div className="  text-black shadow-xl  items-center  p-5 rounded-lg  bg-white max-w-[400px] ">
                                <h1 className=" text-center pt-2   text-3xl mt-10 font-Casper uppercase mb-2">{userDetail.name} Profile</h1>
                                <p className="text-center w-auto mb-3  bg-blue-100 rounded py-[1px] hover:cursor-pointer text-blue-500">{link}</p>
                                <p className=" text-xs text-center">Share your profile link ❤️ to get responses from your friend. Go to "View Messages" to check out the responses. 👌</p>

                                <div className=" border-t  grid grid-cols-1 gap-3 mt-3">
                                        <Link to={`/m/${userDetail.id}`} className=" flex flex-col items-center ">
                                                <button className=" bg-blue-600 text-white w-full h-[40px] rounded shadow-lg active:scale-105">View Messages</button>
                                        </Link>

                                        <a
                                                className=" flex flex-col items-center "
                                                href={`whatsapp://send?text=${linkText}`}
                                                data-action="share/whatsapp/share">
                                                <button className=" bg-green-600 w-full text-white  h-[40px]  rounded shadow-lg active:scale-105">Share on WhatsApp</button>
                                        </a>
                                        <div onClick={handleCopy} className=" flex flex-col items-center ">
                                                <button className=" bg-blue-600 w-full text-white  h-[40px]  rounded shadow-lg active:scale-105">Copy Your Link</button>
                                        </div>
                                </div>

                        </div>

                </section>
        );
}

export default Home;