import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    const getUserById = () => {
        return fetch(`http://localhost:8088/users/${sessionStorage.getItem("app_user_id")}?_embed=debts`)
        .then(res => res.json())
    }

    const getSelectedUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}?_embed=debts`)
            .then(res => res.json())
    }

    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(getUsers)
      }
    
    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById, deleteUser, updateUser, getSelectedUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}