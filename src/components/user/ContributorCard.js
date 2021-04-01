import React, { useState } from "react"
import "./User.css"
import { Link } from "react-router-dom"

export const ContributorCard = ({user, transaction})=> { 

    const [sum, setSum] = useState({
        grossIncome: 0,
        totalGiving: 0,
        answer: 0
    })
    
    
    const handleInputChange = (event) => {
        const newAnswer = { ...sum }
        newAnswer[event.target.id] = event.target.value
        setSum(newAnswer)
    }

    const handleMath = (event) => {
        event.preventDefault()
        const answer = parseInt(sum.grossIncome) - parseInt(sum.totalGiving)
        console.log(answer)
    }

return (

    <section className="userCard">
        <div className="userNameTransaction card">
            <h3 className="user__name">
            <Link to={`/users/detail/${user.id}`}>
            { user.name }
            </Link>
            </h3>
            <h4>Total Contribution: ${transaction}</h4>
        </div>


        {
            user.name === "Scott Silver" ?
            <form>
                {/* <label htmlFor="taxDropdown"></label>
                <select id="" name="taxDropdown">
                    <option value=".12">Tax Bracket 1</option>
                    <option value=".22">Tax Bracket 1</option>
                    <option value=".24">Tax Bracket 1</option>
                </select> */}
                <input type="text" id="grossIncome" name="num1" placeholder="Estimated Gross Income" onChange={handleInputChange}></input>
                <input type="text" id="totalGiving" name="num2" placeholder="Total Contributions" onChange={handleInputChange}></input>
            <button onClick={handleMath}>Calculate</button>

        </form>
        :
        null
        }
        

    </section>
        )
}