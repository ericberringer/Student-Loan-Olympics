import React, { useState, createContext } from "react"

export const DebtContext = createContext()

export const DebtProvider = (props) => {

    const [debts, setDebts] = useState([])

    const getDebts = () => {
        return fetch("http://http://localhost:8088/debts")
        .then(res => res.json())
        .then(setDebts)
    }

    return (
        <DebtContext.Provider value={{
            debts, getDebts
        }}>
            {props.children}
        </DebtContext.Provider>
    )
}