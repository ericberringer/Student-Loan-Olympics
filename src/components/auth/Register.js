import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { authApi, userStorageKey } from "./authSettings"
import "./Login.css"

export const Register = () => {

    const [registerUser, setRegisterUser] = useState({ name: "", email: "", image: "", competitor: true })
    const [conflictDialog, setConflictDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        // event.preventDefault()
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        setRegisterUser(newUser)
    }
    
    // ############ handleAccountSelect needs help ###############
    
    const handleAccountSelect = (event) => {
        console.log(event.target.value)
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        // event.preventDefault()
        if(event.target.value === "1") {
            newUser.competitor = true
        } else {
            newUser.competitor = false
        }
        setRegisterUser(newUser)
    }

    const existingUserCheck = () => {
        
        return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${registerUser.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: registerUser.email,
                            name: registerUser.name,
                            competitor: registerUser.competitor,
                            image: registerUser.image
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem(userStorageKey, createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    setConflictDialog(true)
                }
            })

    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for The Student Loan Olympics</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Full Name" required autoFocus value={registerUser.name} onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="competitor">Select Account Type </label>
                    <select name="competitor" id="competitor" value={registerUser.competitor === true ? "1" : "2"} onChange={handleAccountSelect}>
                        <option value="0">Select</option>
                        <option id="1" value="1" required onChange={handleInputChange}>Competitor</option>
                        <option id="2" value="2" required onChange={handleInputChange}>Contributor</option>
                    </select>
                </fieldset>
                <fieldset>
                    <h3>Image upload needs to go here</h3>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

