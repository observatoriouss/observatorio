'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore, UserBodyRequest } from "@/stores/session";
import { useInscriptionEventStore } from "@/app/eventos/store/incription-event.store";
import { useForm } from "react-hook-form";
import { uploadFile } from "@/services/common";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Select from 'react-select';
import { Checkbox } from "@/components/ui/checkbox";
import { MapProfessorEmploymentType, ProfessorEmploymentType } from "@/services/events";
import { LoaderCircle } from "lucide-react";
import DefaultEditor from "react-simple-wysiwyg";
import SplashScreen from "@/components/SplashScreen";

const AccountPage = () => {
    const [loadFile, setLoadFile] = useState(false)
    const user = useAuthStore(state => state.user);
    const getCountries = useAuthStore(state => state.getCountries);
    const loading = useAuthStore(state => state.loading);
    const updateDataUser = useAuthStore(state => state.updateDataUser);
    const countries = useAuthStore(state => state.countries);
    const getUserByToken = useAuthStore(state => state.getUserByToken);

    const schools = useInscriptionEventStore(state => state.schools)
    const getListSchools = useInscriptionEventStore(state => state.getListSchools)
    const loadSchools = useInscriptionEventStore(state => state.loading)

    const [description, setDescription] = useState(user?.biography || '');
    const onHandleDescripcion = (value: string) => {
        setDescription(value);
        setValue("biography", value);
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError,
    } = useForm<UserBodyRequest>({
        defaultValues: {
            role: 'user',
            countryCode: '',
            name: '',
            image: '',
            password: '',
            biography: user?.biography,
        }
    })
    useEffect(() => {
        if (!user) return
        reset({
            ...user,
            role: (user.role as "user" | "professor") || "user",
        })
        setDescription(user.biography);
    }, [user])

    useEffect(() => {
        getCountries();
        getListSchools();
        getUserByToken();
    }, [])

    const handleOnChangeImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        try {
            setLoadFile(true);
            const { url } = await uploadFile(file);
            setValue('image', url)
            toast.success('Imagen cargada con éxito');
        } catch (error) {
            toast.error('Ocurrió un error inesperado, intente nuevamente');
        } finally {
            setLoadFile(false);
        }
    }
    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        await updateDataUser({ ...data, email: undefined }, user?.id!);
    })

    useEffect(() => {
        setValue('documentType', watch('role') === 'professor' ? 'dni' : undefined)
        return () => {
            setValue('documentType', undefined)
        }
    }, [watch('role')])

    if (!user) return <SplashScreen />;

    return (
        <div className={`nc-AccountPage `}>
            <div className="space-y-10 sm:space-y-12">
                {/* HEADING */}
                <h2 className="text-2xl sm:text-3xl font-semibold">
                    Actualizar Perfil
                </h2>
                <form onSubmit={onSubmit} encType='multipart/form-data' className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex  flex-col items-center">
                        {/* AVATAR */}
                        <div className="relative rounded-full overflow-hidden flex">
                            <Image
                                src={watch('image') || user.image || '/img/favicon.png'}
                                alt="avatar"
                                width={128}
                                height={128}
                                className={cn("w-32 h-32 rounded-full object-cover z-0",
                                    loadFile ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                                )}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                                {loadFile
                                    ? (
                                        <>
                                            <LoaderCircle size={30} className="animate-spin text-white" />
                                            <span className="mt-1 text-xs">Cargando imagen</span>
                                        </>
                                    )
                                    : (
                                        <>
                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                                                    stroke="currentColor"
                                                    strokeWidth={1.5}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className="mt-1 text-xs">Cambiar imagen</span>
                                        </>
                                    )}
                            </div>
                            <input
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                disabled={loading} id="picture" type="file" name="media" onChange={handleOnChangeImageInput} />
                            <Input
                                disabled={loading}
                                value={watch('image') || ''}
                                className="hidden"
                                {...register('image', {
                                    required: {
                                        value: true,
                                        message: 'Imagen es requerida.'
                                    },
                                })}
                            />
                        </div>
                        {errors.image &&
                            <span className="text-red-600 text-xs mt-2">{errors.image.message}</span>
                        }
                    </div>
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        <div className="py-6 flex flex-col gap-3">
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="names" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    id="names"
                                    value={watch('name') || ''}
                                    disabled={loading}
                                    className="col-span-3"
                                    placeholder="Nombre"
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Nombre es requerido.'
                                        },
                                        maxLength: {
                                            value: 80,
                                            message: 'Nombre debe tener 80 caracteres como máximo.'
                                        }
                                    })}
                                />
                                {errors.name &&
                                    <span className="text-red-600 text-xs">{errors.name.message}</span>
                                }
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="password" className="text-right">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    value={watch('password') || ''}
                                    disabled={loading}
                                    className="col-span-3"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                {errors.password &&
                                    <span className="text-red-600 text-xs">{errors.password.message}</span>
                                }
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="emailuser" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="emailuser"
                                    value={user?.email || ''}
                                    {...register('email')}
                                    readOnly
                                    className="col-span-3"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="countries" className="text-right">
                                    País
                                </Label>
                                <Select
                                    options={
                                        countries.map((country) => ({
                                            value: country.code,
                                            label: <>{country.name}</>
                                        }))
                                    }
                                    {...register("countryCode", {
                                        required: {
                                            value: true,
                                            message: "País es requerido.",
                                        },
                                    })}
                                    value={watch('countryCode') as any &&
                                        countries.find((c) => c.code === watch('countryCode')) &&
                                    {
                                        value: watch('countryCode'),
                                        label: (
                                            <span className="text-bold flex gap-1">
                                                <img src={countries.find((c) => c.code === watch('countryCode'))?.icon} alt={countries.find((c) => c.code === watch('countryCode'))?.name} className="w-6 h-6" />
                                                {countries.find((c) => c.code === watch('countryCode'))?.name}
                                            </span>
                                        ),
                                    }
                                    }
                                    isDisabled={loading}
                                    className="w-full col-span-3 z-[98]"
                                    onChange={(option) => {
                                        setValue('countryCode', option?.value as string)
                                        setError('countryCode', {
                                            type: 'disabled'
                                        })
                                    }}
                                />
                                {errors.countryCode &&
                                    <span className="text-red-600 text-xs">{errors.countryCode.message}</span>
                                }
                            </div>

                            {/* Is Professor */}
                            {watch('role') === 'professor' && (
                                <>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="userRole"
                                            checked={watch('role') === 'professor'}
                                        // onCheckedChange={(checked) => {
                                        //     setValue('role', checked ? 'professor' : 'user')
                                        // }}
                                        />
                                        <label
                                            htmlFor="userRole"
                                            className="userRole-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Docente de la USS
                                        </label>
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                        <Input
                                            type="text" placeholder="Ingresa Número de DNI"
                                            disabled={loading}
                                            readOnly
                                            {...register('documentNumber', {
                                                required: {
                                                    value: watch('role') === 'professor',
                                                    message: 'Número de DNI requerido'
                                                },
                                                pattern: {
                                                    value: /^[0-9]{8}$/,
                                                    message: 'Número de DNI no válido'
                                                },
                                            })}
                                        />
                                        <span className="text-red-500 text-xs">{errors.documentNumber && (
                                            <>{errors.documentNumber.message}</>
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
                                                    value: watch('role') === 'professor',
                                                    message: "Tipo es requerido.",
                                                },
                                            })}
                                            value={watch('employmentType') as any &&
                                            {
                                                value: watch('employmentType'),
                                                label: MapProfessorEmploymentType[watch('employmentType') || ProfessorEmploymentType.FULL_TIME]
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
                                            {...register("schoolId", {
                                                required: {
                                                    value: watch('role') === 'professor',
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
                                            isDisabled={loading || loadSchools}
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
                                </>
                            )}
                            {/* End Is Professor */}

                            {/* Biography */}
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="description" className="text-right">
                                    Biografía
                                </Label>
                                <div className="border-[1px] rounded border-slate-200 w-full">
                                    <DefaultEditor
                                        value={description}
                                        onChange={(e) => {
                                            onHandleDescripcion(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="hidden"
                                        {...register("biography", { required: false })}
                                    />
                                </div>
                                {errors.biography &&
                                    <span className="text-red-600 text-xs">{errors.biography.message}</span>
                                }
                            </div>

                            <button
                                type="submit"
                                className={cn(
                                    "bg-uss-green text-black py-2 px-4 rounded-md",
                                    loading ? "opacity-50 pointer-events-none" : ""
                                )}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form >
            </div >
        </div >
    );
};

export default AccountPage;
