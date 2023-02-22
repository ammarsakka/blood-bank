import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import URL_API from '../api/URL'
import { Module } from '../modules/Module'

export const AddNewHospital = ({ isOpen, setOpen, reload }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  const submit = () => {
    if (name && phone && email && location) {
      axios.post(
        `${URL_API}/hospital/add`,
        {
          name, phone, email, location
        }
      ).then((result) => {
        reload()
        setOpen(false)
      })
    }
  }

  return (
    <Module isOpen={isOpen} setOpen={setOpen} submit={submit}>
      <div className='flex flex-col gap-4 w-full'>
        <TextField label='Name' onChange={(e) => { setName(e.target.value) }} value={name} />
        <TextField label='Phone Number' onChange={(e) => { setPhone(e.target.value) }} value={phone} />
        <TextField label='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <TextField label='Location' onChange={(e) => { setLocation(e.target.value) }} value={location} />
      </div>
    </Module>
  )
}
