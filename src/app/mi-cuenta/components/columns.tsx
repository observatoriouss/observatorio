"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MapApprovalStatus, Request } from "@/services/requests"
import { formatDate } from "@/lib/utils"
import { Category, categoryMapper } from '@/services/home';
import { Button } from "@/components/ui/button";
import { Edit, ListX } from "lucide-react";
import { RequestStore } from "../store/requests.store";

export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "category",
        header: "Categoría",
        cell({ row }) {
            const { category } = row.original
            return categoryMapper[category as Category]
        },
    },
    {
        accessorKey: "createdAt",
        header: "Fecha creación",
        cell({ row }) {
            const { createdAt } = row.original
            return formatDate(createdAt)
        },
    },
    {
        accessorKey: "approvalStatus",
        header: "Estado",
        cell({ row }) {
            const { approvalStatus } = row.original
            return MapApprovalStatus[approvalStatus]
        },
        // cell: (props) => MapTrainingModality[props.row.original.modality],
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { rejectionReasons, approvalStatus, id, slug } = row.original
            const { setRequestSelected } = RequestStore()

            // if (!participant.certificate) return <></>

            return (
                <div className="flex flex-row gap-1">
                    {
                        rejectionReasons?.length ? (
                            <Button className='bg-transparent shadow-none hover:bg-transparent border border-purple-500 h-7 w-7 p-1'
                            onClick={() => setRequestSelected(id, 'list-rejects')}
                            >
                                <ListX className="text-purple-500" />
                            </Button>
                        ) : (<> </>)
                    }
                    {
                        approvalStatus === 'rejected' && (
                            <Button className='bg-transparent shadow-none hover:bg-transparent border border-green-500 h-7 w-7 p-1'
                            onClick={() => setRequestSelected(slug, 'edit-request')}
                            >
                                <Edit className="text-green-500" />
                            </Button>
                        )
                    }
                </div>

            )
        },
    },
]
