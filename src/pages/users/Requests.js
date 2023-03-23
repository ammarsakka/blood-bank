import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import URL_API from '../../contents/api/URL'
import { Header } from '../../contents/header/Header'
import moment from 'moment'

export const UserRequests = ({ user }) => {
    const [requests, setRequests] = useState([])

    const handleRequests = useCallback(() => {
        axios.post(`${URL_API}/requests/get/user`, { user }).then((result) => {
            setRequests(result.data)
        })
    }, [])

    useEffect(handleRequests, [handleRequests])

    return (
        <div>
            <Header user={user} />
            <div className='p-4'>
                <Link to={'/request'}><Button>add new</Button></Link>
                <DataGrid
                    columns={[
                        { field: 'id', headerName: 'ID', flex: 0 },
                        { field: 'blood_type', headerName: 'Blood Type', flex: 1 },
                        { field: 'name', headerName: 'Hospital Name', flex: 1 },
                        { field: 'date_request', headerName: 'Date', flex: 1, renderCell: (e) => moment(e.formattedValue).format('MMM DD, Y') },
                        { field: 'status', headerName: 'Status', flex: 1, renderCell: (e) => <div className={`${e.formattedValue === 'approved' ? 'text-green-500 border-green-500' : 'text-orange-500 border-orange-500'} border-2 rounded-full py-1 px-4 font-semibold tracking-wider capitalize`}>{e.formattedValue}</div> },
                    ]}
                    rows={requests}
                    sx={{ width: '100%', height: '100%', minHeight: '70vh' }}
                />
            </div>
        </div>
    )
}
