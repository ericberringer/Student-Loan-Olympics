import React from "react"
import "./User.css"
import { Link, useHistory } from "react-router-dom"

export const UserCard = ({user, debt})=> {

    const history = useHistory()
    
return (

    <section className="user">
        <button className="addDebtButton" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button>
        <h3 className="user__name">
        <Link to={`/users/detail/${user.id}`}>
          { user.name }
        </Link>
        </h3>
        <div>
            <h4>Total Debt: ${ debt?.amount ? debt.amount : 0 }</h4>
        </div>
    </section>
        )
}