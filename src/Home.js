import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/user/UserProvider";
import { PropsAndState } from './PropsAndState'

export const Home = () => {

    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState("")
    
    useEffect(() => {
        getUserById()
        .then(user => setUser(user))
        // .then(() => {
        //     let currentUser = users.find(user => user.id === parseInt(sessionStorage.app_user_id))
        //         // setUser(currentUser)
        //         console.log(users)
        // })
    }, [])

    return (
        <section>
            {console.log(user)}
            {
            <PropsAndState currentUser={user}/>
            }
        </section>
    )
}
