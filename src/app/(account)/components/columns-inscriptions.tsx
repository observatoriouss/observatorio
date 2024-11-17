"use client"

import { useSearchStore } from "@/app/consulta-certificados/store/search";
import { Button } from "@/components/ui/button"
import { MapRoleInscription, MapTrainingModality, SingleTraining } from "@/services/events"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useRouter } from 'next/navigation'

const CellComponent = ({ row }: { row: Row<SingleTraining> }) => {
    const { participant } = row.original
    const navigate = useRouter()
    const downloadCertificate = useSearchStore(state => state.downloadCertificate)

    if (!participant.certificates?.length) return <Button
        size={"sm"}
        className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-80 mr-1"
        onClick={() => {
            navigate.push(`/inscripcion-completada/${participant.id}`)
        }}
    >
        <span className="text-xs">Ver Inscripción</span>
    </Button>

    return (
        // Descargar certificado
        <>
            {participant.certificates && (
                <div className="flex flex-row gap-1">
                    {participant.certificates.map((certificate) => (
                        <Button
                            key={certificate.id}
                            size={"sm"}
                            className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-80"
                            onClick={() => {
                                if (!participant) return
                                downloadCertificate(certificate)
                            }}
                        >
                            <span className="text-xs">Certificado {MapRoleInscription[certificate.role]}</span>
                        </Button>
                    ))}
                </div>
            )}
        </>
    )
};

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
    {
        accessorKey: "participant",
        header: "Estado",
        cell: (props) => {
            const { participant } = props.row.original
            return participant.certificates?.length ? "Aprobado" : "Pendiente"
        },
    },
    {
        id: "actions",
        cell: CellComponent
    },
]
