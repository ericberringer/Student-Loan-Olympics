import React from "react"
import "./User.css"
import { Link } from "react-router-dom"

export const UserCard = ({user})=> (
    <section className="user">
        <h3 className="user__name">
        <Link to={`/users/detail/${user.id}`}>
          { user.name }
        </Link>
        </h3>
    </section>
)