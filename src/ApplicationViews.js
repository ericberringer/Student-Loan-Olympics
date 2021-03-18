import React from "react"
import { Route } from "react-router-dom"
import { DebtProvider } from "./components/debt/DebtProvider"
import { UserList } from "./components/user/UserList"
import { UserProvider } from "./components/user/UserProvider"
import { Home } from "./Home"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

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