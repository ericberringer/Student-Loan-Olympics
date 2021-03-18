import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import "./User.css"

export const UserList = () => {
    
    const { users, getUsers } = useContext(UserContext)

    const history = useHistory()

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <h2>User</h2> 
            <div className="users">
                {
                    users.map(user => {
                        return <UserCard key={user.id} user={user}/>
                    })
                }
            </div> 
        </>
    )

}