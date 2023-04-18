import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const InputField = ({ id, label, type, error, ...input }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className=" w-full">
            <label className=" mb-2" htmlFor={id}>{label}</label>
            <div className=" w-full rounded   border  border-black/50 ">
                <input
                    id={id}
                    type={type}
                    {...input}
                    className=" w-full  p-3 focus:outline-none text-[10px]"
                />
            </div>
            <small className=" text-red-600">{error}</small>
        </div >
    );
}

export default InputField;