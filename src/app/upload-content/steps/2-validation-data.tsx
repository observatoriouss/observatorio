'use client'
import { Button } from '@/components/ui/button'
import { Steps, StepStore } from '../store/steps.store'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import useStore from '@/hooks/useStore'
import { authStore } from '@/app/store/session'
import { useRouter } from "next/navigation"
import { User } from '@/app/store/session.model'

function ValidationData() {
    const router = useRouter()
    const { loading, setSteps } = StepStore()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Partial<User>>({
        values: {
            name: '',
            email: '',
        }
    })

    const onSubmit = handleSubmit((payload) => {
        setSteps(Steps.CreateNewPost)
    })

    const session = useStore(authStore, (state) => state)!;
    if (!session) {
        return null;
    }
    const { user } = session;
    session && setValue('name', user?.name)
    session && setValue('email', user?.email)

    const handleRedirectToLogin = () => {
        router.push('/iniciar-sesion')
    }
    return (
        <div className='container mx-auto bg-white p-12'>
            <h1 className='text-2xl font-bold text-center'>
                Validación de Datos
            </h1>
            {user ? (<>
                <form onSubmit={onSubmit} className="py-4">
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