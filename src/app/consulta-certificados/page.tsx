'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SearchStore } from "./store/search";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { DataTableCertificates } from "./components/table";
import { columns } from "./components/columns";

function Page() {
    const { loading, getCertificationsByDNI, trainings } = SearchStore()
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm({
        values: {
            documentNumber: '' as unknown as number,
        }
    })
    const { documentNumber } = watch()

    useEffect(() => {
        if (!documentNumber) return

        if (documentNumber.toString().length === 8) {
            getCertificationsByDNI(documentNumber)
        }
    }, [documentNumber])
    return (
        <div className='pt-6 pb-12 px-6 lg:px-0 flex flex-col gap-4 md:gap-6 w-full items-center text-left'>
            <Toaster />
            <div className='lg:max-w-[960px] w-full px-0 md:px-12 xl:px-4'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-uss-black font-bold '>Consulta tus Certificaciones</h1>
            </div>

            <div className='lg:max-w-[960px] px-0 md:px-12 xl:px-4 flex flex-col gap-4'>
                <p>Ofrecemos este servicio para que puedas consultar tus certificaciones de manera rápida y sencilla. Solo debes ingresar tu número de DNI y te mostraremos todas las certificaciones que tengas asociadas a ese número.</p>

                <div className="grid w-1/3 gap-1.5">
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
                    <span className="text-blue-500 text-xs">{loading && (
                        <>Realizando búsqueda...</>
                    )}</span>
                </div>
            </div>

            {trainings && trainings.trainings.length > 0 && (
                <div className='w-full flex flex-col gap-4 lg:max-w-[960px]'>
                    <h2 className='w-full mx-auto px-0 md:px-12 xl:px-4 text-xl md:text-2xl lg:text-3xl'>Certificaciones encontradas</h2>

                    <div className="w-full mx-auto px-0 md:px-12 xl:px-4">
                        <DataTableCertificates columns={columns} data={trainings.trainings} />
                    </div>
                </div>
            )}
            {trainings && trainings.trainings.length === 0 && (
                <div className='w-full flex flex-col gap-4 lg:max-w-[960px]'>
                    <h2 className='w-full mx-auto px-0 md:px-12 xl:px-4 text-xl md:text-2xl lg:text-3xl'>No se encontraron certificaciones</h2>

                </div>
            )}
        </div>
    )
}

export default Page