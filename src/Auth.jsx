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
    const [users, setUsers] = useState([])

    const [userD, setUserD] = useState(null)

    const auth = getAuth();


    async function getUser() {
        try {
            let uid =  auth && auth.currentUser.uid
            const data = await getDocs(collection(db, "users"))
            const user = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const userCurrentData = user.find(user => user.id === uid);
            setUserDetail(userCurrentData)

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
        });
        const getUserLink = async () => {
            try {
                const data = await getDocs(collection(db, "users"))
                const users = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                setUsers(users)
                setPending(false)
            } catch (errors) {
                console.error("Error adding document: ", errors);
            }

        }
        getUserLink()
    }, []);


    if (pending) {
        return (
            <div className=" w-full bg-blue-600 h-screen fixed right-0 flex justify-center items-center">
                <p className=" relative w-7 h-7 rounded-full border-2 border-dashed border-white m-auto animate-spin  "></p>
            </div>
        )
    }

    const value = {
        users,
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