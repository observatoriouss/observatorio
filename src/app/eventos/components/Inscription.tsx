'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { EventStore } from "../store/event.store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { InscriptionEventStore } from "../store/incription-event.store"
import { useEffect, useState } from "react"
import { MapProfessorEmploymentType, MapRoleInscription, ProfessorBodyRequest, ProfessorEmploymentType, RoleInscription } from "@/services/events"
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import SplashScreen from "@/components/SplashScreen"

function Inscription() {
    const router = useRouter()
    const { open, setOpen, trainingSelected: training } = EventStore()
    const { verifyComplete, loading, professor, validateExistDNI, setProfessor, schools, succesfulRegister, registerProfessor, completeOTP, completeInscription, clearCache } = InscriptionEventStore()
    const [chargingPageInscription, setChargingPageInscription] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm<ProfessorBodyRequest>({
        defaultValues: {
            documentNumber: '' as unknown as number,
            documentType: 'dni',
            email: '',
            name: '',
            schoolId: '',
        }
    })

    const { register: registerIns, handleSubmit: handleSubmitIns, formState: { errors: errorsInscription }, watch: watchIns, setValue: setValueIns, setError: setErrorIns } = useForm({
        values: {
            roles: []
        }
    })

    const { documentNumber } = watch()
    const { roles } = watchIns()

    const onSubmitIns = handleSubmitIns(async (data) => {
        if (!training) return
        try {
            const inscription = await completeInscription(training.id, data.roles as RoleInscription[])
            clearCache()
            setOpen(false)
            setChargingPageInscription(true)
            router.push(`/inscripcion-completada/${inscription.id}`)
        } catch (error) {
            console.error(error)
        }
    })

    const onSubmit = handleSubmit((data) => {
        registerProfessor(data)
    })

    useEffect(() => {
        if (!documentNumber) return setProfessor(null)

        if (documentNumber.toString().length === 8) {
            validateExistDNI(documentNumber)
        }
    }, [documentNumber])

    useEffect(() => {
        if (professor) {
            setValue('name', professor.name)
            setValue('email', professor.email)
            setValue('schoolId', professor.schoolId)
        }
    }, [professor])

    if (chargingPageInscription) {
        return <SplashScreen />
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className={cn(
                    loading && 'cursor-wait pointer-events-none'
                )}
                onPointerDownOutside={e => {
                    e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle>Completa el formulario</DialogTitle>
                    <DialogDescription asChild className="py-4">
                        <div>
                            {!succesfulRegister && (
                                <form onSubmit={onSubmit} className="py-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="hidden">
                                            <pre>
                                                {JSON.stringify({ professor, documentNumber, roles, trainingId: training?.id }, null, 2)}
                                            </pre>
                                        </div>
                                        {/* Input DNI */}
                                        <div className="grid w-full gap-1.5">
                                            <Label htmlFor="dni">DNI</Label>
                                            <Input
                                                type="number" id="dni" placeholder="Inserte DNI"
                                                disabled={loading}
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
                                        {verifyComplete && !professor && (
                                            <>
                                                <div className="grid w-full gap-1.5">
                                                    <Label htmlFor="name">Nombre</Label>
                                                    <Input
                                                        type="text" id="name" placeholder="Inserte nombre"
                                                        disabled={loading}
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
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        type="email" id="email" placeholder="Inserte email"
                                                        disabled={loading}
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
                                                        {...register("employmentType", {
                                                            required: {
                                                                value: true,
                                                                message: "Tipo es requerido.",
                                                            },
                                                        })}
                                                        value={watch('employmentType') as any &&
                                                        {
                                                            value: watch('employmentType'),
                                                            label: MapProfessorEmploymentType[watch('employmentType')]
                                                        }
                                                        }
                                                        isDisabled={loading}
                                                        className="w-full col-span-3 z-[100]"
                                                        onChange={(option) => {
                                                            setValue('employmentType', option?.value)
                                                            setError('employmentType', {
                                                                type: 'disabled'
                                                            })
                                                        }}
                                                    />
                                                    {errors.employmentType &&
                                                        <span className="text-red-600 text-xs">{errors.employmentType.message}</span>
                                                    }
                                                </div>
                                                <div className="grid w-full gap-1.5">
                                                    <Label htmlFor="schoolId" className="">
                                                        Escuela
                                                    </Label>
                                                    <Select
                                                        options={
                                                            schools.map((school) => ({
                                                                value: school.id,
                                                                label: school.name
                                                            }))
                                                        }
                                                        {...register("schoolId", {
                                                            required: {
                                                                value: true,
                                                                message: "Escuela es requerida.",
                                                            },
                                                        })}
                                                        value={watch('schoolId') as any &&
                                                            schools.find((school) => school.id === watch('schoolId')) &&
                                                        {
                                                            value: watch('schoolId'),
                                                            label: schools.find((school) => school.id === watch('schoolId'))?.name
                                                        }
                                                        }
                                                        isDisabled={loading}
                                                        className="w-full z-[99]"
                                                        onChange={(option) => {
                                                            setValue('schoolId', option.value)
                                                            setError('schoolId', {
                                                                type: 'disabled'
                                                            })
                                                        }}
                                                    />
                                                    <span className="text-red-500 text-xs">{errors.schoolId && (
                                                        <>{errors.schoolId.message}</>
                                                    )}</span>
                                                </div>
                                                <Button type="submit" className="w-full bg-black text-white">Completar registro</Button>
                                            </>
                                        )}
                                    </div>
                                </form>
                            )}


                            {succesfulRegister && (
                                <div className="flex flex-col gap-4 shadow-md p-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs text-gray-500">Registro exitoso</span>
                                        <span className="text-xs">Para verificar su inscripción, revise su correo electrónico e ingrese el código de verificación.</span>
                                    </div>

                                    <div className="flex justify-center">
                                        <InputOTP
                                            disabled={loading}
                                            maxLength={6}
                                            // patrón letras y números
                                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                            onComplete={(e) => {
                                                completeOTP(e)
                                            }}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </div>
                            )}

                            {verifyComplete && professor && (
                                <form onSubmit={onSubmitIns} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 shadow-md p-4">
                                        <span className="text-xs text-gray-500">Datos Encontrados</span>
                                        <span className="font-bold">{professor.name}</span>
                                        <span>{professor.email}</span>
                                        <span>{schools.find((school) => school.id === professor.schoolId)?.name}</span>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="schoolId" className="">
                                            Rol
                                        </Label>
                                        <Creatable
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={
                                                Object.values(RoleInscription).map((key) => ({
                                                    value: key,
                                                    label: MapRoleInscription[key]
                                                }))
                                            }
                                            {...registerIns("roles", {
                                                required: {
                                                    value: true,
                                                    message: "Roles son requeridos.",
                                                },
                                                validate: {
                                                    min: (value: string[]) => {
                                                        if (value.length < 1) {
                                                            return 'Roles son requeridos.'
                                                        }
                                                        return true
                                                    }
                                                }
                                            })}
                                            value={watchIns('roles') as any &&
                                                watchIns('roles').map(tag =>
                                                    ({ value: tag, label: MapRoleInscription[tag] }))}
                                            isDisabled={loading}
                                            className="w-full col-span-3 z-[99]"
                                            onChange={(options) => {
                                                const map = options.map((option: any) => option.value)
                                                setValueIns('roles', map as never[])
                                                setErrorIns('roles', {
                                                    type: 'disabled'
                                                })
                                            }}
                                        />
                                        <span className="text-red-500 text-xs">{errorsInscription.roles && (
                                            <>{errorsInscription.roles.message}</>
                                        )}</span>
                                    </div>
                                    <Button
                                        disabled={loading}
                                        type="submit" className="w-full bg-black text-white">Inscribirme</Button>
                                </form>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Inscription