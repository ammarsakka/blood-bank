import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export const Section2 = () => {



  return (
    <div className='flex items-center gap-8 mx-44'>
      <img src='/images/main/about.jpg.webp'
        className='w-[600px]'
      />
      <div>
        <p className='text-3xl font-bold mb-8'>
          We Are Mediplus Blood Bank
        </p>
        <p className='text-xl text-gray-700'>
          Donate blood and save lives. Instead of giving your blood to mosquitoes, give it to someone who needs it. One bag of blood can bring back one from the dead. The bond of blood is stronger than anything.
        </p>
        <div className='flex items-center gap-4 mt-6'>
          <Link to={'/appointment'}><Button variant='contained'>Make an appointment</Button></Link>
          <Button variant='outlined'>
            Contact Us
          </Button>
        </div>
      </div>
    </div>

  )
}
