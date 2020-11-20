
import React from 'react'
import { BrowserRouter, Route, Switch as SwitchRoute} from 'react-router-dom'
import NotFound from '../pages/ErrorsPage/NotFound'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'

const UnloggedRoute = (props) => {
    return (
        <BrowserRouter>
        <SwitchRoute>
          <Route exact path="/" render={()=> <LoginPage multiTheme={props.multiTheme}/>}/>
          <Route exact path="/sign-up" render={ () => <SignUpPage/>}/>
          <Route component={NotFound}/>
        </SwitchRoute>
      </BrowserRouter>
    )
}

export default UnloggedRoute
