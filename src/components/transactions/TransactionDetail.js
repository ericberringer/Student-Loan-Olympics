import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { DebtContext } from "../debt/DebtProvider"
import { TransactionContext } from "./TransactionProvider"
import { UserContext } from "../user/UserProvider"
import "./Transaction.css"

// The form that handles adding a new transaction on a particular competitor
export const TransactionDetail = () => {

    const { transactions, getTransactions, addTransaction } = useContext(TransactionContext)
    const { users, getUsers } = useContext(UserContext)
    // getDebts is expanded to include transaction and user info
    const { debts, getDebts } = useContext(DebtContext)

    const history = useHistory()
    
    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    // State variable holding transaction object keys
    const [transaction, setTransaction] = useState({
        userId: currentUser,
        debtId: 0,
        amount: 0
    })
    
    
    // Sets the debtId onto the transaction object 
    const setDebtId = (event) => {
        // userId = the value in a dropdown menu item
        const userId = parseInt(event.target.value)
        const userDebt = debts.find(debt => debt.userId === userId)
        const newTransaction = { ...transaction }
        newTransaction.debtId = userDebt?.id
        setTransaction(newTransaction)
    }
    
    // Sets the form input values to the state variable
    const handleInputChange = (event) => {
        const selectedTransactions = transactions.filter(t => t.debtId === transaction?.debtId)
        let totalTransactions = 0 + parseInt(event.target.value)
        selectedTransactions.forEach(t => {totalTransactions += t.amount})
        const selectedUsersDebt = debts.find(debt => debt.id === transaction.debtId)
        if(totalTransactions > selectedUsersDebt?.amount){
            window.alert("The contribution exceeds the competitor's remaining debt.")
        }
        const newTransaction = { ...transaction }
        newTransaction[event.target.id] = parseInt(event.target.value)
        setTransaction(newTransaction)
    }

    // Adds a new transaction object to the database
    const handleAddTransaction = (event) => {
        event.preventDefault()
        addTransaction({
            userId: currentUser,
            debtId: transaction.debtId,
            amount: transaction.amount
        })
        .then(() => history.push("/"))
    }

    useEffect(() => {
        getDebts()
        .then(getTransactions)
        .then(getUsers)
    }, [])

    return (
        <form className="transactionForm">
            <h2 className="transactionFormTitle">Make a Contribution</h2>
            <fieldset className="input">
                <label htmlFor="competitor">Select a Competitor </label>
                <select name="competitor" onChange={setDebtId}>
                    <option value="0">Select...</option>
                {
                    // Map through users, if the user is a competitor, return the name of the competitor in the dropdown menu
                    // Each user's id is associated with their menu item
                    users.map(user => {
                        const userDebt = debts.find(debt => debt.userId === user.id)
                        if(user.competitor === true && userDebt !== undefined){
                            return <option value={user.id} id={user.id} key={user.id} required>{user.name}</option>
                        }
                    })
                }
                </select>
            </fieldset>
            <fieldset className="input">
                <label htmlFor="amount">Contribution: $</label>
                <input type="" id="amount" name="amount" required onChange={handleInputChange}></input>
            </fieldset>
            <div className="formButtonDiv">
                <button className="homeButton button" onClick={() => history.push("/")}>Return to Home</button>
                <button className="submitTransaction button" onClick={handleAddTransaction}>Submit</button>
            </div>
        </form>
    )

}
