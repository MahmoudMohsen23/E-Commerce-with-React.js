import { useEffect, useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";


export let UserTokenContext = createContext(null)
export default function UserTokenContextProvider(props) {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState()

    function convertToken() {
        let data = jwtDecode(localStorage.getItem('token'))
        setUserId(data.id)
        console.log(data,'dataaaa');
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            convertToken()
            
        }
    }, [])
    return <UserTokenContext.Provider value={{ convertToken, userId, setUserId, token, setToken }} >
        {props.children}
    </UserTokenContext.Provider>
}