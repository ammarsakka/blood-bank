import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Signout = ({ user, setUser }) => {
  window.localStorage.removeItem('user')
  setUser(null)
  const navigate = useNavigate()
  navigate('/')
  return (
    <div>
      Signout
    </div>
  )
}
