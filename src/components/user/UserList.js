import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { DebtContext } from "../debt/DebtProvider"
import { UserCard } from "./UserCard"
import "./User.css"

export const UserList = () => {
    
    const { users, getUsers } = useContext(UserContext)
    const { debts, getDebts } = useContext(DebtContext)

    const history = useHistory()

    useEffect(() => {
        getDebts()
        .then(getUsers)
    }, [])

    return (
        <>
            <h2>User</h2> 
            <div className="users">
                {
                    users.map(user => {
                        if(user.competitor === true) {
                            const debt = debts.find(debt => debt.userId === user.id)
                            return <UserCard key={user.id} user={user} debt={debt}/>
                        }
                    })
                }
            </div> 
        </>
    )

}