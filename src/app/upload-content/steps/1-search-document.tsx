'use client'
import { Button } from '@/components/ui/button'
import { StepStore } from '../store/steps.store'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'

function SearchDocument() {
    const { searchDocument, loading } = StepStore()

    const { register, handleSubmit, formState: { errors } } = useForm<{
        documentNumber: number,
    }>({
        values: {
            documentNumber: '' as unknown as number,
        }
    })

    const onSubmit = handleSubmit(({ documentNumber }) => {
        searchDocument(documentNumber)
    })
    return (
        <div className='container mx-auto bg-white p-12'>
            <h1 className='text-2xl font-bold text-center'>Verificación de DNI</h1>
            <form onSubmit={onSubmit} className="py-4">
                <div className="grid w-full gap-1.5">
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
                </div>
                <Button
                    type='submit'
                    className='w-full mt-4'
                    disabled={loading}
                >
                    Verificar
                </Button>
            </form>
            <p className='text-sm text-center mt-4'>Ingrese su DNI para verificar su registro</p>
        </div>
    )
}

export default SearchDocument
// <div>
//     <h1>SearchDocument</h1>
//     <Button onClick={() => setSteps(Steps.DataValidation)}>Next</Button>
// </div>