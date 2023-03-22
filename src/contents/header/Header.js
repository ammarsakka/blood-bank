import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Changepassword } from '../popup/ChangePassword'

export const Header = ({ user = [] }) => {
  const [isOpen, setOpen] = useState(false)
  const [ispassword, setpassword] = useState(false)


  return (
    <div className='w-full bg-black'>


      <div className='text-white flex w-full justify-between items-center p-4'>

        <div>
          <h1 className=''>MEDIPLUS</h1>
        </div>
        <div>
          <ul className='flex gap-7'>


            <li>
              <Link to={'/'}>
                <button>Home</button>
              </Link>
            </li>
            {
              !user ?
                <>
                  <li>
                    <Link to={'/signin'}>
                      <button>
                        Login
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/register'}>
                      <button>
                        Register
                      </button>
                    </Link>
                  </li>
                </>
                :
                user?.map((item, index) => (
                  <div key={index} className='flex items-center gap-6'>
                    <li className='relative'>
                      <button className='capitalize' onClick={() => { setOpen(!isOpen) }}>
                        {item.username}
                      </button>
                      <ul className={`absolute z-50 top-full right-0 bg-gray-100 text-black p-4 rounded shadow whitespace-nowrap flex-col gap-4 ${isOpen ? 'flex' : 'hidden'}`}>
                        {
                          item.role === 'admin' &&
                          <>
                            <li>
                              <Link to={'/hospital'}>
                                <button>
                                  Hospital
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to={'/users'}>
                                <button>
                                  Users
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to={'/admin/appointments'}>
                                <button>
                                  All Appointments
                                </button>
                              </Link>
                            </li>
                          </>
                        }
                        <li>
                          <Link to={'/users/appointments'}>
                            <button>
                              Users Appointments
                            </button>
                          </Link>
                        </li>
                        <Divider />
                        <li >
                          <button onClick={() => { setpassword(true) }}>
                            Change Password
                          </button>
                        </li>
                        <Divider />
                        <li >
                          <Link to={'/signout'}>
                            <button className='text-red-500'>
                              Sign Out
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </div>
                ))
            }
          </ul>
        </div>
      </div>
      <Changepassword isOpen={ispassword} setOpen={setpassword} />
    </div>
  )
}
