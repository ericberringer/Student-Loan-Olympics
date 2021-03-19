import React, { useContext, useEffect, useState } from "react"
import "./Debt.css"
import { useHistory } from 'react-router-dom'
import { DebtContext } from "./DebtProvider"
import { UserContext } from "../user/UserProvider"

export const DebtForm = () => {

    const { addDebt } = useContext(DebtContext)
    const { getUsers } = useContext(UserContext)

    const history = useHistory()
    
    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [debt, setDebt] = useState({
        userId: currentUser,
        amount: "",
        description: "",
        isComplete: false
    })


    useEffect(() => {
        getUsers()
    }, [])

    const handleInputChange = (event) => {
        const newDebt = { ...debt }
        newDebt[event.target.id] = event.target.value
        setDebt(newDebt)
    }

    const handleSaveDebt = (event) => {
        event.preventDefault()
        if(debt.amount === "" || debt.description === "") {
            window.alert("Amount and description fields must be complete.")
        } else {
            addDebt({
                userId: currentUser,
                amount: parseInt(debt.amount),
                description: debt.description,
                isComplete: debt.isComplete
            })
            .then(() => history.push("/"))
        }
    }


    return (
        <form className="debtForm">
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
            <button onClick={handleSaveDebt}>
                Save
            </button>
        </form>
    )
}

