import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { TransactionContext } from "../transactions/TransactionProvider"
import "./User.css"

export const UserDetail = () => {

    const { getSelectedUserById } = useContext(UserContext)
    const { transactions, getTransactions } = useContext(TransactionContext)

    const [user, setUser] = useState()

    const {userId} = useParams()
    
    const history = useHistory()

    const trueCompetitor = () => {
        if(user.competitor === true){
            return <h3>Competitor</h3>
        } else {
            return <h3>Contributor</h3>
        }
    }

    useEffect(() => {
        getSelectedUserById(userId)
        .then((res) => {
            setUser(res)
        })
        .then(getTransactions)
    }, [])

    if(!user) return null

    const competitor = user.competitor === true

        let filteredTransactions = []
        if(competitor) {
            filteredTransactions = transactions?.filter(t => {
                return t.debtId === user?.debts[0].id
            }).map(obj => obj.amount)
        }



    return (
        <>
        {
        competitor ?
            <section>
            <h3>{user.name}</h3>
            {trueCompetitor()} 
            <div>
                <h3>Debt Description</h3> 
                <p>{user?.debts[0].description}</p>
                <h3>Starting Debt: ${user.debts[0].amount}</h3>
                <h3>Recent Transactions:</h3>
               {
                   filteredTransactions?.map((t,i) => {
                       return <li key={i}>${t}</li>
                    })
               }

            </div>
            <button onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        :
        <section>
            <h3>{user.name}</h3>
            {trueCompetitor()}
            <h3>Transaction History</h3>
            
        </section>
        }
        </>
    )

}