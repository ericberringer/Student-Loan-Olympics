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
    // console.log(transactions)

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
            const userTotalDebt = user.debts[0].amount
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
            return <h4>Total Contributions: ${totalCont}</h4>
        }



    return (
        <>
        {
                            // ##### Competitor Detail #####
        competitor ?
            <section className="detailSection">
            <div className="detailHeader">
                <h3>{user.name}</h3>
                <h4>Competitor</h4> 
            </div>    
            <div className="detailDiv">
                <h3>Debt Description</h3> 
                <p>{user?.debts[0]?.description}</p>
                <h3>Starting Debt: ${user.debts[0]?.amount ? user.debts[0].amount : 0}</h3>
                {Progress()}
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
                <h3>{user.name}</h3>            
                <h4>Contributor</h4>
                {TotalContributions()}
            </div>
            <div className="detailDiv">
                <h3>Transaction History</h3>
                {
                // iterate over the relevant transactions and find the debt whose id matches the userId of the filtered transactions.
                // The name of the user on the debt can be accessed since the user object is embedded in the debt fetch.
                    filteredTransactions.map((t, i) => {
                       let debtUser = debts.find((debt) => debt.id === t.debtId)
                        return <li className="amountList" key={i}>${t.amount} {debtUser?.user.name}</li>
                    })     
    
                }
            </div>
            <button className="homeButton button" onClick={() => history.push("/")}>Return to Home</button>            
        </section>
        }
        </>
    )

}