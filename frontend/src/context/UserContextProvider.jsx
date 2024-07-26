import React,{useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider=({children})=>{
    const [userData,setUserData]=useState(null)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [currentDb,setCurrentDb]=useState(null)
    return (
        <UserContext.Provider value={{userData,setUserData,isLoggedIn,setIsLoggedIn,currentDb,setCurrentDb}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider