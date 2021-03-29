import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { userStorageKey } from "./components/auth/authSettings"
import "./PropsAndState.css"



export const PropsAndState = ({user, debt, transaction}) => {

    const history = useHistory()

    
    
    const LogOut = () => {
        if (window.confirm("Logout?")) {
            sessionStorage.setItem(userStorageKey, "")
            history.push("/login")
        }
    }
    
    
    const EditDebtButton = () => <button className="editDebtButton" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button> 
    const ContributeButton = () => <button className="makeContributionButton" onClick={() => {history.push(`/transaction/detail`)}}>Make a Contribution</button>
      
      return (
          <>
        {
        // ######## Competitor Profile ########
            user.competitor ?
            
            <section className="header">
                <div>
                    <h1>Welcome to the Student Loan Olympics</h1>
                    <h3>{user.name}</h3>
                </div>
                    {!debt ? <button onClick={() => history.push(`/debt/create`)}>Create a Debt</button> : <h3>Your Current Debt is: ${debt.amount - transaction}</h3> }
                <div className="headerButtonDiv">
                    {debt ? <EditDebtButton/> : <div></div> }
                    <button className="logoutButton" onClick={LogOut}>Log Out</button>
                </div>   
            </section>
        
        : 
        // ######## Contributor Profile ########
        
        <section className="header">
            <div>
                <h1>Welcome to the Student Loan Olympics</h1>
                <h3>{user.name}</h3>
            </div>
            <div className="headerButtonDiv">
                {<ContributeButton/>}
                <button className="logoutButton" onClick={LogOut}>Log Out</button>
            </div>
        </section>
        }
        </>
    )
}