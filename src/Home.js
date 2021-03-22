import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/user/UserProvider";
import { PropsAndState } from './PropsAndState'

export const Home = () => {

    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "competitor": true,
        "image": ""
})  
    
    useEffect(() => {
        getUserById()
        .then(user => setUser(user))
    }, [])

    return (
        <section>
            {
            <PropsAndState currentUser={user}/>
            }
        </section>
    )
}
