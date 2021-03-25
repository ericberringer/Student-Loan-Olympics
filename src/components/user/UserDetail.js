import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { TransactionContext } from "../transactions/TransactionProvider"
import "./User.css"
import { DebtContext } from "../debt/DebtProvider"

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

    if(!user) return null

    const competitor = user.competitor === true

        let filteredTransactions = []
        if(competitor) {
            filteredTransactions = transactions?.filter(t => {
                return t.debtId === user?.debts[0].id
            }).map(obj => obj)
        } else {
            filteredTransactions = transactions.filter(t => {
                return t.userId === user.id
            }).map(obj => obj)
        }



    return (
        <>
        {
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
                   filteredTransactions.map((t,i) => {
                    let transactionUser = transactions.find((transaction) => transaction.debtId === t.debtId)
                    console.log(t)
                       return <li key={i}>${t.amount} {transactionUser.user.name}</li>
                    })
               }

            </div>
            <button className="homeButton" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        :
        <section className="detailSection">
            <h3>{user.name}</h3>
            <h4>Contributor</h4>
            <div>
                <h3>Transaction History</h3>
                {
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