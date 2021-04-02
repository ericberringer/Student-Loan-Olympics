import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { DebtContext } from "./DebtProvider"
import "./Debt.css"
// This component is in charge of adding a logged in user's 
// new debt to the database.

export const AddDebt = () => {
    
    const { addDebt } = useContext(DebtContext)

    const history = useHistory()

    let registeredUser = parseInt(sessionStorage.getItem("app_user_id"))
    
    // Setting the state of the debt object
    const [debt, setDebt] = useState({
        userId: registeredUser,
        amount: 0,
        description: "",
        dueDate: 0,
        isComplete: false
    })

    // Sets the value of the input fields into the debt state variable
    const handleInputChange = (event) => {
        const newDebt = { ...debt }
        newDebt[event.target.id] = event.target.value
            setDebt(newDebt)
    }

    // Adds the debt object to the database
    const handleAddDebt = (event) => {
        event.preventDefault()
        addDebt({
            id: debt.id,
            userId: registeredUser,
            amount: parseInt(debt.amount),
            description: debt.description,
            isComplete: debt.isComplete
        })
        .then(() => history.push("/"))
    }
    // Add new debt form
    return (
        <form className="debtForm">
            <h2 className="debtFormTitle">Add Your Debt</h2>
            <fieldset className="input">
                <label htmlFor="debtAmount">Debt Amount: $</label>
                <input type="text" id="amount" name="debtAmount" required className="amountField" onChange={handleInputChange}/>
            </fieldset>
            <fieldset className="input">
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" required rows="1" cols="20" onChange={handleInputChange}></textarea>
            </fieldset>
            {/* <fieldset>
                <input type="checkbox" id="checkbox" name="checkbox" onChange={handleInputChange} value={debt.isComplete} defaultChecked={debt.isComplete ? true : false}></input>
                <label htmlFor="checkbox">Campaign Complete</label>
            </fieldset> */}
            <div className="formButtonDiv">
                <button className="homeButton button" onClick={() => history.push("/")}>Return to Home</button>            
                <button className="formAddSave button" onClick={handleAddDebt}>Add</button>
            </div>
        </form>
        )
}