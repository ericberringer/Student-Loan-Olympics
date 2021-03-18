import React from "react"
import { Route } from "react-router-dom"
import { DebtForm } from "./components/debt/DebtForm"
import { UserList } from "./components/user/UserList"
import { DebtProvider } from "./components/debt/DebtProvider"
import { UserProvider } from "./components/user/UserProvider"
import { Home } from "./Home"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            
        {/* ##### Debt ##### */}

            <UserProvider>
                <DebtProvider>
                    
                    <Route exact path="/">
                        <DebtForm /> 
                    </Route>

                </DebtProvider>
            </UserProvider>
        
        {/* ##### Users ##### */}

            <UserProvider>
                <DebtProvider>
                    
                    <Route exact path="/">
                        <UserList /> 
                    </Route>
                    
                </DebtProvider>
            </UserProvider>
            
        </>
    )
}