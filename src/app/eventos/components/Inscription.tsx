'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useEventStore } from "../store/event.store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useInscriptionEventStore } from "../store/incription-event.store"
import { useEffect } from "react"
import { MapProfessorDocumentType, MapProfessorEmploymentType, MapRoleInscription, RoleInscription } from "@/services/events"
import Creatable from 'react-select/creatable'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/session"

function Inscription() {
    const router = useRouter()
    const user = useAuthStore(state => state.user)
    const setOpenAuthDialog = useAuthStore(state => state.setOpenAuthDialog)
    const open = useEventStore(state => state.open)
    const setOpen = useEventStore(state => state.setOpen)
    const training = useEventStore(state => state.trainingSelected)
    const loading = useInscriptionEventStore(state => state.loading)
    const completeInscription = useInscriptionEventStore(state => state.completeInscription)
    const clearCache = useInscriptionEventStore(state => state.clearCache)

    useEffect(() => {
        if (user) {
        }
    }, [user])

    const { register: registerIns, handleSubmit: handleSubmitIns, formState: { errors: errorsInscription }, watch: watchIns, setValue: setValueIns, setError: setErrorIns } = useForm({
        values: {
            roles: []
        }
    })

    const onSubmitIns = handleSubmitIns(async (data) => {
        if (!training) return
        try {
            const inscription = await completeInscription(training.id, data.roles as RoleInscription[])
            clearCache()
            setOpen(false)
            router.push(`/inscripcion-completada/${inscription.id}`)
        } catch (error) {
            console.error(error)
        }
    })

    if (!user && open) setOpenAuthDialog(true)

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

                            {user && (
                                <form onSubmit={onSubmitIns} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 shadow-md p-4">
                                        <span className="text-xs text-gray-500">Datos Encontrados</span>
                                        <div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <img
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                    src={user?.image || "https://avatars.githubusercontent.com/u/93000567"}
                                                    alt={user?.name}
                                                />
                                                <span className="text-xs font-semibold">{user?.name}</span>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <span className="text-xs font-semibold">{user?.email}</span>
                                            </div>
                                            {user.role === 'professor' && (
                                                <>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <span className="text-xs font-semibold">{MapProfessorDocumentType[user?.documentType!]}</span>
                                                    </div>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <span className="text-xs font-semibold">{user?.documentNumber}</span>
                                                    </div>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <span className="text-xs font-semibold">{MapProfessorEmploymentType[user?.employmentType!]}</span>
                                                    </div>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <span className="text-xs font-semibold">{user?.school?.name}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
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