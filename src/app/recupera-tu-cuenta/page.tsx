'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PayloadRecoverAccount, useAuthStore } from "@/stores/session";
import { useEffect } from 'react';

function RecoverAccount() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PayloadRecoverAccount>({
        values: {
            email: '',
        }
    })
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading)
    const isSendedToken = useAuthStore(state => state.isSendedToken)
    const recoverPassword = useAuthStore(state => state.recoverPassword)

    const hasHydrated = useAuthStore(state => state._hasHydrated);

    useEffect(() => {
        if (!hasHydrated) return
        if (user) {
            router.push('/')
        }
    }, [hasHydrated, user])

    const onSubmit = handleSubmit(async (data) => {
        await recoverPassword(data)
        router.push('/')
    })
    return (
        <div className='container mx-auto py-12'>
            <h1 className='text-2xl font-bold text-center'>Recuperación de Cuenta</h1>
            <p className='text-center'>¿Iniciar sesión? <Link className='text-blue-600' href='/iniciar-sesion'>Login</Link></p>
            <p className='text-center'>
                Ingrese el correo electrónico asociado a su cuenta y le enviaremos un enlace para restablecer su contraseña.
            </p>
            <br />
            <form onSubmit={onSubmit} className="container mx-auto bg-white p-4 md:p-4">
                <div className="grid w-full gap-1.5">
                    <Input
                        type="email" id="email" placeholder="Inserte Email"
                        disabled={loading}
                        {...register('email', {
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
                    <span className="text-red-500 text-xs">{errors.email && (
                        <>{errors.email.message}</>
                    )}</span>
                </div>
                <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading}
                >
                    Enviar código de recuperación
                </Button>
            </form>
            <br />
            {isSendedToken && (
                <p className='text-center text-green-500'>Se ha enviado un correo con un enlace para restablecer su contraseña.</p>
            )}
        </div>
    )
}

export default RecoverAccount