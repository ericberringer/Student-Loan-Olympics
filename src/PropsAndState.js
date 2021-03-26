import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { DebtContext } from "./components/debt/DebtProvider"
import { authApi, userStorageKey, userStorageName } from "./components/auth/authSettings"
import "./PropsAndState.css"



export const PropsAndState = ({user, debt, transaction}) => {

    const { deleteDebt } = useContext(DebtContext)
    const history = useHistory()

    const EditDebtButton = () => <button className="editDebtButton" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button> 
    
    const handleDelete = () => {
        deleteDebt(debt.id)
            .then(() => {
                history.push("/")
            })
    }


    const LogOut = () => {
        if (window.confirm("Logout?")) {
          sessionStorage.setItem(userStorageKey, "")
          history.push("/login")
        }
      }

      
      const ContributeButton = () => <button className="makeContributionButton" onClick={() => {history.push(`/transaction/detail`)}}>Make a Contribution</button>
      
      return (
          <>
        {
        // ######## Competitor Profile ########
            user.competitor ?
            
            <section className="header">
                <div>
                    <h3>Welcome to the Student Loan Olympics</h3>
                    <button className="logoutButton" onClick={LogOut}>Log Out</button>
                    <h3>{user.name}</h3>
                </div>
                {!debt ? <button onClick={() => history.push(`/debt/create`)}>Create a Debt</button> : <h3>Your Current Debt is: ${debt.amount - transaction}</h3> }
                {debt ? <button onClick={handleDelete} className="deleteDebtButton">Delete Debt</button> : <div></div> }
                <div>
                {debt ? <EditDebtButton/> : <div></div> }
                </div>   
            </section>
        
        : 
        // ######## Contributor Profile ########
        
        <section className="header">
            <div>
                <h3>Welcome to the Student Loan Olympics</h3>
                <button className="logoutButton" onClick={LogOut}>Log Out</button>
                <h3>{user.name}</h3>
            </div>
            <div>
                {<ContributeButton/>}
            </div>
        </section>
        }
        </>
    )
}