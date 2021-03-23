import React from "react"
import "./User.css"
import { Link } from "react-router-dom"

export const UserCard = ({user, debt})=> {
        
    
return (

    <section className="userCard">
        <div className="userNameDebt">
            <h3 className="user__name">
            <Link to={`/users/detail/${user.id}`}>
            { user.name }
            </Link>
            </h3>
            <h4>: Total Debt: ${debt.amount}</h4>
        </div>
    </section>
        )
}