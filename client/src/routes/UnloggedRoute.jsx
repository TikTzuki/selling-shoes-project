
import React from 'react'
import { BrowserRouter, Route, Switch as SwitchRoute} from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'


const UnloggedRoute = (props) => {
    return (
        <BrowserRouter>
        <SwitchRoute>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/sign-up" component={SignupPage}/>
          <Route component={LoginPage}/>
        </SwitchRoute>
      </BrowserRouter>
    )
}

export default UnloggedRoute
