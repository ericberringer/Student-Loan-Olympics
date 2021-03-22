import React, { useContext, useEffect, useState } from "react";
import { DebtContext } from "./components/debt/DebtProvider";
import { UserContext } from "./components/user/UserProvider";
import { PropsAndState } from './PropsAndState'

export const Home = () => {

//     const { getUserById } = useContext(UserContext)
//     const [user, setUser] = useState({
//         "name": "",
//         "email": "",
//         "competitor": true,
//         "image": ""
// })  
    
    
//     useEffect(() => {
//         getUserById()
//         .then(user => setUser(user))
//     }, [])
    const { users, getUsers } = useContext(UserContext)
    const { debts, getDebts } = useContext(DebtContext)

    useEffect(() => {
        getDebts()
        .then(getUsers)
    }, [])

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    return (
        <section>
            {
                users?.map(user => {
                    if(user.id === currentUser) {
                        const debt = debts.find(debt => debt.userId === user.id)
                        // console.log(debt)
                        return <PropsAndState key={user.id} currentUser={user} debt={debt}/>
                    }
                })
                
            }
        </section>
    )
}
