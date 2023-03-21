import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL_API from '../api/URL'
import { Module } from '../modules/Module'

export const AddNewUser = ({ isOpen, setOpen, reload }) => {
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')

    const [error, setError] = useState('')

    const submit = () => {
        setError('')
        if (fullname && username && email && phone && pass) {
            axios.post(
                `${URL_API}/users/add`,
                {
                    fullname,
                    username,
                    email,
                    phone,
                    pass
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
        setFullname('')
        setUsername('')
        setEmail('')
        setPhone('')
        setPass('')
    }, [isOpen])

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
            </form>
        </Module>
    )
}
