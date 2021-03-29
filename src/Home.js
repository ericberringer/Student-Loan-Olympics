import React, { useContext, useEffect, useState } from "react";
import { DebtContext } from "./components/debt/DebtProvider";
import { UserContext } from "./components/user/UserProvider";
import { PropsAndState } from './PropsAndState'

// The header of the applications main page
export const Home = () => {

    const { users, getUsers } = useContext(UserContext)
    const { debts, getDebts } = useContext(DebtContext)

    useEffect(() => {
        getDebts()
        .then(getUsers)
    }, [])

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    return (
        <section>
            {
                // iterate through all users, if the users id matches the logged in users id
                users?.map(user => {
                    if(user.id === currentUser) {
                        // find the debt associated with the logged in user
                        const debt = debts.find(debt => debt.userId === user.id)
                        let totalTransactions = 0
                        // for each transaction amount paid towards the user's debt, add the amounts up and store in totalTransactions
                        debt?.transactions.forEach(transaction => {totalTransactions+=transaction.amount})
                        return <PropsAndState key={user.id} user={user} debt={debt} transaction={totalTransactions}/>
                    }
                })
                
            }
        </section>
    )
}
