import React from 'react'
import {Button} from '@mui/material'
export const Hero = () => {
  return (
    
      <div className='relative w-full h-full min-h-screen flex justify-start items-center p-4'>
        <img src='/images/main/doc.jpg' alt='Hero' className='w-full h-full object-cover absolute top-0 left-0 -z-[1] object-top' /> 
        
        <div className='z-10'>
          <p className='text-xl font-bold text-blue-600'>
          WELCOME TO MEDIPLUS
          </p>
          <p className='text-5xl mb-7'>
          We are here for your Blood 
          </p>

          <Button variant='contained'>Make an appointment</Button>


          
        </div>
      </div>
    
  )
}
