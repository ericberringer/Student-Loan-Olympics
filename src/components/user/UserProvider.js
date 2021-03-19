import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])

    const getUsers = () => {
        console.log("Look at my users baabbaaaaaay")
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    const getUserById = () => {
        return fetch(`http://localhost:8088/users/${sessionStorage.getItem("app_user_id")}?_embed=debt`)
        .then(res => res.json())
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}