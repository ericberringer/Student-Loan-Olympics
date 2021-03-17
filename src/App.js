import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./components/auth/Login"

export const App = () => (
  <>
    <Route 
      render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
              <>
                <ApplicationViews />
              </>
            )
          } else {
            return <Redirect to="/login" />;
          }
        }} 
    />
        
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
