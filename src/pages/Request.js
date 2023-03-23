import React from 'react'
import { RequestForm } from '../contents/forms/RequestForm'
import { Header } from '../contents/header/Header'

export const Request = ({ user }) => {
    return (
        <div>
            <Header user={user} />
            <RequestForm user={user} />
        </div>
    )
}
