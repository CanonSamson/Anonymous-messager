import { createContext, useContext, useEffect, useState } from "react"

import { getAuth } from "firebase/auth";
import { db } from "./firebase-config"
import { collection, getDocs } from "firebase/firestore"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export function useUserAuth() {
    return useContext(AuthContext)
}



export function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [pending, setPending] = useState(true)
    const [userDetail, setUserDetail] = useState([])

    const [userD, setUserD] = useState(null)

    const auth = getAuth();


    async function getUser() {
        let uid = auth.currentUser.uid

        try {
            const data = await getDocs(collection(db, "users"))
            const user = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = user.find(user => user.id === uid);
            setUserDetail(userCurrentData)
            // console.log(userCurrentData)

        } catch (err) {
            console.log(err)
        }
    }

    function logout() {
        signOut(auth);
        navigate("/")
    }



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserD(user)
            getUser();
            setPending(false)
        });


    }, []);


    if (pending) {
        return (
            <div className=" w-full bg-blue-600 h-screen fixed right-0 flex justify-center items-center">
                <p className=" relative w-7 h-7 rounded-full border-2 border-dashed border-white m-auto animate-spin  "></p>
            </div>
        )
    }

    const value = {
        auth,
        userDetail,
        userD,
        logout

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}