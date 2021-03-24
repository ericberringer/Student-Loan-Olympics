import React, { useContext, useEffect, useState } from "react"
import "./User.css"
import { useHistory } from "react-router-dom"

export const UserDetail = () => {

    const history = useHistory()

    return (
        <>
        <section>
            <h3>{user.name}</h3>
        </section>
        </>
    )

}