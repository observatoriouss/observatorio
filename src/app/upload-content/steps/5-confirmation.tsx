'use client'
import { Button } from '@/components/ui/button'
import { Steps, useStepStore } from '../store/steps.store'
import { CircleCheck } from 'lucide-react'

function Confirmation() {
    const idRequest = useStepStore(state => state.idRequest)
    const setSteps = useStepStore(state => state.setSteps)
    return (
        <div className='container mx-auto bg-white py-12 md:p-12 w-full'>
            <h1 className='text-2xl font-bold text-center'>
                ¡Su solicitud ha sido ingresada correctamente!
            </h1>
            <h3 className="text-sm text-center pt-1">
                Revise su correo electrónico para saber si su solicitud fue aprobada o rechazada.
            </h3>
            <div className="flex flex-col gap-4 w-full shadow-md pb-12 p-2 md:p-12">
                <div className="flex flex-col gap-2">
                    <CircleCheck size={64} className="text-green-500 mx-auto" />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-center">Número de referencia de la solicitud: {idRequest}</span>
                </div>
                <Button
                    type='submit'
                    variant={"outline"}
                    className='w-full'
                    onClick={() => {
                        setSteps(Steps.CreateNewPost)
                    }}
                >
                    Crear otra solicitud
                </Button>
                <Button
                    type='submit'
                    className='w-full'
                    onClick={() => {
                        setSteps(Steps.DataValidation)
                    }}
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    )
}

export default Confirmation