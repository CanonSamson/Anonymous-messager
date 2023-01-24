import { Link } from "react-router-dom";

const NotFund = () => {
    return (
        <div className=" flex  flex-col items-center">
    <h1 className=" text-6xl font-medium">404</h1>
            <p className=" font-semibold text-xl ">Opps! Page Not Found</p>
            <Link to="/">
                <button className=" bg-green active:scale-110
             transition-all duration-150 text-white 
              my-5 h-[40px] w-[200px] rounded-lg ">
                    BACK TO HOME
                </button>
            </Link>
        </div>
    );
}

export default NotFund;