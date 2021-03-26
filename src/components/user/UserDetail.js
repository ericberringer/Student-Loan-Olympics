import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DebtContext } from "../debt/DebtProvider"
import { TransactionContext } from "../transactions/TransactionProvider"
import { UserContext } from "./UserProvider"
import "./User.css"

// In charge of handling the user's detail info when a user is clicked on the home page.
export const UserDetail = () => {

    const { getSelectedUserById } = useContext(UserContext)
    const { transactions, getTransactions } = useContext(TransactionContext)
    const { debts, getDebts } = useContext(DebtContext)

    const [user, setUser] = useState()

    const {userId} = useParams()
    
    const history = useHistory()

    useEffect(() => {
        getSelectedUserById(userId)
        .then((res) => {
            setUser(res)
        })
        .then(getTransactions)
        .then(getDebts)
    }, [])

    // Loading state
    if(!user) return null

    const competitor = user.competitor === true

        let filteredTransactions = []
        if(competitor) {
            // If a user is a competitor filter through the transactions and return the transaction whose debtId matches the id of the debt object
            filteredTransactions = transactions?.filter(t => {
                return t.debtId === user?.debts[0].id
            }).map(obj => obj)
        } else {
            // If the user is a contributor filter through transactios and return the transaction whose userId matches the id of the user object
            filteredTransactions = transactions.filter(t => {
                return t.userId === user.id
            }).map(obj => obj)
        }



    return (
        <>
        {
                            // ##### Competitor Detail #####
        competitor ?
            <section className="detailSection">
            <h3>{user.name}</h3>
            <h4>Competitor</h4> 
            <div>
                <h3>Debt Description</h3> 
                <p>{user?.debts[0].description}</p>
                <h3>Starting Debt: ${user.debts[0].amount}</h3>
                <h3>Recent Transactions:</h3>
               {
                // Map over the relevant transaction objects, return the transaction amounts and the name of the user who made the transaction
                // by matching the debtId of the transactions to the debtId of the filteredTransactions object in order to access the name of the contributor
                   filteredTransactions.map((t,i) => {
                    let transactionUser = transactions.find((transaction) => transaction.debtId === t.debtId)
                       return <li key={i}>${t.amount} {transactionUser.user.name}</li>
                    })
               }

            </div>
            <button className="homeButton" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        :
                            // ##### Contributor Detail #####

        <section className="detailSection">
            <h3>{user.name}</h3>
            <h4>Contributor</h4>
            <div>
                <h3>Transaction History</h3>
                {
                // Map over the relevant transactions and find the 
                    filteredTransactions.map((t, i) => {
                       let debtUser = debts.find((debt) => debt.id === t.debtId)
                        return <li key={i}>${t.amount} {debtUser.user.name}</li>
                    })     
    
                }
            </div>
            <button className="homeButton" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        }
        </>
    )

}