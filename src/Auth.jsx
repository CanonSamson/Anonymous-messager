import { createContext, useContext, useEffect, useState } from "react"

import { getAuth } from "firebase/auth";
import { db } from "./firebase-config"
import { collection, getDocs } from "firebase/firestore"


const AuthContext = createContext();


export function useUserAuth() {
    return useContext(AuthContext)
}



export function AuthProvider({ children }) {
    const [pending, setPending] = useState(true)
    const [userDetail, setUserDetail] = useState([])

    const auth = getAuth();

    async function  getUser() {
        let uid = auth.currentUser.uid

        try {
            const data = await getDocs(collection(db, "users"))
            const user = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = user.find(user => user.id === uid);
            setUserDetail(userCurrentData)
            console.log(userCurrentData)

        } catch (err) {
            console.log(err)
        }
     }  

   
   

    useEffect(() => {        
        auth.onAuthStateChanged((user) => {
            console.log(user)
            getUser();

            setPending(false)
        });


    }, []);

    if (pending) {
        return (
            <div className=" w-full h-screen fixed right-0 flex justify-center items-center">
                <p className=" relative w-5 h-5 rounded-full border-r-[2px] border-rl-[2px]  border-green m-auto animate-spin  "></p>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={userDetail}>
                {children}
        </AuthContext.Provider>
    )
}