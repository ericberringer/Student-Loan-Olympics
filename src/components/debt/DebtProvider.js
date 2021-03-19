import React, { useState, createContext } from "react"

export const DebtContext = createContext()

export const DebtProvider = (props) => {

    const [debts, setDebts] = useState([])

    const getDebts = () => {
        return fetch("http://localhost:8088/debts")
        .then(res => res.json())
        .then(setDebts)
    }

    const addDebt = debtObj => {
        return fetch("http://localhost:8088/debts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(debtObj)
        })
        .then(getDebts)
    }

    const resetDebt = debtObj => {
        return fetch(`http://localhost:8088/debts/${debtObj.id}`, {
            method: "PUT",
            body: JSON.stringify(debtObj),
            headers: {
            "Content-type": "application/json"
            }
        })
        .then(getDebts)
    }

    return (
        <DebtContext.Provider value={{
            debts, getDebts, addDebt, resetDebt
        }}>
            {props.children}
        </DebtContext.Provider>
    )
}