import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { DebtContext } from "./DebtProvider"
import { UserContext } from "../user/UserProvider"
import "./Debt.css"

// DebtForm is in charge of editing an existing debt
export const DebtForm = () => {

    // resetDebt is a PUT that is overwriting the current debt object
    const { resetDebt, getDebtById } = useContext(DebtContext)
    const { getUsers } = useContext(UserContext)

    const history = useHistory()
    // Accesses the debtId that is in the url
    const {debtId} = useParams()
    
    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    // State variable that will be set to overwrite the existing debt object
    const [debt, setDebt] = useState({
        userId: currentUser,
        amount: 0,
        description: "",
        isComplete: false
    })

    // Fetches all users
    useEffect(() => {
        getUsers()
        .then(() => getDebtById(debtId))
            .then(debt => 
                setDebt(debt))
    }, [])

    // Sets value of input fields to the debt state variable
    const handleInputChange = (event) => {
        const newDebt = { ...debt }
        newDebt[event.target.id] = event.target.value
        setDebt(newDebt)
    }

    // When all fields are populated resetDebt will make a new debt object in place of the old one
    const handleSaveDebt = (event) => {
        event.preventDefault()
        if(debt.amount === "" || debt.description === "") {
            window.alert("Amount and description fields must be complete.")
        } else {
            resetDebt({
                userId: currentUser,
                amount: parseInt(debt.amount),
                description: debt.description,
                isComplete: debt.isComplete,
                id: debtId
            })
            .then(() => history.push("/"))
        }
    }

    if(!debt) return null

    // Edit debt form
    return (
        <form className="debtForm">
            <h2 className="debtFormTitle">Debt Form</h2>
            <fieldset>
                <label htmlFor="debtAmount">Total Debt Amount: $</label>
                <input type="text" id="amount" name="debtAmount" required className="amountField" onChange={handleInputChange} value={debt.amount}/>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" required rows="2" cols="20" onChange={handleInputChange} value={debt.description}></textarea>
            </fieldset>
            {/* <fieldset>
                <input type="checkbox" id="checkbox" name="checkbox" onChange={handleInputChange} value={debt.isComplete} defaultChecked={debt.isComplete ? true : false}></input>
                <label htmlFor="checkbox">Campaign Complete</label>
            </fieldset> */}
            <button onClick={handleSaveDebt}>
                Save
            </button>
        </form>
    )
}