import React, { useState, createContext } from "react"

export const TransactionContext = createContext()

export const TransactionProvider = (props) => {

    const [transactions, setTransactions] = useState([])

    const getTransactions = () => {
        return fetch("http://localhost:8088/transactions?_expand=debt&_expand=user")
        .then(res => res.json())
        .then(setTransactions)
    }

    const addTransaction = transactionObj => {
        return fetch("http://localhost:8088/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionObj)
        })
        .then(getTransactions)
    }

    return (
        <TransactionContext.Provider value={{
            transactions, getTransactions, addTransaction
        }}>
            {props.children}
        </TransactionContext.Provider>
    )
}