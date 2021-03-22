import React from "react"
import { Route } from "react-router-dom"
import { DebtForm } from "./components/debt/DebtForm"
// import { UserForm } from "./components/user/UserForm"
import { UserList } from "./components/user/UserList"
import { DebtProvider } from "./components/debt/DebtProvider"
import { UserProvider } from "./components/user/UserProvider"
import { Home } from "./Home"
import { AddDebt } from "./components/debt/AddDebt"


export const ApplicationViews = () => {
    return (
        <>
            <UserProvider>
                <DebtProvider>

                    <Route exact path="/">
                        <Home />
                    </Route>
                    
                </DebtProvider>
            </UserProvider>
            
        {/* ##### Debt ##### */}

            <UserProvider>
                <DebtProvider>
                    
                    <Route path="/debt/edit/:debtId(\d+)">
                        <DebtForm /> 
                    </Route>

                    <Route path="/debt/create">
                        <AddDebt />
                    </Route>

                </DebtProvider>
            </UserProvider>
        
        {/* ##### Users ##### */}

            <UserProvider>
                <DebtProvider>

                    {/* <Route>
                        <UserForm />
                    </Route> */}
                    
                    <Route exact path="/">
                        <UserList /> 
                    </Route>
                    
                </DebtProvider>
            </UserProvider>
            
        </>
    )
}