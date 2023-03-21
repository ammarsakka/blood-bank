import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL_API from '../api/URL'
import { Module } from '../modules/Module'

export const EditUser = ({ isOpen, setOpen, reload, id }) => {
    const [user, setUser] = useState([])

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [status, setStatus] = useState('')

    const [error, setError] = useState('')

    const handleUser = () => {
        axios.post(`${URL_API}/users/edit`, { id }).then((result) => {
            setUser(result.data)
        })
    }

    useEffect(handleUser, [isOpen])

    const submit = () => {
        setError('')
        if (fullname && username && email && phone && pass) {
            axios.post(
                `${URL_API}/users/update`,
                {
                    fullname,
                    username,
                    email,
                    phone,
                    pass,
                    status,
                    id
                }).then(res => {
                    if (res.data.status === 200) {
                        reload()
                        setOpen(false)
                    } else (
                        setError(res.data.message)
                    )
                })
        } else {
            setError('Incomplete Info')
        }
    }

    useEffect(() => {
        if (user.length) {
            setFullname(user[0]?.full_name)
            setUsername(user[0]?.username)
            setEmail(user[0]?.email)
            setPhone(user[0]?.phone_number)
            setPass(user[0]?.password)
            setStatus(user[0]?.status)
        }
    }, [isOpen, user])

    return (
        <Module isOpen={isOpen} setOpen={setOpen} submit={submit}>
            <form className='flex flex-col gap-4 w-full'>
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
                    value={email} type='email'
                />
                <TextField label='Phone Number'
                    onChange={e => setPhone(e.target.value)}
                    value={phone} type='tel'
                />
                <TextField label='Password'
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                    type='password'
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={e => setStatus(e.target.value)}
                    >
                        <MenuItem value={'active'}>Active</MenuItem>
                        <MenuItem value={'inactive'}>Inactive</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </Module>
    )
}
