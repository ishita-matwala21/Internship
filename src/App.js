import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import OpportunitiesComponent from './Components/OpportunitiesComponent'
import Navbar from './Components/Navbar'
export default function App() {
  return (
    <>
        <BrowserRouter>
        <Navbar/>
          <Routes>
          <Route path='/' element={<OpportunitiesComponent/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}
