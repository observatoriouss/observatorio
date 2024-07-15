'use client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function ConfettiPage() {
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
        />
    )
}

export default ConfettiPage