import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Hospital } from './pages/Hospital'
import { Register } from './pages/Register'
import { Signin } from './pages/Signin'
import { Signout } from './pages/Signout'

export const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(window.localStorage.getItem('user'))
  })

  useEffect(() => {
    user?.length && window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/register' element={<Register user={user} setUser={setUser} />} />
        <Route path='/signin' element={<Signin user={user} setUser={setUser} />} />
        <Route path='/signout' element={<Signout user={user} setUser={setUser} />} />
        <Route path='/hospital' element={<Hospital user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

