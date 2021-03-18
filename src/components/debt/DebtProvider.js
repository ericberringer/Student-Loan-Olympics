import React, { useState, createContext } from "react"

export const DebtContext = createContext()

export const DebtProvider = (props) => {

    const [debts, setDebts] = useState([])

    const getDebts = () => {
        return fetch("http://localhost:8088/debt")
        .then(res => res.json())
        .then(setDebts)
    }

    const addDebt = debtObj => {
        return fetch("http://localhost:8088/debt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(debtObj)
        })
        .then(getDebts)
    }

    return (
        <DebtContext.Provider value={{
            debts, getDebts, addDebt
        }}>
            {props.children}
        </DebtContext.Provider>
    )
}