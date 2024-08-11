import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const Guest = () => {
    return (
        <div className="guest">
            <h1 className='text-2xl my-[40px]'>Welcome to Sapa 2.0</h1>
            <SignInButton />
        </div>
    )
}

export default Guest;