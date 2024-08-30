import { FileWarning } from 'lucide-react'
import Link from 'next/link'

const NotFoundSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 text-indigo-500 mb-8">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow-xl rounded-xl flex flex-col items-center justify-center">
                <FileWarning className='w-16 h-16 text-uss-green text-center mb-4' />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Página no encontrada</h2>
                <p className="text-xl text-gray-600 mb-8">Lo sentimos, no pudimos encontrar el recurso solicitado.</p>
                <Link href="/" className="px-6 py-3 bg-uss-green text-black font-semibold rounded-lg hover:bg-uss-green/80 transition duration-300">
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}