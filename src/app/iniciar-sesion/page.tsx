'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/stores/session";
import { useEffect } from 'react';
import { toast } from 'sonner';

export interface PayloadLogin {
    email: string;
    password: string;
}

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<PayloadLogin>({
        values: {
            email: '',
            password: ''
            // email: 'test@prueba.com',
            // password: '1234'
        }
    })
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading)
    const error = useAuthStore(state => state.error)
    const login = useAuthStore(state => state.login)
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
        await login(data)
        if (user) {
            router.push('/')
        }
    })
    return (
        <div className='container mx-auto py-12'>
            <h1 className='text-2xl font-bold text-center'>Iniciar Sesión</h1>
            <p className='text-center'>¿Aún no tienes cuenta? <Link className='text-blue-600' href='/registro'>Regístrate</Link></p>
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
                    Iniciar Sesión
                </Button>
                {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
            </form>
            <br />
            <p className='text-center'>¿Olvidaste tu contraseña? <Link className='text-blue-600' href='/recupera-tu-cuenta'>Recupera tu cuenta</Link></p>
            <br />
        </div>
    )
}

export default Login