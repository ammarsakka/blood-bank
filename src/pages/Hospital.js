import React, { useState, useMemo } from 'react'
import { Header } from '../contents/header/Header'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AddNewHospital } from '../contents/popup/AddNewHospital';
import axios from 'axios';
import URL_API from '../contents/api/URL';
import { EditHospital } from '../contents/popup/EditHospital';
import { Delete } from '../contents/popup/Delete';


export const Hospital = ({ user }) => {
  const [isAdd, setAdd] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [isDelete, setDelete] = useState(false)
  const [isId, setId] = useState("")
  const [hospital, setHospital] = useState([])

  const handlehospital = () => {
    axios.post(URL_API + '/hospital/get').then((result) => {
      setHospital(result.data)
    })
  }

  const handleEdit = (id) => {
    setId(id)
    setEdit(true)
  }

  const handleDelete = (id) => {
    setId(id)
    setDelete(true)
  }

  useMemo(handlehospital, [user])

  return (
    <div>
      <Header user={user} />
      <div className='p-4'>
        <Button onClick={() => { setAdd(true) }}>add new</Button>
        <DataGrid
          columns={[
            { field: 'id', headerName: 'ID', flex: 0 },
            { field: 'name', headerName: 'Name', flex: .5 },
            { field: 'phone', headerName: 'Phone Number', flex: .5 },
            { field: 'email', headerName: 'Email', flex: 1 },
            { field: 'location', headerName: 'Location', flex: 0.5 },
            {
              field: 'action', headerName: '', renderCell: ({ id }) => {
                return (
                  <>
                    <Button onClick={() => { handleEdit(id) }}>edit</Button>
                    <Button onClick={() => { handleDelete(id) }}>Delete</Button>
                  </>
                )
              }
            }
          ]}
          rows={hospital}
          sx={{ width: '100%', height: '100%', minHeight: '70vh' }}
        />
      </div>
      <AddNewHospital isOpen={isAdd} setOpen={setAdd} reload={handlehospital}
      />
      <EditHospital isOpen={isEdit} setOpen={setEdit} reload={handlehospital} hospital={isId} />
      <Delete isOpen={isDelete} setOpen={setDelete} reload={handlehospital} id={isId} url='/hospital/delete' />
    </div>
  )
}
