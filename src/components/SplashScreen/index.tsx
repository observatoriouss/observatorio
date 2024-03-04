import React from 'react'
import USSIcon from './USSIcon'

function SplashScreen() {
    return (
        <div
            className='bg-white z-50 h-screen w-screen overflow-hidden flex flex-col items-center justify-center absolute top-0 left-0'>
            <USSIcon />
        </div>
    )
}

export default SplashScreen