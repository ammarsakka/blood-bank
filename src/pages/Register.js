import React from 'react'
import { Header } from '../contents/header/Header'
import { RegisterForm } from '../contents/forms/RegisterForm'

export const Register = ({ user, setUser }) => {
  return (
    <div className='min-h-screen'>
      <Header user={user} />
      <RegisterForm setUser={setUser} />
    </div>
  )
}
