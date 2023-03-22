import React from 'react'
import { AppointmentForm } from '../contents/forms/AppointmentForm'
import { Header } from '../contents/header/Header'

export const Appointment = ({ user }) => {
    return (
        <div>
            <Header user={user} />
            <AppointmentForm user={user} />
        </div>
    )
}
