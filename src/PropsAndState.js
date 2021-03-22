import React from "react"
import { useHistory } from "react-router"
import "./PropsAndState.css"



export const PropsAndState = ({currentUser, debt}) => {

    const history = useHistory()

    return (
        <>
        {/* {console.log(debt.amount)} */}
        <section className="header">
            <h3>Welcome to the Student Loan Olympics</h3>
            <h3>{currentUser.name}</h3>
            {!debt ? <button onClick={() => history.push(`/debt/create`)}>Create a Debt</button> : <h3>Your Current Debt is: ${debt.amount}</h3> }
        </section>
        </>
    )
}