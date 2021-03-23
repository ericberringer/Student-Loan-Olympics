import React, { useContext, useEffect, useState } from "react"
import "./Transaction.css"
import { useHistory } from 'react-router-dom'
import { TransactionContext } from "./TransactionProvider"

export const TransactionDetail = () => {

    const { addTransaction } = useContext(TransactionContext)

    const history = useHistory()
    
    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [transaction, setTransaction] = useState({
        userId: currentUser,
        debtId: 0,
        amount: 0
    })

    const handleInputChange = (event) => {
        const newTransaction = { ...transaction }
        newTransaction[event.target.id] = event.target.value
        setTransaction(newTransaction)
    }

    const handleAddTransaction = (event) => {
        event.preventDefault()
        addTransaction({
            id: transaction.id,
            userId: currentUser,
            debtId: transaction.debtId,
            amount: parseInt(transaction.amount)
        })
        .then(() => history.push("/"))
    }

    return (
        <form className="transactionForm">
            <h2 className="transactionFormTitle">Make a Contribution</h2>
            <fieldset>
                <label htmlFor="competitor">Select a Competitor </label>
                <select name="competitor" id="competitor" value={transaction.debtId}>
                    <option value="0">Select</option>
                {
                    // option tags with all competitors
                }
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="amount">Contribution: $</label>
                <input type="" id="amount" name="amount" required onChange={handleInputChange}></input>
            </fieldset>
        </form>
    )

}