import React from "react"
import "./User.css"
import { Link } from "react-router-dom"

// handles the content of each user card
export const UserCard = ({user, debt, transaction})=> {
        
    
return (
        <section className="userCard">
        <div className="userNameDebt card">
            <h3 className="user__name">
                {/* Linking to a user's detail, passing the url the selected user's
                id. */}
            <Link to={`/users/detail/${user.id}`}>
            { user.name }
            </Link>
            </h3>
            {/* if the user has a debt then subtract the total transactions
            made towards a user's debt from their total debt amount. */}
            <h4>: Total Debt: ${debt ? debt?.amount - transaction : 0}</h4>
        </div>
    </section>
        )
}