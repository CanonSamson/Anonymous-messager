import { useState } from "react";
import hero from "../assets/hero.svg"
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import { useUserAuth } from "../Auth";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
    const [loginPop, setLoginPop] = useState(false)
    const [signPop, setsignPop] = useState(false)
    const { userDetail} = useUserAuth();

    return !userDetail ?
        <div>
            <div className=" gap-5 grid sm:grid-cols-2 justify-around  min-h-screen w-full items-center sm:px-10 px-3">
                <div className=" flex flex-col gap-2 w-full ">
                    <h1 className=" text-3xl  sm:text-5xl font-semibold">Recieve anonymous compliments from your friends.</h1>
                    <p>Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>
                    <div className=" flex gap-2 text-[12px]">
                        <button
                            onClick={() => { setsignPop(!signPop) }}
                            className=" bg-blue-600 text-white min-w-[150px]  w-[150px] py-3  rounded
                            active:scale-95 duration-75 ">
                            GET STARTED
                        </button>
                        <button
                            onClick={() => { setLoginPop(!loginPop) }}
                            className=" border-2 border-blue-600 text-black min-w-[150px] w-[150px] h-[45px]
                     active:scale-95 duration-75  rounded">
                            LOG IN
                        </button>

                    </div>
                </div>
                <img className=" hidden sm:flex" src={hero} alt="" />
            </div>

            <div>

                {
                    loginPop &&
                    <section className=" fixed top-0 right-0 w-full p-5 min-h-screen justify-center flex items-center  bg-black/20">
                        <LoginPage onClickR={() => {
                            setsignPop(!signPop)
                            setLoginPop(!loginPop)
                        }} onClick={() => { setLoginPop(!loginPop) }} />
                    </section>
                }
                {
                    signPop &&
                    <section className=" fixed top-0 right-0 w-full p-5 min-h-screen justify-center flex items-center  bg-black/20">
                        <SignUp onClickL={() => {
                            setsignPop(!signPop)
                            setLoginPop(!loginPop)
                        }
                        }
                            onClick={() => {
                                setsignPop(!signPop)
                            }} />
                    </section>
                }
            </div>
        </div>
    :
    <Navigate to="/home" />
}

export default LandingPage;