import { TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import URL_API from '../api/URL'
import { Module } from '../modules/Module'

export const Changepassword = ({ isOpen, setOpen }) => {
  const [current, setcurrent] = useState('')
  const [passcode, setpasscode] = useState('')
  const [confirm, setconfirm] = useState('')

  const [error, setError] = useState('')

  const user = window.localStorage.getItem('user')

  const submit = () => {
    setError('')
    if (current && passcode && confirm) {
      if (passcode.match(confirm)) {
        axios.post(
          `${URL_API}/user/password`,
          { current, passcode, user: JSON.parse(user) }
        ).then (
          (result) => {
            if(result.data.status===200){
                setOpen(false)
            } 
            else{
              setError(result.data.message)
            }
          }
        )
      }
      else { setError("Password Doesn't Match ") }
    } else {
      setError('Incomplete Info')
    }
  }


  return (
    <Module setOpen={setOpen} isOpen={isOpen} submit={submit} error={error} >
      <div className='w-full flex flex-col gap-4'>
        <TextField className='w-full' label='Current Password' type={'password'} onChange={(e) => { setcurrent(e.target.value) }} />
        <TextField className='w-full' label='New Password' type={'password'} onChange={(e) => { setpasscode(e.target.value) }} />
        <TextField className='w-full' label='Re-Enter New Password ' type={'password'} onChange={(e) => { setconfirm(e.target.value) }} />
      </div>
    </Module>
  )
}
