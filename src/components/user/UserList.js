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

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    useEffect(() => {
        getDebts()
        .then(getTransactions)
        .then(getUsers)
    }, [])

    return (
        <>
        <section className="userList">
            <h2 className="userTitle">Competitors</h2> 
            <div className="competitors">
                {
                    users.map(user => {
                        if(user.competitor === true) {
                            const debt = debts.find(debt => debt.userId === user.id)
                            const transaction = transactions.filter(transaction => transaction.debtId === debt.id)
                            let totalTransactions = 0
                            transaction.map(t => totalTransactions = t.amount + totalTransactions)
                            return <UserCard key={user.id} user={user} debt={debt} transaction={totalTransactions}/>
                        } 
                    })
                }
            </div>

            <h2 className="userTitle">Contributors</h2> 
            <div className="contributors">
                {
                    users.map(user => {
                        if(user.competitor === false) {
                            const transaction = transactions.find(t => t.userId === user.id)
                            return <ContributorCard key={user.id} user={user} transaction={transaction} />
                        }
                    })
                }
            </div> 
        </section>
        </>
    )

}

