import React, { useContext } from "react"
import { useHistory } from "react-router"
import { DebtContext } from "./components/debt/DebtProvider"
import "./PropsAndState.css"



export const PropsAndState = ({user, debt, transaction}) => {

    const { deleteDebt } = useContext(DebtContext)
    const history = useHistory()

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const EditDebtButton = () => <button className="editDebtButton" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button> 
    
    const handleDelete = () => {
        deleteDebt(debt.id)
            .then(() => {
                history.push("/")
            })
    }

// ######## Contributor Profile ########

    const ContributeButton = () => <button className="makeContributionButton" onClick={() => {history.push(`/transaction/detail`)}}>Make a Contribution</button>

    return (
        <>
        {
        user.competitor ?

            <section className="header">
                <h3>Welcome to the Student Loan Olympics</h3>
                <h3>{user.name}</h3>
                {!debt ? <button onClick={() => history.push(`/debt/create`)}>Create a Debt</button> : <h3>Your Current Debt is: ${debt.amount - transaction}</h3> }
                {debt ? <button onClick={handleDelete} className="deleteDebtButton">Delete Debt</button> : <div></div> }
                <div>
                {debt ? <EditDebtButton/> : <div></div> }
                </div>   
            </section>
        
        : 
        
        <section className="header">
            <h3>Welcome to the Student Loan Olympics</h3>
            <h3>{user.name}</h3>
            <div>
                {<ContributeButton/>}
            </div>
        </section>
        }
        </>
    )
}