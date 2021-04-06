import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DebtContext } from "../debt/DebtProvider"
import { TransactionContext } from "../transactions/TransactionProvider"
import { UserContext } from "./UserProvider"
import "./User.css"

// In charge of handling the user's detail info when a user is clicked on the home page.
export const UserDetail = () => {

    const { users, getUsers, getSelectedUserById } = useContext(UserContext)
    const { transactions, getTransactions } = useContext(TransactionContext)
    const { debts, getDebts, deleteDebt } = useContext(DebtContext)

    const [user, setUser] = useState({})

    const {userId} = useParams()
    
    const history = useHistory()
    
    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    // useEffect runs once after initial render
    useEffect(() => {
        getSelectedUserById(userId)
        .then((res) => {
            setUser(res)
        })
        .then(getDebts)
        .then(getUsers)
        .then(getTransactions)
    }, [])
    
    // finds the debt associated with the selected user and deletes it
    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this debt?")) {
            const userDebt = debts.find(debt => debt.userId === parseInt(userId))
            deleteDebt(userDebt.id)
            .then(() => {
                history.push("/")
            })
        }
    }

    const competitor = user?.competitor === true

        let filteredTransactions = []
        if(competitor) {
            // If a user is a competitor filter through the transactions and return the transaction whose debtId matches the id of the debt object
            filteredTransactions = transactions?.filter(t => {
                return t.debtId === user?.debts[0]?.id
            })
        } else {
            // If the user is a contributor filter through transactions and return the transaction whose userId matches the id of the user object
            filteredTransactions = transactions.filter(t => {
                return t.userId === user.id
            })
        }

        const Progress = () => {
            // console.log(user.debts[0].amount)
            const userTotalDebt = user?.debts[0].amount
            const amounts = filteredTransactions.map(t => t.amount)
            let sum = 0
            for(var i = 0; i < amounts.length; i++) {
                sum += amounts[i]
            }
            const value = sum/userTotalDebt * 100
            const max = userTotalDebt
            const fixedNumber = value.toFixed(2)
            const progress = userTotalDebt - sum
            return (
                <div className="progressBarDiv">
                    <label htmlFor="debtProgress">Campaign Progress: </label>
                    <h3>{fixedNumber}%</h3>
                    <div>
                    {0}
                    <progress id="debtProgress" value={progress} max={max}/>
                    {userTotalDebt}
                    </div>
                </div>
            )
        }

        const TotalContributions = () => {
            const amounts = filteredTransactions.map(t => t.amount)
            let totalCont = 0
            for(var i = 0; i < amounts.length; i++){
                totalCont += amounts[i]
            }
            return totalCont
        }


        // ############## FORM #################

        const [math, setMath] = useState({
            grossIncome: 0,
            totalGiving: 0,
            answer: 0
        })
        // console.log(sum)
        
        
        const handleInputChange = (event) => {
            event.preventDefault()
            const newAnswer = { ...math }
            newAnswer[event.target.id] = parseInt(event.target.value)
            let estGrossIncome = parseInt(event.target.value)
            let totalCont = parseInt(event.target.value)
            setMath(newAnswer)
        }
    
        const handleMath = (event) => {
            event?.preventDefault()
            let gross = math.grossIncome
            let totalCont = math.totalGiving
            let answer = totalCont/gross * 100
            const newAnswer = { ...math }
            newAnswer.answer = answer.toFixed(2)
            setMath(newAnswer)
            console.log(newAnswer)
        }


    return (
        <>
        {
                            // ##### Competitor Detail #####
        competitor ?
            <section className="detailSection">
            <div className="detailHeader">
                <h3 className="detailName">{user.name}</h3>
                <h4>Competitor</h4> 
            </div>    
            <div className="detailDiv">
                <h3 className="descriptionAndHistory">Debt Description</h3> 
                <p>{user?.debts[0]?.description}</p>
                <h3>Starting Debt: ${user.debts[0]?.amount ? user.debts[0].amount : 0}</h3>
                {user?.debts[0].amount ? Progress() : null}
                <h3>Recent Transactions:</h3>
               {
                   // iterate over relevant transactions and find the user whose id matches the userId of the transaction made
                   filteredTransactions.map((t,i) => {
                       let transactionUser = users.find((user) => user.id === t.userId)
                       return <li className="amountList" key={i}>${t.amount} {transactionUser.name}</li>
                    })
                }
            {currentUser === parseInt(userId) ? <button onClick={handleDelete} className="deleteDebtButton">Delete Debt</button> : <div></div>}
            </div>
            <button className="homeButton button" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        :
                            // ##### Contributor Detail #####

        <section className="detailSection">
            <div className="detailHeader">
                <h3 className="detailName">{user.name}</h3>            
                <h4>Contributor</h4>
                <h4>Total Contributions: ${TotalContributions()}</h4>
            </div>
            <div className="detailDiv">
                <h3 className="descriptionAndHistory">Transaction History</h3>
                {
                    // iterate over the relevant transactions and find the debt whose id matches the userId of the filtered transactions.
                    // The name of the user on the debt can be accessed since the user object is embedded in the debt fetch.
                    filteredTransactions.map((t, i) => {
                        let debtUser = debts.find((debt) => debt.id === t.debtId)
                        return <li className="amountList" key={i}>${t.amount} {debtUser?.user.name}</li>
                    })     
                    
                }
            </div>
            {
            currentUser === parseInt(userId) ?
            <form className="taxForm">
                <h3 className="taxFormTitle">How Generous Are You?</h3>
                <input type="text" id="grossIncome" name="num1" placeholder="Estimated Gross Income" onChange={handleInputChange} required></input>
                <input className="amountInput" type="text" id="totalGiving" name="num2" placeholder="Total Contributions" onChange={handleInputChange} required></input>
                <button className="taxButton button" onClick={handleMath}>Calculate</button>
            </form>
        :
        null
        }
        {
            !math.answer || math.answer === "NaN" ? null : <h3 className="contPerc">You have contributed {math.answer}% of your estimated gross income.</h3>
        }
            <button className="homeButton button" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        }
        </>
    )

}