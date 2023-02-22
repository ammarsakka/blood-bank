import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import URL_API from '../api/URL'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = () => {
    setError('')
    if (fullname && username && email && phone && pass) {
      axios.post(
        `${URL_API}/register`,
        {
          fullname,
          username,
          email,
          phone,
          pass
        }).then(res => {
          if(res.data.status===200){
            console.log(res.data)
navigate('/signin')
          }else (
            setError(res.data.message)
          )
        })
    } else {
      setError('Incomplete Info')
    }
  }

  return (
    <div className='max-w-xl bg-white shadow p-4 rounded mx-auto my-4'>
      <div className='flex flex-col gap-4'>
        <Typography>Sign up</Typography>
        {
          error &&
          <p className='p-4 w-full text-center bg-red-500 rounded text-white'>{error}</p>
        }
        <TextField label='Full Name'
          onChange={e => setFullname(e.target.value)}
          value={fullname}
        />
        <TextField label='Username'
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <TextField label='Email Address'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <TextField label='Phone Number'
          onChange={e => setPhone(e.target.value)}
          value={phone}
        />
        <TextField label='Password'
          onChange={e => setPass(e.target.value)}
          value={pass}
          type='password'
        />
        <Button variant='contained' size='large' onClick={handleSubmit}>
          Sign up
        </Button>
      </div>
    </div>
  )
}
