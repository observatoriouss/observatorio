'use client'
import { Button } from '@/components/ui/button'
import { Steps, useStepStore } from '../store/steps.store'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useRouter } from "next/navigation"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { useAuthStore, User } from "@/stores/session";

function ValidationData() {
    const user = useAuthStore(state => state.user)
    const loading = useStepStore(state => state.loading)
    const setSteps = useStepStore(state => state.setSteps)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<User>>({
        values: {
            name: '',
            email: '',
            image: ''
        }
    })

    const onSubmit = handleSubmit((payload) => {
        setSteps(Steps.CreateNewPost)
    })


    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('email', user.email)
            setValue('image', user.image)
        }
    }, [user])


    const handleRedirectToLogin = () => {
        router.push('/iniciar-sesion')
    }
    return (
        <div className='container mx-auto bg-white p-12'>
            <h1 className='text-2xl font-bold text-center'>
                Validación de Datos
            </h1>
            <p className='text-sm text-center w-full'>
                Por favor, verifica que los datos sean correctos, de lo contrario, actualízalos en:
                <Link href="/mi-cuenta" className="text-blue-500"> Mi Cuenta</Link>
            </p>
            {user ? (<>
                <form onSubmit={onSubmit} className="py-4 flex flex-col gap-2">
                    {/* <div className="grid w-full gap-1.5">
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
                    </div> */}
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="name" className="text-left">
                            Nombres
                        </Label>
                        <Input
                            type="text" id="name" placeholder="Nombre"
                            disabled={loading}
                            value={user.name}
                            readOnly
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
                        <Label htmlFor="name" className="text-left">
                            Correo Electrónico
                        </Label>
                        <Input
                            type="email" id="email" placeholder="Email"
                            disabled={loading}
                            value={user.email}
                            readOnly
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
                    <div className={cn(
                        "flex flex-col items-start gap-2",
                    )}>
                        <div className='pb-2'>
                            {user.image ? (
                                <img src={user.image} alt="Imagen" className="h-36 aspect-square object-cover transition-all hover:scale-105" />
                            ) : (
                                <div className="h-36 aspect-square bg-gray-200 flex items-center justify-center text-xs px-2">
                                    <p className='text-center'>
                                        <span className='font-semibold'>No hay imagen cargada</span> <br />
                                        Por favor, carga tu imagen en:
                                        <Link href="/mi-cuenta" className="text-blue-500"> Mi Cuenta</Link>
                                    </p>
                                </div>
                            )}
                        </div>
                        <Input
                            disabled={loading}
                            value={user.image || ''}
                            className="hidden"
                            {...register('image', {
                                required: {
                                    value: true,
                                    message: 'Imagen es requerida.'
                                },
                            })}
                        />
                        {errors.image &&
                            <span className="text-red-600 text-xs">{errors.image.message}</span>
                        }
                    </div>
                    <Button
                        type='submit'
                        className='w-full mt-4'
                        disabled={loading}
                    >
                        Continuar
                    </Button>
                </form>
            </>) : (<>
                <h1 className='text-xl text-center'>
                    Debes iniciar sesión para continuar
                </h1>
                <div className='flex justify-center mt-4'>
                    <Button
                        onClick={handleRedirectToLogin}
                        className='w-full'
                    >
                        Iniciar sesión
                    </Button>
                </div>
            </>)}

        </div>
    )
}

export default ValidationData