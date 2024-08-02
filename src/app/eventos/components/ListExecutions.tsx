'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EventStore } from "../store/event.store"
import { Execution } from "@/services/events"
import { cn, evaluateIfIsPlaceOrLink, formatDateShort, formatHour, getDuration } from "@/lib/utils"

interface ListExecutionsProps {
    executions: Execution[]
}
function ListExecutions() {
    const { openExecutions, setOpenExecutions, executionsSelected } = EventStore()

    return (
        <Dialog open={openExecutions} onOpenChange={setOpenExecutions}>
            <DialogContent>
                <DialogTrigger />
                <DialogHeader>
                    <DialogTitle className="pb-4">Calendario del Evento</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-row gap-4 text-black">
                            {executionsSelected.map((execution, index) => (
                                <div key={'ex-' + index} className="flex flex-col  rounded-lg items-center justify-center bg-green-500 gap-0 px-5 py-4 h-auto w-36 text-black">
                                    <h3 className='text-sm font-normal m-0 p-0'>
                                        {formatDateShort(execution.from)}
                                    </h3>
                                    <h2 className='text-3xl md:text-xl font-semibold m-0 p-0'>{formatHour(execution.from)}</h2>
                                    <span className='text-xs font-semibold'>Duración</span>
                                    <span className='text-sm font-medium'>{getDuration(execution.from, execution.to)}</span>
                                    <span className='text-xs font-semibold'>Lugar / Link</span>
                                    <span className='text-sm font-medium  max-w-[144px]'>{evaluateIfIsPlaceOrLink(execution.place)}</span>
                                </div>
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ListExecutions

export const InfoExecution = ({ executions }: ListExecutionsProps) => {
    const { setExecutionsSelected } = EventStore()

    const handleOpen = () => {
        if (executions.length > 1) {
            setExecutionsSelected(executions)
        }
    }
    return (
        <div
            className={cn('relative top-0 left-0 flex flex-col items-center justify-center rounded-lg bg-transparent gap-0 px-5 py-4 w-full h-full md:h-24 md:w-24',
                executions.length > 1 ? 'cursor-pointer info-card' : '')}
            onClick={handleOpen}
        >
            <div
                className={cn('z-30 flex flex-col  rounded-lg items-center justify-center bg-green-500 gap-0 px-5 py-4 w-full h-full md:h-24 md:w-24',
                    executions.length > 1 ? 'animate-bounce' : '')}
            >
                <h3 className='text-sm font-normal m-0 p-0'>
                    {formatDateShort(executions[0].from)}
                </h3>
                <h2 className='text-3xl md:text-xl font-semibold m-0 p-0'>{formatHour(executions[0].from)}</h2>
                <span className='text-xs'>Duración</span>
                <span className='text-sm font-medium'>{getDuration(executions[0].from, executions[0].to)}</span>
            </div>
            {executions.length > 1 && (
                <>
                    <div className='absolute top-2 left-2 rounded-lg bg-green-400 px-5 py-4 hidden md:flex md:h-24 md:w-24 z-20 animate-bounce delay-100'>
                    </div>
                    <div className='absolute top-4 left-4 rounded-lg bg-green-500 px-5 py-4 hidden md:flex md:h-24 md:w-24 z-10 animate-bounce delay-200'>
                    </div>
                </>
            )}
        </div>
    )
}