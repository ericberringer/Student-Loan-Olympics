import React from "react"
import "./User.css"
import { Link } from "react-router-dom"

export const ContributorCard = ({user, transaction})=> {
        
    
return (

    <section className="userCard">
        <div className="userNameTransaction card">
            <h3 className="user__name">
            <Link to={`/users/detail/${user.id}`}>
            { user.name }
            </Link>
            </h3>
            <h4>: Total Contribution: ${transaction?.amount ? transaction.amount : 0}</h4>
        </div>
    </section>
        )
}