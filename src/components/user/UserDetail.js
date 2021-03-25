import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { TransactionContext } from "../transactions/TransactionProvider"
import "./User.css"

export const UserDetail = () => {

    const { getSelectedUserById } = useContext(UserContext)
    const { transactions } = useContext(TransactionContext)

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
    }, [])

    if(!user) return null


    return (
        <>
        <section>
            <h3>{user.name}</h3>
            {trueCompetitor()} 
            <div>
                <h3>Debt Description</h3> 
                <p>{user.debts[0].description}</p>
                <h3>Starting Debt: ${user.debts[0].amount}</h3>
                {
                    console.log(user)
                }

            </div>
            <button onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        </>
    )

}