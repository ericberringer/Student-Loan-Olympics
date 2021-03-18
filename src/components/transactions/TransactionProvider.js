import React, { useState, createContext } from "react"

export const TransactionContext = createContext()

export const TransactionProvider = (props) => {

    const [transactions, setTransactions] = useState([])

    const getTransactions = () => {
        return fetch("http://http://localhost:8088/transactions")
        .then(res => res.json())
        .then(setTransactions)
    }

    return (
        <TransactionContext.Provider value={{
            transactions, getTransactions
        }}>
            {props.children}
        </TransactionContext.Provider>
    )
}