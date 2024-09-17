'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PayloadResetPassword, useAuthStore } from "@/stores/session";
import { useEffect } from 'react';
import { toast } from 'sonner';

// token is query param
function ResetPassword() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Omit<PayloadResetPassword, 'token'>>({
        values: {
            password: ''
            // email: 'test@prueba.com',
            // password: '1234'
        }
    })
    const searchParams = useSearchParams()

    const token = searchParams.get('token')
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading)
    const isResetPassword = useAuthStore(state => state.isResetPassword)
    const resetPassword = useAuthStore(state => state.resetPassword)
    const showPassword = useAuthStore(state => state.showPassword)
    const setShowPassword = useAuthStore(state => state.setShowPassword)

    const hasHydrated = useAuthStore(state => state._hasHydrated);

    useEffect(() => {
        if (!hasHydrated) return
        if (user) {
            router.push('/')
        }
    }, [hasHydrated, user])

    const onSubmit = handleSubmit(async (data) => {
        if (!token) {
            toast.error('Token no encontrado')
            return
        }
        await resetPassword({
            ...data,
            token
        })
        setValue('password', '')
    })
    return (
        <div className='container mx-auto py-12'>
            <h1 className='text-2xl font-bold text-center'>Actualiza tu contraseña</h1>
            <br />
            <form onSubmit={onSubmit} className="container mx-auto bg-white p-4 md:p-4">
                <div className="grid w-full gap-1.5 relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password" placeholder="Inserte Contraseña"
                        disabled={loading}
                        {...register('password', {
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
                    <span className="text-red-500 text-xs">{errors.password && (
                        <>{errors.password.message}</>
                    )}</span>
                </div>
                <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading}
                >
                    Cambiar Contraseña
                </Button>
            </form>
            <br />
            {isResetPassword && (
                <>
                    <p className='text-center text-green-500'>
                        Contraseña actualizada correctamente.
                    </p>
                    <p className='text-center'>¿Iniciar sesión? <Link className='text-blue-600' href='/iniciar-sesion'>Login</Link></p>
                </>
            )}
        </div>
    )
}

export default ResetPassword