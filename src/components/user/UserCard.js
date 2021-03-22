import React from "react"
import "./User.css"
import { Link, useHistory } from "react-router-dom"

export const UserCard = ({user, debt})=> {

    const history = useHistory()

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const DebtButton = () => <button className="editDebtButton" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button> 
        
    
return (

    <section className="user">
        <h3 className="user__name">
        <Link to={`/users/detail/${user.id}`}>
          { user.name }
        </Link>
        </h3>
        {user.id === currentUser ? <DebtButton/> : <div></div> }
        <div>
            <h4>Total Debt: ${ debt?.amount ? debt.amount : 0 }</h4>
        </div>
    </section>
        )
}