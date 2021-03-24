import React, { useContext, useEffect, useState } from "react"
import "./Transaction.css"
import { useHistory } from 'react-router-dom'
import { TransactionContext } from "./TransactionProvider"
import { UserContext } from "../user/UserProvider"
import { DebtContext } from "../debt/DebtProvider"

export const TransactionDetail = () => {

    const { addTransaction } = useContext(TransactionContext)
    const { users, getUsers } = useContext(UserContext)
    const { debts, getDebts } = useContext(DebtContext)

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
            userId: currentUser,
            debtId: transaction.debtId,
            amount: parseInt(transaction.amount)
        })
        .then(() => history.push("/"))
    }

    const someFunction = (event) => {
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
                <select name="competitor" onChange={someFunction}>
                    <option value="0">Select...</option>
                {
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