import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import URL_API from '../../contents/api/URL'
import { Header } from '../../contents/header/Header'
import moment from 'moment'

export const AdminRequests = ({ user }) => {
    const [requests, setRequests] = useState([])

    const [select, setSelect] = useState([])

    const handleRequests = useCallback(() => {
        axios.post(`${URL_API}/requests/get/all`).then((result) => {
            setRequests(result.data)
        })
    }, [])

    useEffect(handleRequests, [handleRequests])

    const handleSubmit = () => {
        axios.post(`${URL_API}/requests/update`, { select }).then((result) => {
            handleRequests()
        })
    }

    return (
        <div>
            <Header user={user} />
            <div className='p-4'>
                <div className='flex items-center gap-4 mb-2'>
                    <Link to={'/request'}><Button>add new</Button></Link>
                    {select.length ? <Button variant='contained' color='success' onClick={handleSubmit}>approve</Button> : ''}
                </div>
                <DataGrid
                    columns={[
                        { field: 'id', headerName: 'ID', flex: 0 },
                        { field: 'full_name', headerName: 'User Name', flex: 1 },
                        { field: 'blood_type', headerName: 'Blood Type', flex: 1 },
                        { field: 'name', headerName: 'Hospital Name', flex: 1 },
                        { field: 'date_request', headerName: 'Date', flex: 1, renderCell: (e) => moment(e.formattedValue).format('MMM DD, Y') },
                        { field: 'status', headerName: 'Status', flex: 1, renderCell: (e) => <div className={`${e.formattedValue === 'approved' ? 'text-green-500 border-green-500' : 'text-orange-500 border-orange-500'} border-2 rounded-full py-1 px-4 font-semibold tracking-wider capitalize`}>{e.formattedValue}</div> },
                    ]}
                    checkboxSelection
                    onSelectionModelChange={e => {
                        setSelect(e)
                    }}
                    rows={requests}
                    sx={{ width: '100%', height: '100%', minHeight: '70vh' }}
                />
            </div>
        </div>
    )
}
