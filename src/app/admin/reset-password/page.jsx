'use client'
import React, { useState } from 'react'


const Reset = () => {
    const [mail, setMail] = useState('')

    const onMailSubmit = async (e) => {
        e.preventDefault()
        const varifyMail = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail })
        })
        const data = await varifyMail.json()
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={onMailSubmit} className='flex flex-col gap-2 mt-11'>
                <input type='text' value={mail} onChange={(e) => setMail(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Reset