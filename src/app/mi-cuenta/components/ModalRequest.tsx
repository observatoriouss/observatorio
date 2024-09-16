import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRequestStore } from "../store/requests.store";
import { RequestPost } from "@/app/upload-content/store/steps.store";
import { formatDate, OPTIONS_CATEGORY } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Category } from "@/services/home";
import { Label } from "@/components/ui/label";
import Select from 'react-select';
import { Input } from "@/components/ui/input";
import DefaultEditor from "react-simple-wysiwyg";
import Creatable from 'react-select/creatable';

function ModalRequest() {

    const loading = useRequestStore(state => state.loading)
    const open = useRequestStore(state => state.open)
    const setOpen = useRequestStore(state => state.setOpen)
    const uploadService = useRequestStore(state => state.uploadService)
    const action = useRequestStore(state => state.action)
    const updateRequest = useRequestStore(state => state.updateRequest)
    const requestSelected = useRequestStore(state => state.requestSelected)

    const [description, setDescription] = useState(requestSelected?.content);
    const onHandleDescripcion = (value: string) => {
        setDescription(value);
        setValue("content", value);
    };

    const title = () => {
        switch (action) {
            case 'edit-request':
                return 'Editar Solicitud'
            case 'list-rejects':
                return 'Razones de rechazo'
            default:
                return 'Solicitud'
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError,
    } = useForm<RequestPost>({
        defaultValues: {
            title: requestSelected?.title,
            category: requestSelected?.category,
            description: requestSelected?.description,
            imageUrl: requestSelected?.imageUrl,
            content: requestSelected?.content,
            videoUrl: requestSelected?.videoUrl,
            podcastUrl: requestSelected?.podcastUrl,
            tags: requestSelected?.tags,
            attachments: requestSelected?.attachments,
            imageDescription: requestSelected?.imageDescription,
        }
    })

    const handleOnChangeImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const { url } = await uploadService(file);
        setValue('imageUrl', url)
    }

    const handleOnChangeArchiveInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const { url } = await uploadService(file);
        setValue('attachments', [...(watch('attachments') ?? []), url])
    }

    // const onSubmit = async (e: any) => {
    //     (e as any).preventDefault();
    //     if (action === 'edit-request') {
    //         if (!requestSelected) return
    //         return await updateRequest(requestSelected.id, {} as RequestPost)
    //     }
    // }
    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        if (action === 'edit-request') {
            if (!requestSelected) return
            // console.log({ data })
            return await updateRequest(requestSelected.id, data)
        }
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className={"lg:max-w-screen-lg max-h-screen overflow-y-scroll"}
                onPointerDownOutside={e => {
                    e.preventDefault()

                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}>
                <DialogHeader>
                    <DialogTitle>{title()}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} encType='multipart/form-data'>
                    <pre className="text-xs hidden">
                        <code>
                            {JSON.stringify({ requestSelected, form: watch() }, null, 4)}
                        </code>
                    </pre>
                    {action === 'edit-request' ? (
                        <div className="py-6">
                            <h1 className="pb-2">
                                ¿Estás seguro de aceptar: {requestSelected?.title}?
                            </h1>
                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="category" className="text-right">
                                        Categoría
                                    </Label>
                                    <Select
                                        options={OPTIONS_CATEGORY}
                                        {...register("category", {
                                            required: {
                                                value: true,
                                                message: "Categoría es requerida.",
                                            },
                                        })}
                                        value={watch('category') as any &&
                                            OPTIONS_CATEGORY.find(
                                                (item) => item.value === watch('category')
                                            )}
                                        isDisabled={loading}
                                        className="w-full col-span-3 z-[99]"
                                        defaultValue={{ value: Category.NEWS, label: 'Noticias' }}
                                        onChange={(option) => {
                                            setValue('category', option.value)
                                            setError('category', {
                                                type: 'disabled'
                                            })
                                        }}
                                    />
                                    {errors.category &&
                                        <span className="text-red-600 text-xs">{errors.category.message}</span>
                                    }
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="title" className="text-right">
                                        Título
                                    </Label>
                                    <Input
                                        id="title"
                                        value={watch('title')}
                                        disabled={loading}
                                        className="col-span-3"
                                        placeholder="Título del post"
                                        {...register('title', {
                                            required: {
                                                value: true,
                                                message: 'Título es requerido.'
                                            },
                                            maxLength: {
                                                value: 80,
                                                message: 'Título debe tener 80 caracteres como máximo.'
                                            }
                                        })}
                                    />
                                    {errors.title &&
                                        <span className="text-red-600 text-xs">{errors.title.message}</span>
                                    }
                                </div>
                                {(watch('category') !== Category.PODCAST) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="description" className="text-right">
                                            Descripción
                                        </Label>
                                        <Input
                                            disabled={loading}
                                            value={watch('description') || ''}
                                            className="col-span-3"
                                            placeholder="Descripción del post"
                                            {...register('description', {
                                                required: {
                                                    value: true,
                                                    message: 'Descripción es requerida.'
                                                },
                                                maxLength: {
                                                    value: 200,
                                                    message: 'Descripción debe tener 200 caracteres como máximo.'
                                                }
                                            })}
                                        />
                                        {errors.description &&
                                            <span className="text-red-600 text-xs">{errors.description.message}</span>
                                        }
                                    </div>
                                )}

                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="description" className="text-right">
                                        Contenido
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
                                            {...register("content", { required: true })}
                                        />
                                    </div>
                                    {errors.content &&
                                        <span className="text-red-600 text-xs">{errors.content.message}</span>
                                    }
                                </div>
                                {(watch('category') !== Category.PODCAST && watch('category') !== Category.TUBES) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="picture">Cargar Imagen</Label>
                                        {loading ? (
                                            <div className="w-full flex justify-center">
                                                Subiendo imagen...
                                                <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500'></div>
                                            </div>
                                        ) : ''}
                                        {watch('imageUrl') && (
                                            <img src={watch('imageUrl')!} alt="Imagen" className="h-36 w-auto object-cover transition-all hover:scale-105" />
                                        )}
                                        <Input disabled={loading} id="picture" type="file" name="media" onChange={handleOnChangeImageInput} />
                                        <Input
                                            disabled={loading}
                                            value={watch('imageUrl') || ''}
                                            className="hidden"
                                            {...register('imageUrl', {
                                                required: {
                                                    value: true,
                                                    message: 'Imagen es requerida.'
                                                },
                                            })}
                                        />
                                        {errors.imageUrl &&
                                            <span className="text-red-600 text-xs">{errors.imageUrl.message}</span>
                                        }
                                    </div>
                                )}
                                {(watch('category') !== Category.READS && watch('category') !== Category.PODCAST && watch('category') !== Category.TUBES) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="imageDescription" className="text-right">
                                            Descripción de la imagen
                                        </Label>
                                        <Input
                                            disabled={loading}
                                            value={watch('imageDescription') || ''}
                                            {...register('imageDescription', {
                                                required: {
                                                    value: true,
                                                    message: 'Descripción de imagen es requerida.'
                                                },
                                            })}
                                        />
                                        {errors.imageDescription &&
                                            <span className="text-red-600 text-xs">{errors.imageDescription.message}</span>
                                        }
                                    </div>
                                )}
                                {(watch('category') === Category.TUBES) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="videoUrl" className="text-right">
                                            URL del video
                                        </Label>
                                        <Input
                                            disabled={loading}
                                            value={watch('videoUrl') || ''}
                                            {...register('videoUrl', {
                                                required: {
                                                    value: true,
                                                    message: 'URL del video es requerido.'
                                                },
                                            })}
                                        />
                                        {errors.videoUrl &&
                                            <span className="text-red-600 text-xs">{errors.videoUrl.message}</span>
                                        }
                                    </div>
                                )}
                                {(watch('category') === Category.PODCAST) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="podcastUrl" className="text-right">
                                            URL del podcast
                                        </Label>
                                        <Input
                                            disabled={loading}
                                            value={watch('podcastUrl') || ''}
                                            {...register('podcastUrl', {
                                                required: {
                                                    value: true,
                                                    message: 'URL del podcast es requerido.'
                                                },
                                            })}
                                        />
                                        {errors.podcastUrl &&
                                            <span className="text-red-600 text-xs">{errors.podcastUrl.message}</span>
                                        }
                                    </div>
                                )}
                                {(watch('category') === Category.READS) && (
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="picture">Cargar Documento</Label>
                                        {loading ? (
                                            <div className="w-full flex justify-center">
                                                Subiendo documento...
                                                <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500'></div>
                                            </div>
                                        ) : ''}
                                        {watch('attachments') && (
                                            <p>{watch('attachments')?.length} Documento adjunto cargado:
                                                {watch('attachments')?.map((attachment: string, index: number) => (
                                                    <a
                                                        key={index}
                                                        href={attachment}
                                                        className="text-blue-500 hover:underline"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {attachment}
                                                    </a>
                                                ))}
                                            </p>

                                        )}
                                        <Input disabled={loading} id="archive" type="file" name="media" onChange={handleOnChangeArchiveInput} />
                                        <Input
                                            disabled={loading}
                                            className="hidden"
                                            {...register('attachments', {
                                                required: {
                                                    value: true,
                                                    message: 'Documento adjunto es requerido.'
                                                },
                                                validate: {
                                                    min: (value: string[] | null) => {
                                                        if (value && value.length < 1) {
                                                            return 'Documento adjunto es requerido.'
                                                        }
                                                        return true
                                                    }
                                                }
                                            })}
                                        />
                                        {errors.attachments &&
                                            <span className="text-red-600 text-xs">{errors.attachments.message}</span>
                                        }
                                    </div>
                                )}
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="podcastUrl" className="text-right">
                                        Tags
                                    </Label>
                                    <Creatable
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={[].map(tag => ({ value: tag, label: tag }))}
                                        {...register("tags", {
                                            required: {
                                                value: true,
                                                message: "Tags son requeridos.",
                                            },
                                            validate: {
                                                min: (value: string[]) => {
                                                    if (value.length < 1) {
                                                        return 'Tags son requeridos.'
                                                    }
                                                    return true
                                                }
                                            }
                                        })}
                                        value={watch('tags') as any &&
                                            watch('tags').map(tag =>
                                                ({ value: tag, label: tag }))}
                                        isDisabled={loading}
                                        className="w-full col-span-3 z-[99]"
                                        onChange={(options) => {
                                            const map = options.map((option: any) => option.value)
                                            setValue('tags', map)
                                            setError('tags', {
                                                type: 'disabled'
                                            })
                                        }}
                                    />
                                    {errors.tags &&
                                        <span className="text-red-600 text-xs">{errors.tags.message}</span>
                                    }
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={loading || !watch('content')}
                                >
                                    Enviar solicitud
                                </Button>
                            </div>
                        </div>
                    ) : action === 'list-rejects' ? (
                        <div className="py-6">
                            <div className="flex flex-col gap-2">
                                {requestSelected?.rejectionReasons?.length ? requestSelected?.rejectionReasons?.map((reason, index) => (
                                    <div key={index} className="flex flex-row gap-1">
                                        <span className="text-xs font-semibold">{reason.reason}</span>
                                        <span className="text-xs font-light">({formatDate(reason.createdAt)})</span>
                                    </div>
                                )) : (
                                    <div>
                                        <span className="text-xs font-semibold">No hay razones de rechazo</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                        : action === 'view' ? (
                            <div className="py-6 flex flex-col gap-2">

                            </div>
                        ) : (<></>)}
                    <DialogFooter>
                        <Button
                            disabled={loading || (action === 'view')}
                            type="submit"
                            className="bg-uss-green-700 hover:bg-uss-green-800 text-white font-bold py-2 px-4 rounded duration-300">
                            Guardar
                        </Button>
                        <Button
                            onClick={() => setOpen(!open)}
                            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded duration-300">
                            Cancelar
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default ModalRequest