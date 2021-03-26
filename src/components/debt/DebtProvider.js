import React, { useState, createContext } from "react"

export const DebtContext = createContext()

export const DebtProvider = (props) => {

    // Sets the debts state variable from the getDebts get request
    const [debts, setDebts] = useState([])

    // Fetches all users. Get request. Also includes relevant debts and user associated with a transaction
    const getDebts = () => {
        return fetch("http://localhost:8088/debts?_embed=transactions&_expand=user")
        .then(res => res.json())
        .then(setDebts)
    }

    const getDebtById = (id) => {
        return fetch(`http://localhost:8088/debts/${id}`)
            .then(res => res.json())
    }

    // POST method, used to add a brand new debt to the database
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

    // PUT method, used to overwrite/edit a existing debt object
    // Allows access to debt object via it's id from the url
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

    // PATCH for editing, not currently in use
    const editDebt = (debtObj) => {
        return fetch(`http://localhost:8088/debts/${debtObj.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                amount: 0
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
    }

    // DELETE method, deletes a debt object
    const deleteDebt = (debtId) => {
        debugger
        return fetch(`http://localhost:8088/debts/${debtId}`, {
            method: "DELETE"
        }).then(getDebts)
    }

    // Context provider is making all included information available to other components
    return (
        <DebtContext.Provider value={{
            debts, getDebts, addDebt, resetDebt, deleteDebt, editDebt, getDebtById
        }}>
            {props.children}
        </DebtContext.Provider>
    )
}