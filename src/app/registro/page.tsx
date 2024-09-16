'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { PayloadRegister } from '../store/session.model';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/session';

function Register() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<PayloadRegister>({
        values: {
            user: {
                email: '',
                name: '',
                password: '',
                // email: 'test@prueba.com',
                // name: 'test prueba',
                // password: '1234',
                role: 'user'
            },
            verificationCode: ''
        }
    })
    const router = useRouter();
    const loading = useAuthStore(state => state.loading)
    const isSended = useAuthStore(state => state.isSended)
    const sendVerificationCode = useAuthStore(state => state.sendVerificationCode)
    const registerUser = useAuthStore(state => state.registerUser)
    const showPassword = useAuthStore(state => state.showPassword)
    const setShowPassword = useAuthStore(state => state.setShowPassword)

    const onSubmit = handleSubmit((data) => {
        sendVerificationCode(data)
    })
    const onSubmitRegister = handleSubmit(async (data) => {
        await registerUser(data)
        router.push('/')
    })
    return (
        <div className='container mx-auto py-12'>
            <h1 className='text-2xl font-bold text-center'>Registro</h1>
            <p className='text-center'>¿Ya estás registrado? <Link className='text-blue-600' href='/iniciar-sesion'>Inicia sesión</Link></p>
            <br />
            <form onSubmit={onSubmit} className="container mx-auto bg-white p-4 md:p-4">
                <div className="grid w-full gap-1.5">
                    <Input
                        type="text" id="names" placeholder="Inserte Nombres Completos"
                        disabled={loading}
                        readOnly={isSended}
                        {...register('user.name', {
                            required: {
                                value: true,
                                message: 'Nombres Completos requeridos'
                            },
                        })}
                    />
                    <span className="text-red-500 text-xs">{errors.user?.name && (
                        <>{errors.user?.name.message}</>
                    )}</span>
                </div>
                <div className="grid w-full gap-1.5">
                    <Input
                        type="email"
                        id="email"
                        placeholder="Inserte Email"
                        readOnly={isSended}
                        disabled={loading}
                        {...register('user.email', {
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'El Email no es válido'
                            },
                            required: {
                                value: true,
                                message: 'El Email es requerido'
                            },
                        })}
                    />
                    <span className="text-red-500 text-xs">{errors.user?.email && (
                        <>{errors.user?.email.message}</>
                    )}</span>
                </div>
                <div className="grid w-full gap-1.5 relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Inserte Contraseña"
                        readOnly={isSended}
                        disabled={loading}
                        {...register('user.password', {
                            required: {
                                value: true,
                                message: 'La Contraseña es requerida'
                            },
                        })}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeIcon size={24} className='pb-1 m-0' /> : <EyeOffIcon size={24} className='pb-1 m-0' />}

                    </span>
                    <span className="text-red-500 text-xs">{errors.user?.password && (
                        <>{errors.user?.password.message}</>
                    )}</span>
                </div>
                {/* confirmar contraseña */}
                <div className="grid w-full gap-1.5 relative">
                    <Input
                        type={showPassword ? 'text' : 'password'} id="password-confirm" placeholder="Confirmar Contraseña"
                        disabled={loading}
                        readOnly={watch('user.password') === '' || isSended}
                        required
                        onChange={(e) => {
                            const value = e.target.value
                            if (value !== watch('user.password')) {
                                e.target.setCustomValidity('Las contraseñas no coinciden')
                            }
                            else {
                                e.target.setCustomValidity('')
                            }
                        }}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeIcon size={24} className='pb-1 m-0' /> : <EyeOffIcon size={24} className='pb-1 m-0' />}

                    </span>
                    <span className="text-red-500 text-xs">{errors.user?.password && (
                        <>{errors.user?.password.message}</>
                    )}</span>
                </div>
                {!isSended && <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <LoaderCircle size={24} className="animate-spin text-white" />
                        </div>
                    ) : "Continuar"}
                </Button>}
                {isSended && (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Input
                                type="text" id="verification-code" placeholder="Inserte Código de Verificación"
                                disabled={loading}
                                {...register('verificationCode', {
                                    required: {
                                        value: true,
                                        message: 'Código de Verificación requerido'
                                    },
                                })}
                            />
                            <span className="text-red-500 text-xs">{errors.verificationCode && (
                                <>{errors.verificationCode.message}</>
                            )}</span>
                        </div>
                        <Button
                            type='button'
                            className='w-full mt-4'
                            disabled={loading}
                            onClick={onSubmitRegister}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <LoaderCircle size={24} className="animate-spin text-white" />
                                </div>
                            ) : "Registrarme"}
                        </Button>
                    </>
                )}
            </form>
        </div>
    )
}

export default Register