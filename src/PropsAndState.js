import React from "react"

export const PropsAndState = ({currentUser}) => {
    return (
        <>
        {/* {console.log(currentUser.debt[0].amount)} */}
            <h3>Welcome to the Student Loan Olympics {currentUser.name}</h3>
            <h3>{currentUser.name}'s Total Debt {currentUser.debt[0].amount}</h3>
        </>
    )
}