import React from "react"
import "./User.css"
import { Link } from "react-router-dom"

export const UserCard = ({user, debt, transaction})=> {
        
    
return (

    <section className="userCard">
        <div className="userNameDebt card">
            <h3 className="user__name">
            <Link to={`/users/detail/${user.id}`}>
            { user.name }
            </Link>
            </h3>
            <h4>: Total Debt: ${debt.amount}</h4>
        </div>
        {/* <button onClick={UserDetail}>Description</button> */}
    </section>
        )
}