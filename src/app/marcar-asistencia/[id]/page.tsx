'use client'
import SplashScreen from '@/components/SplashScreen'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { evaluateIfIsPlaceOrLink, formatDate, formatDateTimeRange } from '@/lib/utils'
import { getTraining, MapTrainingModality, MapTrainingStatus, registerAsistanceToExecution, Training, TrainingStatus } from '@/services/events'
import { useAuthStore } from '@/stores/session'
import { CalendarIcon, UsersIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function AssistanceAutomatic({ params }: { params: { id: string } }) {
    const { id } = params
    const user = useAuthStore(state => state.user)
    const [training, setTraining] = useState<Training | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getData = async () => {
            try {
                const training = await getTraining(id)
                setTraining(training)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [])

    const handleAttendance = async (executionId: string) => {
        try {
            setLoading(true)
            const resp = await registerAsistanceToExecution(id, executionId)
            console.log({ resp })
            toast.success('Asistencia marcada con éxito')
        } catch (error) {
            console.error(error)
            const err = error.response?.data
            console.log(err)
            if (err.statusCode === 400) {
                toast.error('Ya has marcado asistencia para esta ejecución')
            }
        } finally {
            setLoading(false)
        }
    }

    if (!training) return <SplashScreen />
    return (
        <div className='w-full h-full flex items-center justify-center pb-6'>
            <Card className="w-full max-w-3xl mx-auto pb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{training.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{MapTrainingModality[training.modality]}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div>
                            <h3 className="font-semibold mb-1">Descripción</h3>
                            <p>{training.description}</p>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-1">Código</h3>
                                <p>{training.code}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Organizador</h3>
                                <p>{typeof training.organizer === "string" ? training.organizer : training.organizer.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Capacidad</h3>
                                <p className="flex items-center">
                                    <UsersIcon className="mr-2 h-4 w-4" />
                                    {training.capacity}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Fecha de finalización</h3>
                                <p className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formatDate(training.executions[training.executions.length - 1].to)}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Horario(s)</h3>
                            <ul className="list-disc pl-5">
                                {training.executions.map((execution, index) => {
                                    const { date, time } = formatDateTimeRange(execution.from, execution.to);
                                    const location = evaluateIfIsPlaceOrLink(execution.place)
                                    return (
                                        <li key={index}>
                                            {date} - {time} - {location}
                                            {user?.role === "professor" && (
                                                <Button variant={'outline'} size={'sm'} className='ml-1 text-xs'
                                                    disabled={execution.participantAttend || loading} onClick={() => handleAttendance(execution.id)}
                                                >Marcar Asistencia</Button>
                                            )}
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Participantes ({training.participantsCount})</h3>
                            {/* <ul className="list-disc pl-5">
                                {training.participants.map((participant, index) => (
                                    <li key={index}>{participant.}</li>
                                ))}
                            </ul> */}
                        </div>

                        <Separator />

                        <div className="text-sm text-gray-500">
                            <p>Creado el: {new Date(training.createdAt).toLocaleString()}</p>
                            <p>ID: {training.id}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AssistanceAutomatic