import { Button, Divider } from '@mui/material'
import React from 'react'

export const Module = (props) => {
  const handleSubmit = () => {
    props.submit()
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/20 z-50 justify-center items-center ${props.isOpen ? 'flex' : 'hidden'} backdrop-blur-sm`}>
      <div className='bg-gray-100 p-4 rounded w-full max-w-xl'>
        <div className='flex items-center justify-between gap-4 mb-4'>
          <div className='w-full'>
            {
              props.error &&
              <p className='bg-red-500 text-white text-lg font-semibold w-full py-1 px-2 rounded '>{props.error}</p>
            }
          </div>
          <div className='flex items-center gap-4'>
            <Button variant='contained' color='success' onClick={handleSubmit}>
              save
            </Button>
            <Button variant='contained' color='error' onClick={() => { props.setOpen(false) }}>
              close
            </Button>
          </div>
        </div>
        <Divider />
        <div className='mt-4 mb-2'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
