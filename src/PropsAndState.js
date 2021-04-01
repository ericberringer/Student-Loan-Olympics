import React from "react"
import { useHistory } from "react-router-dom"
import { userStorageKey } from "./components/auth/authSettings"
import "./PropsAndState.css"


// handles current user's name, debt amount, edit, and log out buttons
export const PropsAndState = ({user, debt, transaction}) => {
    
    const history = useHistory()

    // ########## Youtube Tutorial ##########
    // const [fileInputState, setFileInputState] = useState("")
    // const [selectedFile, setSelectedFile] = useState("")
    // const [previewSource, setPreviewSource] = useState("")
    

    // const handleFileInputChange = (e) => {
    //     const file = e.target.files[0]
    //     previewFile(file)
    // }

    // const previewFile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }    

    // const handleSubmitFile = (e) => {
    //     console.log("submitting")
    //     e.preventDefault()
    //     if(!previewSource) return
    //     uploadImage(previewSource)
    // }

    // const uploadImage = async (base64EncodedImage) => {
    //     console.log(base64EncodedImage)
    //     try {
    //         await fetch('/api/upload', {
    //             method: 'POST',
    //             body: JSON.stringify({data: base64EncodedImage}),
    //             headers: {'Content-type': 'application/json'}
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    // ####################################################
    
    // presents a confirmation window and logs out user when 'ok' is selected. This sets the id in session storage to an empty string 
    
    const LogOut = () => {
        if (window.confirm("Logout?")) {
            sessionStorage.setItem(userStorageKey, "")
            history.push("/login")
        }
    }
    
    // takes the logged in user to a form to edit their total debt amount. Sends the users id in the url
    const EditDebtButton = () => <button className="editDebtButton button" onClick={() => {history.push(`/debt/edit/${debt.id}`)}}>Edit Debt Amount</button> 
    // Takes a contributor to a contribution form
    const ContributeButton = () => <button className="contributorButton button" onClick={() => {history.push(`/transaction/detail`)}}>Make a Contribution</button>

    const ProgressBar = () => {
        const value = transaction/debt.amount * 100
        const max = debt.amount
        const fixedNumber = value.toFixed(2)
        const progress = debt.amount - transaction
        return (
            <div className="progressBarDiv">
                <label htmlFor="debtProgress">Campaign Progress: </label>
                <h3>{fixedNumber}%</h3>
                <div>
                {0}
                <progress id="debtProgress" value={progress} max={max}/>
                {debt.amount}
                </div>
            </div>
        )
    }
      
      return (
          <>
            <div className="logoDiv">
                <img className="logo" src="../SLO-Logo.png" alt="SLO-Logo" width="460"/>
            </div>
        {
        // ######## Competitor Profile ########
            user.competitor ?
            // if the user is a competitor
            <section className="header">
               
                {/* Youtube Tutorial */}
                    {/* <div>
                    <form onSubmit={handleSubmitFile}>
                        <fieldset>
                            <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="imageUpload"></input>
                            <button type="submit" className="imageSubmitButton">Submit</button>
                        </fieldset>
                        {previewSource && (
                            <img src={previewSource} alt="chosen" style={{height: "100px"}}/>
                        )}
                    </form>
                </div> */}
                
                {/* Tutorial End */}
                
                <div className="nameDiv">
                    {/* print their name */}
                    <h2>Welcome {user.name}!</h2>
                {/* if the user does not have a debt amount yet, print a button that takes the user to a create a debt form
                if the user does have a debt print their debt amount and subtract each new transaction from that amount */}
                    {debt ? <h3 className="debtText">Starting Debt: ${debt.amount}</h3> : <div></div>}
                    {!debt ? <button className="button" onClick={() => history.push(`/debt/create`)}>Create a Debt</button> : <h3 className="debtText">Your Current Debt is: ${debt.amount - transaction}</h3> }
                </div>
                <div className="headerButtonDiv">
                    {debt ? ProgressBar() : null}
                    {/* if the user has a debt print an edit debt button */}
                    {debt ? <EditDebtButton/> : <div></div> }
                    {/* Logout Buttons */}
                    {!debt ?  
                    <div className="noDebtLogoutButtonDiv">
                        <button className="competitorLogout button" onClick={LogOut}>Log Out</button>
                    </div>
                    :
                    <button className="competitorLogout button" onClick={LogOut}>Log Out</button>
                    }
                </div>   
            </section>
        
        : 
        // ######## Contributor Profile ########
        
        // if the user is a contributor print their name and a contribute button
        <section className="header">
            <div>
                <h2>Welcome {user.name}!</h2>
            </div>
            <div className="headerButtonDiv">
                <h3>Feeling Generous?</h3>
                {<ContributeButton/>}
                <button className="contributorButton contributorLogout button" onClick={LogOut}>Log Out</button>
            </div>
        </section>
        }
        </>
    )
}