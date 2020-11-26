import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from './ultils/themes/ThemeProvider'
import LoggedRoute from './routes/LoggedRoute'
import UnloggedRoute from './routes/UnloggedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogin } from './actions/user'
import api from './ultils/api'


export default function App (){
  const currentUser = useSelector(state => state.user);

  //componentDidMount
  useEffect(() => {   

  }, [])

  //componentDidUpdate
  useEffect(() => {
    console.log('App update')
  }, [currentUser])

  return currentUser!==null ? 
  <LoggedRoute/>:
  <UnloggedRoute/>
}