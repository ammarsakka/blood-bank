import React from 'react'
import { SigninForm } from '../contents/forms/Signin'
import { Header } from '../contents/header/Header'

export const Signin = ({ user, setUser }) => {
  return (
    <div>
      <Header user={user} />
      <SigninForm setUser={setUser} />
    </div>
  )
}
