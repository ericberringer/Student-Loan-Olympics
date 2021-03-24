import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"

export const UserDetail = () => {

    const { getSelectedUserById } = useContext(UserContext)

    const [user, setUser] = useState({})

    const {userId} = useParams()
    
    const history = useHistory()

    const trueCompetitor = () => {
        if(user.competitor === true){
            return <h3>Competitor</h3>
        } else {
            return <h3>Contributor</h3>
        }
    }

    useEffect(() => {
        getSelectedUserById(userId)
        .then((res) => {
            setUser(res)
        })
    }, [])

    return (
        <>
        <section>
            {/* {console.log(user.debts[0].amount)} */}
            <h3>{user.name}</h3>
            {trueCompetitor()} 
            <div>
                <h3>Debt Description</h3> 
                {/* <p>{user.debts.description}</p> */}
            </div>
            <button onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        </>
    )

}