import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
           <section className=" p-5 min-h-screen justify-center flex items-center  bg-[#cc50cf]">

                <div className="  text-white shadow-xl  items-center  p-5 rounded-lg  bg-[#7d247f]">
                                <img className=" flex justify-center items-center w-[40%] m-auto" src="https://gdpd.xyz/kimages/logo-icon.png" alt="" />
                                <h1 className=" text-3xl mt-10">Login</h1>
                                <p className=" text-xs">Recieve anonymous compliments from your friends and send anonymous messages to your friends for free.</p>

                                <form action=" " className=" my-5">
                                    <div className="  my-5 items-start justify-start flex flex-col">
                                        <label className=" mb-2" >Your UserName</label>
                                        <input 
                                            className=" p-3 focus:outline-none w-full bg-transparent border-b "
                                            type="text"
                                            placeholder="Enter Your Username"
                                        />
                                    </div>

                                    <div className="  my-5 items-start justify-start flex flex-col">
                                        <label >Password</label>
                                        <input 
                                            className=" p-3 w-full bg-transparent border-b "
                                            type="text"
                                            placeholder="Enter Your PassWord"
                                        />
                                    </div>

                                <div className=" flex flex-col items-center py-4">
                                        <button className=" bg-[#fb01ff] w-full  p-3 rounded-lg shadow-lg active:scale-105">Login</button>
                                        <Link className=" text-[#ef95f1] my-3" to=""> Forgot Password</Link>
                                        <Link>Don't Have an Account? Register</Link>
                                </div>


                                </form>
                </div>

           </section>
     );
}
 
export default LoginPage;