import React from "react"
import { Route } from "react-router-dom"
import { DebtForm } from "./components/debt/DebtForm"
import { UserList } from "./components/user/UserList"
import { DebtProvider } from "./components/debt/DebtProvider"
import { UserProvider } from "./components/user/UserProvider"
import { Home } from "./Home"
import { AddDebt } from "./components/debt/AddDebt"
import { TransactionDetail } from "./components/transactions/TransactionDetail"
import { TransactionProvider } from "./components/transactions/TransactionProvider"
import { UserDetail } from "./components/user/UserDetail"


export const ApplicationViews = () => {
    return (
        <>
    <TransactionProvider>
            <UserProvider>
                <DebtProvider>

                    <Route exact path="/">
                        <Home />
                    </Route>
                    
                </DebtProvider>
            </UserProvider>
    </TransactionProvider> 
            
        {/* ##### Debt ##### */}

    <TransactionProvider>
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
    </TransactionProvider>
        
        {/* ##### Users ##### */}
    <TransactionProvider>
            <UserProvider>
                <DebtProvider>

                    <Route exact path="/users/detail/:userId(\d+)">
                        <UserDetail />
                    </Route>

                    <Route exact path="/">
                        <UserList /> 
                    </Route>
                    
                </DebtProvider>
            </UserProvider>
    </TransactionProvider>

        {/* ##### Transactions ##### */}

        <TransactionProvider>
            <UserProvider>
                <DebtProvider>

                    <Route path="/transaction/detail">
                        <TransactionDetail /> 
                    </Route> 
                    
                </DebtProvider>
            </UserProvider>
    </TransactionProvider>
            
        </>
    )
}