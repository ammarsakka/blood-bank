import React from 'react'
import { Button, Divider } from '@mui/material'
import axios from 'axios'
import URL_API from '../api/URL'

export const Delete = ({ isOpen, setOpen, reload, id, url }) => {
  const Submit = () => {
    axios.post(`${URL_API}${url}`, { id })
      .then((result) => { reload()
      setOpen(false) })
  }
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/20 z-50 justify-center items-center ${isOpen ? 'flex' : 'hidden'} backdrop-blur-sm`}>
      <div className='bg-gray-100 p-4 rounded w-full max-w-xl'>

        <div className='mt-4 mb-2'>
          <p className='text-center text-2xl font-bold'>
            Are You Sure You Want To Delete This Record ?
          </p>
        </div>
        <div className='flex items-center justify-end gap-4 mb-4'>
          <Button variant='contained' color='error' onClick={() => {
            Submit()
          }} className='w-full'>
            Delete
          </Button>
          <Button variant='contained' color='inherit' className='w-full' onClick={() => { setOpen(false) }}>
            close
          </Button>
        </div>
      </div>
    </div>
  )
}
