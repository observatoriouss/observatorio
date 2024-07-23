'use client'
import { Button } from '@/components/ui/button'
import { StepStore } from '../store/steps.store'
import { useForm } from 'react-hook-form'
import { Guest } from '../services/steps.service'
import { Input } from '@/components/ui/input'

function ValidationData() {
    const { validateData, guest, requestGuest, loading } = StepStore()
    const { register, handleSubmit, formState: { errors} } = useForm<Partial<Guest>>({
        values: requestGuest
    })

    const onSubmit = handleSubmit((payload) => {
        validateData(payload)
    })
    return (
        <div className='container mx-auto bg-white p-12'>
            <h1 className='text-2xl font-bold text-center'>
                Validación de Datos
            </h1>
            <form onSubmit={onSubmit} className="py-4">
                <div className="grid w-full gap-1.5">
                    <Input
                        type="number" id="dni" placeholder="Inserte DNI"
                        disabled={loading}
                        readOnly={!!guest}
                        {...register('documentNumber', {
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'El DNI solo puede contener números'
                            },
                            required: {
                                value: true,
                                message: 'El DNI es requerido'
                            },
                            maxLength: {
                                value: 8,
                                message: 'El DNI debe tener 8 dígitos'
                            },
                            minLength: {
                                value: 8,
                                message: 'El DNI debe tener 8 dígitos'
                            }
                        })}
                    />
                    <span className="text-red-500 text-xs">{errors.documentNumber && (
                        <>{errors.documentNumber.message}</>
                    )}</span>
                </div>
                <div className="grid w-full gap-1.5">
                    <Input
                        type="text" id="name" placeholder="Nombre"
                        disabled={loading}
                        // readOnly={!!guest}
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'El nombre es requerido'
                            }
                        })}
                    />
                    <span className="text-red-500 text-xs">{errors.name && (
                        <>{errors.name.message}</>
                    )}</span>
                </div>
                <div className="grid w-full gap-1.5">
                    <Input
                        type="email" id="email" placeholder="Email"
                        disabled={loading}
                        // readOnly={!!guest}
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'El email es requerido'
                            }
                        })}
                    />
                    <span className="text-red-500 text-xs">{errors.email && (
                        <>{errors.email.message}</>
                    )}</span>
                </div>
                <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading}
                >
                    {guest ? 'Actualizar mis datos' : 'Registrar'}
                </Button>
            </form>
        </div>
    )
}

export default ValidationData