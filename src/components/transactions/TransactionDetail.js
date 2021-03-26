import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { DebtContext } from "../debt/DebtProvider"
import { TransactionContext } from "./TransactionProvider"
import { UserContext } from "../user/UserProvider"
import "./Transaction.css"

// The form that handles adding a new transaction on a particular competitor
export const TransactionDetail = () => {


    const { addTransaction } = useContext(TransactionContext)
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

    // Sets the form input values to the state variable
    const handleInputChange = (event) => {
        const newTransaction = { ...transaction }
        newTransaction[event.target.id] = event.target.value
        setTransaction(newTransaction)
    }

    // Adds a new transaction object to the database
    const handleAddTransaction = (event) => {
        event.preventDefault()
        addTransaction({
            userId: currentUser,
            debtId: transaction.debtId,
            amount: parseInt(transaction.amount)
        })
        .then(() => history.push("/"))
    }


    // Sets the debtId onto the transaction object 
    const setDebtId = (event) => {
        // userId = the value in a dropdown menu item
        const userId = parseInt(event.target.value)
        const userDebt = debts.find(debt => debt.userId === userId)
        const newTransaction = { ...transaction }
        newTransaction.debtId = userDebt.id
        setTransaction(newTransaction)
    }

    useEffect(() => {
        getDebts()
        .then(getUsers)
    }, [])

    return (
        <form className="transactionForm">
            <h2 className="transactionFormTitle">Make a Contribution</h2>
            <fieldset>
                <label htmlFor="competitor">Select a Competitor </label>
                <select name="competitor" onChange={setDebtId}>
                    <option value="0">Select...</option>
                {
                    // Map through users, if the user is a competitor, return the name of the competitor in the dropdown menu
                    // Each user's id is associated with their menu item
                    users.map(user => {
                        if(user.competitor === true){
                            // console.log(user)
                            return <option value={user.id} id={user.id} key={user.id}>{user.name}</option>
                        }
                    })
                }
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="amount">Contribution: $</label>
                <input type="" id="amount" name="amount" required onChange={handleInputChange}></input>
            </fieldset>
            <button className="submitTransaction" onClick={handleAddTransaction}>Submit</button>
        </form>
    )

}