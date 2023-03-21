import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useMemo, useState } from 'react'
import URL_API from '../api/URL'
import { Module } from '../modules/Module'

export const EditHospital = ({ isOpen, setOpen, reload, hospital }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [hospitalinfo, setHospitalinfo] = useState([])

  const handlehospital = () => {
    axios.post(
      `${URL_API}/hospital/edit`, { hospital }

    )
      .then((info) => {
        setHospitalinfo(info.data)
      })

  }
  useMemo(handlehospital, [hospital])
  useMemo(() => {
    setName(hospitalinfo[0]?.name)
    setPhone(hospitalinfo[0]?.phone)
    setEmail(hospitalinfo[0]?.email)
    setLocation(hospitalinfo[0]?.location)
  }, [hospitalinfo])
  const submit = () => {
    if (name && phone && email && location) {
      axios.post(
        `${URL_API}/hospital/update`,
        {
          name, phone, email, location, hospital
        }
      ).then((result) => {
        reload()
        setOpen(false)
      })
    }
  }
  return (
    <Module isOpen={isOpen} setOpen={setOpen} submit={submit}>
      <form className='flex flex-col gap-4 w-full'>
        <TextField label='Name' onChange={(e) => { setName(e.target.value) }} value={name} />
        <TextField label='Phone Number' onChange={(e) => { setPhone(e.target.value) }} value={phone} type='tel' />
        <TextField label='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} type='email' />
        <TextField label='Location' onChange={(e) => { setLocation(e.target.value) }} value={location} />
      </form>
    </Module>
  )
}
