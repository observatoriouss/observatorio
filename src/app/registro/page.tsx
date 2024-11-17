'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, PayloadRegister } from "@/stores/session";
import { useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { MapProfessorEmploymentType, ProfessorEmploymentType } from '@/services/events';
import { useInscriptionEventStore } from '../eventos/store/incription-event.store';

function Register() {
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm<PayloadRegister>({
        values: {
            user: {
                email: '',
                name: '',
                password: '',
                role: 'user'
            },
            verificationCode: ''
        }
    })
    const router = useRouter();
    const user = useAuthStore(state => state.user)
    const loading = useAuthStore(state => state.loading)
    const isSended = useAuthStore(state => state.isSended)
    const sendVerificationCode = useAuthStore(state => state.sendVerificationCode)
    const registerUser = useAuthStore(state => state.registerUser)
    const showPassword = useAuthStore(state => state.showPassword)
    const setShowPassword = useAuthStore(state => state.setShowPassword)
    const schools = useInscriptionEventStore(state => state.schools)
    const getListSchools = useInscriptionEventStore(state => state.getListSchools)
    const loadSchools = useInscriptionEventStore(state => state.loading)

    const hasHydrated = useAuthStore(state => state._hasHydrated);

    useEffect(() => {
        getListSchools()
    }, [])

    useEffect(() => {
        if (!hasHydrated) return
        if (user) {
            router.push('/')
        }
    }, [hasHydrated, user])

    const onSubmit = handleSubmit((data) => {
        sendVerificationCode(data)
    })
    const onSubmitRegister = handleSubmit(async (data) => {
        await registerUser(data)
        router.push('/')
    })

    useEffect(() => {
        setValue('user.documentType', watch('user.role') === 'professor' ? 'dni' : undefined)
        return () => {
            setValue('user.documentType', undefined)
        }
    }, [watch('user.role')])

    return (
        <div className='container mx-auto py-12'>
            <h1 className='text-2xl font-bold text-center'>Registro</h1>
            <p className='text-center'>¿Ya estás registrado? <Link className='text-blue-600' href='/iniciar-sesion'>Inicia sesión</Link></p>
            <br />
            <pre className='hidden'>
                {JSON.stringify({ form: watch() }, null, 2)}
            </pre>
            <form onSubmit={onSubmit} className="container mx-auto bg-white p-4 md:p-4 flex flex-col gap-3">
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
                <div className="flex items-center space-x-2">
                    <Checkbox id="userRole"
                        checked={watch('user.role') === 'professor'}
                        onCheckedChange={(checked) => {
                            setValue('user.role', checked ? 'professor' : 'user')
                        }}
                    />
                    <label
                        htmlFor="userRole"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        ¿Eres docente de la USS?
                    </label>
                </div>
                {watch('user.role') === 'professor' && (
                    <>
                        <div className="grid w-full gap-1.5">
                            <Input
                                type="text" placeholder="Ingresa Número de DNI"
                                disabled={loading}
                                readOnly={isSended}
                                {...register('user.documentNumber', {
                                    required: {
                                        value: watch('user.role') === 'professor',
                                        message: 'Número de DNI requerido'
                                    },
                                    pattern: {
                                        value: /^[0-9]{8}$/,
                                        message: 'Número de DNI no válido'
                                    },
                                })}
                            />
                            <span className="text-red-500 text-xs">{errors.user?.documentNumber && (
                                <>{errors.user?.documentNumber.message}</>
                            )}</span>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label>
                                Tipo
                            </Label>
                            <Select
                                options={
                                    Object.values(ProfessorEmploymentType).map((type) => ({
                                        value: type,
                                        label: MapProfessorEmploymentType[type]
                                    }))
                                }
                                {...register("user.employmentType", {
                                    required: {
                                        value: watch('user.role') === 'professor',
                                        message: "Tipo es requerido.",
                                    },
                                })}
                                value={watch('user.employmentType') as any &&
                                {
                                    value: watch('user.employmentType'),
                                    label: MapProfessorEmploymentType[watch('user.employmentType') || ProfessorEmploymentType.FULL_TIME]
                                }
                                }
                                isDisabled={loading}
                                className="w-full col-span-3 z-[100]"
                                onChange={(option) => {
                                    setValue('user.employmentType', option?.value)
                                    setError('user.employmentType', {
                                        type: 'disabled'
                                    })
                                }}
                            />
                            {errors.user?.employmentType &&
                                <span className="text-red-600 text-xs">{errors.user?.employmentType.message}</span>
                            }
                        </div>
                        <div className="grid w-full gap-1.5">
                            <div className='flex gap-1 items-center'>
                                <Label htmlFor="schoolId" className="">
                                    Escuela
                                </Label>
                                {loadSchools && (
                                    <LoaderCircle size={14} className="animate-spin text-blue-600" />
                                )}
                            </div>
                            <Select
                                options={
                                    schools.map((school) => ({
                                        value: school.id,
                                        label: school.name
                                    }))
                                }
                                {...register("user.schoolId", {
                                    required: {
                                        value: watch('user.role') === 'professor',
                                        message: "Escuela es requerida.",
                                    },
                                })}
                                value={watch('user.schoolId') as any &&
                                    schools.find((school) => school.id === watch('user.schoolId')) &&
                                {
                                    value: watch('user.schoolId'),
                                    label: schools.find((school) => school.id === watch('user.schoolId'))?.name
                                }
                                }
                                isDisabled={loading || loadSchools}
                                className="w-full z-[99]"
                                onChange={(option) => {
                                    setValue('user.schoolId', option.value)
                                    setError('user.schoolId', {
                                        type: 'disabled'
                                    })
                                }}
                            />
                            <span className="text-red-500 text-xs">{errors.user?.schoolId && (
                                <>{errors.user?.schoolId.message}</>
                            )}</span>
                        </div>
                    </>
                )}
                {!isSended && <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading || loadSchools}
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