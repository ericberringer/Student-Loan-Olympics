import React, { useEffect, useContext, useState } from "react"
import { UserContext } from "./UserProvider"
import { DebtContext } from "../debt/DebtProvider"
import { UserCard } from "./UserCard"
import { ContributorCard } from "./ContributorCard"
import "./User.css"
import { TransactionContext } from "../transactions/TransactionProvider"

export const UserList = () => {
    
    const { users, getUsers } = useContext(UserContext)
    const { debts, getDebts } = useContext(DebtContext)
    const { transactions, getTransactions } = useContext(TransactionContext)

    useEffect(() => {
        getDebts()
        .then(getTransactions)
        .then(getUsers)
    }, [])

    return (
        <>
        <section className="userList">
            <h2 className="userTitle">Competitors</h2> 
            <div className="competitors userDiv">
                {
                    // iterate over the array of user objects
                    users.map(user => {
                        // if the user is a competitor
                        if(user.competitor === true) {
                            // find the debts whose debtId matches the id of the user
                            const debt = debts.find(debt => debt.userId === user.id)
                            // filter out the transactions whose debtId matches the id of the debt objects
                            const transaction = transactions?.filter(transaction => transaction.debtId === debt?.id)
                            // totalTransactions will store the total amounts put toward a particular debt
                            let totalTransactions = 0
                            // map over the relevant transactions and add up the amount of each transaction
                            transaction.map(t => totalTransactions = t.amount + totalTransactions)
                            // passing UserCard a user, their debt, and the total transaction made towards that individual competitor's debt                            
                            if(debt !== undefined) {
                                return <UserCard key={user.id} user={user} debt={debt} transaction={totalTransactions}/>
                            }
                        } 
                    })
                }
            </div>

            <h2 className="userTitle">Contributors</h2> 
            <div className="contributors userDiv">
                {
                    // iterate over all users
                    users.map(user => {
                        // if the user is not a competitor
                        if(user.competitor === false) {
                            let totalTransactions = 0
                            // filter out the transactions 
                            const transaction = transactions.filter(t => t.userId === user.id)
                            transaction.map(t => totalTransactions = t.amount + totalTransactions)
                            if(totalTransactions !== 0) {
                                return <ContributorCard key={user.id} user={user} transaction={totalTransactions} />
                            }
                        }
                    })
                }
            </div> 
        </section>
        </>
    )

}

