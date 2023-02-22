import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import URL_API from '../api/URL'
import { useNavigate } from 'react-router-dom'

export const SigninForm = ({ setUser }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = () => {
    setError('')
    if (username && pass) {
      axios.post(
        `${URL_API}/signin`,
        {
          username,
          pass
        }).then(res => {
          if (res.data.length !== 0) {
            setUser(res.data)
            navigate ('/')
          } else {
            setError('username or password are incorrect')
          }
        })
    } else {
      setError('Incomplete Info')
    }
  }

  return (
    <div className='max-w-xl bg-white shadow p-4 rounded mx-auto my-4'>
      <div className='flex flex-col gap-4'>
        <Typography>Sign in</Typography>
        {
          error &&
          <p className='p-4 w-full text-center bg-red-500 rounded text-white'>{error}</p>
        }
        <TextField label='Username'
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <TextField label='Password'
          onChange={e => setPass(e.target.value)}
          value={pass}
          type='password'
        />
        <Button variant='contained' size='large' onClick={handleSubmit}>
          Sign in
        </Button>
      </div>
    </div>
  )
}
