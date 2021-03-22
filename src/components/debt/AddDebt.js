import React, { useContext, useEffect, useState } from "react"
import "./Debt.css"
import { useHistory } from 'react-router-dom'
import { DebtContext, DebtProvider } from "./DebtProvider"

export const AddDebt = () => {
    
    const { addDebt } = useContext(DebtContext)

    const history = useHistory()

    let registeredUser = parseInt(sessionStorage.getItem("app_user_id"))
    
    const [debt, setDebt] = useState({
        userId: registeredUser,
        amount: 0,
        description: "",
        isComplete: false
    })

    const handleInputChange = (event) => {
        const newDebt = { ...debt }
        newDebt[event.target.id] = event.target.value
        setDebt(newDebt)
    }

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
    
    return (
        <form className="debtForm">
            <h2 className="debtFormTitle">Debt Form</h2>
            <fieldset>
                <label htmlFor="debtAmount">Debt Amount: $</label>
                <input type="text" id="amount" name="debtAmount" required className="amountField" onChange={handleInputChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" required rows="1" cols="20" onChange={handleInputChange}></textarea>
            </fieldset>
            {/* <fieldset>
                <input type="checkbox" id="checkbox" name="checkbox" onChange={handleInputChange} value={debt.isComplete} defaultChecked={debt.isComplete ? true : false}></input>
                <label htmlFor="checkbox">Campaign Complete</label>
            </fieldset> */}
            <button onClick={handleAddDebt}>
                Add
            </button>
        </form>
        )
}