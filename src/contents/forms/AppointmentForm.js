import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import URL_API from '../api/URL'
import { useNavigate } from 'react-router-dom'

const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
]

export const AppointmentForm = ({ user }) => {
    const navigate = useNavigate()
    const [hospitals, setHospitals] = useState([])

    const [hospital, setHospital] = useState('')
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [bloodType, setBloodType] = useState('')

    const [error, setError] = useState('')

    const handleHospitals = useCallback(() => {
        axios.post(`${URL_API}/hospital/get`).then((result) => {
            setHospitals(result.data)
        })
    }, [])

    useEffect(handleHospitals, [handleHospitals])

    const handleSubmit = (e) => {
        e.preventDefault()

        setError('')

        if (user.length) {
            if (hospital && date && gender && age && weight && bloodType) {
                axios.post(`${URL_API}/appointment/set`, { hospital, date, user, gender, age, weight, bloodType, note }).then((result) => {
                    if (result.data.status === 200) {
                        setHospital('')
                        setDate('')

                    }
                    else
                        setError(result.data.message)
                })
            } else
                setError('All fields are required')
        }
        else
            navigate('/signin')
    }

    return (
        <div className='w-full p-4 max-w-xl mx-auto m-4 shadow rounded'>
            <h1 className='capitalize text-xl font-semibold tracking-wider'>Make an appointment</h1>
            <Divider className='!my-2' />
            <form className='w-full grid gap-4 mt-4' onSubmit={handleSubmit}>
                {
                    error && <div className='bg-red-500 p-3 rounded'><p className='text-white tracking-wider font-semibold text-center'>{error}</p></div>
                }
                <div className='flex items-center gap-4'>
                    <FormControl fullWidth>
                        <InputLabel id="gander-select-label">Gender</InputLabel>
                        <Select
                            labelId="gander-select-label"
                            id="gander-select"
                            value={gender}
                            label="Gender"
                            onChange={e => setGender(e.target.value)}
                        >
                            <MenuItem value={'male'}>{'Male'}</MenuItem>
                            <MenuItem value={'female'}>{'Female'}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label='Age' type={'number'} fullWidth value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className='flex items-center gap-4'>
                    <TextField label='Weight (kg)' type={'number'} fullWidth value={weight} onChange={e => setWeight(e.target.value)} />
                    <FormControl fullWidth>
                        <InputLabel id="blood-type-select-label">Blood Type</InputLabel>
                        <Select
                            labelId="blood-type-select-label"
                            id="blood-type-select"
                            value={bloodType}
                            label="Blood Type"
                            onChange={e => setBloodType(e.target.value)}
                        >
                            {
                                bloodGroups.map((item, index) => (
                                    <MenuItem value={item} key={index}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Hospital</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={hospital}
                        label="Hospital"
                        onChange={e => setHospital(e.target.value)}
                    >
                        {
                            hospitals &&
                            hospitals.map((hospital, index) => (
                                <MenuItem value={hospital.id} key={index}>{hospital.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <div className='flex items-center gap-4'>
                    <TextField label='Date' type={'date'} InputLabelProps={{ shrink: true }} fullWidth value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <TextField label='Note' fullWidth value={note} onChange={e => setNote(e.target.value)} multiline rows={7} />
                <div className='w-full mt-2 flex items-center justify-end'>
                    <Button variant='contained' onClick={handleSubmit}>submit</Button>
                </div>
            </form>
        </div>
    )
}
