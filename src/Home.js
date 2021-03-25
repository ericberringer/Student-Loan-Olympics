import React, { useContext, useEffect, useState } from "react";
import { DebtContext } from "./components/debt/DebtProvider";
import { UserContext } from "./components/user/UserProvider";
import { PropsAndState } from './PropsAndState'

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
                users?.map(user => {
                    if(user.id === currentUser) {
                        const debt = debts.find(debt => debt.userId === user.id)
                        let totalTransactions = 0
                        debt?.transactions.forEach(transaction => {totalTransactions+=transaction.amount})
                        return <PropsAndState key={user.id} user={user} debt={debt} transaction={totalTransactions}/>
                    }
                })
                
            }
        </section>
    )
}
