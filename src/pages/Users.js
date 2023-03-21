import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import URL_API from '../contents/api/URL'
import { Header } from '../contents/header/Header'
import { AddNewUser } from '../contents/popup/AddNewUser'
import { Delete } from '../contents/popup/Delete'
import { EditUser } from '../contents/popup/EditUser'

export const Users = ({ user }) => {
    const [users, setUsers] = useState([])
    const [isAdd, setAdd] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [isId, setId] = useState("")

    const handleEdit = (id) => {
        setId(id)
        setEdit(true)
    }

    const handleDelete = (id) => {
        setId(id)
        setDelete(true)
    }

    const handleUsers = useCallback(() => {
        axios.post(URL_API + '/users/get', { user }).then((result) => {
            setUsers(result.data)
        })
    }, [user])

    useEffect(handleUsers, [handleUsers])

    const reload = () => {
        handleUsers()
    }

    return (
        <div>
            <Header user={user} />
            <div className='p-4'>
                <Button onClick={() => { setAdd(true) }}>add new</Button>
                <DataGrid
                    columns={[
                        { field: 'id', headerName: 'ID', flex: 0 },
                        { field: 'full_name', headerName: 'Name', flex: 1 },
                        { field: 'phone_number', headerName: 'Phone Number', flex: 1 },
                        { field: 'email', headerName: 'Email', flex: 1 },
                        { field: 'role', headerName: 'Role', flex: 1 },
                        { field: 'status', headerName: 'Status', flex: 1, renderCell: (e) => <div className={`${e.formattedValue === 'active' ? 'text-green-500 border-green-500' : 'text-orange-500 border-orange-500'} border-2 rounded-full py-1 px-4 font-semibold tracking-wider capitalize`}>{e.formattedValue}</div> },
                        {
                            field: 'action', headerName: '', flex: 1, renderCell: ({ id }) => {
                                return (
                                    <>
                                        <Button onClick={() => { handleEdit(id) }}>edit</Button>
                                        <Button onClick={() => { handleDelete(id) }}>Delete</Button>
                                    </>
                                )
                            }
                        }
                    ]}
                    rows={users}
                    sx={{ width: '100%', height: '100%', minHeight: '70vh' }}
                />
                <AddNewUser isOpen={isAdd} setOpen={setAdd} reload={reload} />
                <EditUser isOpen={isEdit} setOpen={setEdit} reload={reload} id={isId} />
                <Delete isOpen={isDelete} setOpen={setDelete} reload={reload} id={isId} url='/users/delete' />
            </div>
        </div>
    )
}
