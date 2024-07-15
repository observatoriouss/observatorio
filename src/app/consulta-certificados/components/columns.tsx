"use client"

import { Button } from "@/components/ui/button"
import { MapTrainingModality, SingleTraining } from "@/services/events"
import { ColumnDef } from "@tanstack/react-table"
import { SearchStore } from "../store/search"

export const columns: ColumnDef<SingleTraining>[] = [
    {
        accessorKey: "code",
        header: "Código",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "organizer",
        header: "Organizador",
        cell(props) {
            const { organizer } = props.row.original
            return organizer === "DDA" ? "DDA" : organizer.name
        },
    },
    {
        accessorKey: "modality",
        header: "Modalidad",
        cell: (props) => MapTrainingModality[props.row.original.modality],
    },
    // {
    //     accessorKey: "executions",
    //     header: "Fecha término",
    //     cell: (props) => {
    //         const { executions } = props.row.original
    //         const lastExecution = executions[executions.length - 1]
    //         return lastExecution.to
    //     },
    // },
    {
        accessorKey: "participant",
        header: "Estado",
        cell: (props) => {
            const { participant } = props.row.original
            return participant.certificate ? "Aprobado" : "Pendiente"
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { participant } = row.original
            const { downloadCertificate } = SearchStore()

            if (!participant.certificate) return <></>

            return (
                // Descargar certificado
                <Button
                    size={"sm"}
                    onClick={() => {
                        if (!participant) return
                        downloadCertificate(participant)
                    }}
                >
                    <span className="text-xs">Descargar certificado</span>
                </Button>
            )
        },
    },
]
