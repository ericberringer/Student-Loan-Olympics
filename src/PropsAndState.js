import React from "react"
import { useHistory } from "react-router"
import "./PropsAndState.css"



export const PropsAndState = ({currentUser}) => {

    const history = useHistory()

    return (
        <>
        <section className="header">
        {/* {console.log(currentUser.debt[0].amount)} */}
            <h3>Welcome to the Student Loan Olympics</h3>
            <h3>{currentUser.name}</h3>
            <button onClick={() => history.push(`/debt/create`)}>Create a Debt</button>
        </section>
        </>
    )
}