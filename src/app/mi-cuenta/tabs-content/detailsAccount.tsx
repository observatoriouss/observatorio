'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/services/common';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';
import { useAuthStore, UserBodyRequest } from "@/stores/session";
import DefaultEditor from 'react-simple-wysiwyg';

function DetailsAccount() {
    const [loadFile, setLoadFile] = useState(false)
    const user = useAuthStore(state => state.user);
    const getCountries = useAuthStore(state => state.getCountries);
    const loading = useAuthStore(state => state.loading);
    const updateDataUser = useAuthStore(state => state.updateDataUser);
    const countries = useAuthStore(state => state.countries);

    const [description, setDescription] = useState(user?.biography);
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
            ...user
        })
        setDescription(user.biography);
    }, [user])

    useEffect(() => {
        getCountries();
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
        await updateDataUser(data, user?.id!);
    })
    return (
        <div>
            <h1 className='uppercase text-green-800 font-bold text-xl'>Detalles de Cuenta</h1>
            <pre className='text-xs hidden'>
                {JSON.stringify({ user: user, form: watch() }, null, 2)}
            </pre>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <div className="py-6 flex flex-col gap-2">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="names" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="names"
                            value={watch('name')}
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
                            value={watch('password')}
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
                            value={user?.email}
                            readOnly
                            className="col-span-3"
                            placeholder="Email"
                        />
                    </div>
                    <div className={cn(
                        "flex flex-col items-start gap-2",
                        loadFile ? 'opacity-50 pointer-events-none' : ''
                    )}>
                        <div className='pb-2'>
                            {/* Renderizar imagen solo si existe, sino mostrar que no hay imagen cargada */}
                            {watch('image') ? (
                                <img src={watch('image')!} alt="Imagen" className="h-36 aspect-square object-cover transition-all hover:scale-105" />
                            ) : (
                                <div className="h-36 aspect-square bg-gray-200 flex items-center justify-center text-xs px-2">
                                    No hay imagen cargada
                                </div>
                            )}
                        </div>
                        <Label htmlFor="picture">Cargar Imagen</Label>
                        {loading ? (
                            <div className="w-full flex justify-center">
                                Subiendo imagen...
                                <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500'></div>
                            </div>
                        ) : ''}
                        <Input disabled={loading} id="picture" type="file" name="media" onChange={handleOnChangeImageInput} />
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
                        {errors.image &&
                            <span className="text-red-600 text-xs">{errors.image.message}</span>
                        }
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="countries" className="text-right">
                            País
                        </Label>
                        <Select
                            options={
                                countries.map((country) => ({
                                    value: country.code,
                                    label: country.name
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
                                // label: countries.find((c) => c.code === watch('countryCode'))?.name,
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
                                {...register("biography", { required: true })}
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
            </form>
        </div>
    )
}

export default DetailsAccount