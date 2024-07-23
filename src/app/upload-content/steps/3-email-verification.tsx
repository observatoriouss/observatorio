'use client'
import { Button } from '@/components/ui/button'
import { Steps, StepStore } from '../store/steps.store'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

function EmailVerification() {
    const { loading, fillOTP, otp, confirmOTP } = StepStore();

    return (
        <div className='container mx-auto bg-white py-12 md:p-12 w-full'>
            <h1 className='text-2xl font-bold text-center'>
                Verificación de Email
            </h1>
            <div className="flex flex-col gap-4 w-full shadow-md pb-12 p-2 md:p-12">
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-center">Para verificar su autenticidad, revise su correo electrónico e ingrese el código de verificación.</span>
                </div>

                <div className="flex justify-center md:pb-8">
                    <InputOTP
                        disabled={loading}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        onChange={(e) => {
                            fillOTP(e)
                        }}
                        >
                        <InputOTPGroup>
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={0} />
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={1} />
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={3} />
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={4} />
                            <InputOTPSlot className='md:h-24 md:w-24 md:text-3xl font-semibold' index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button
                    type='submit'
                    className='w-full'
                    disabled={loading || otp.length < 6}
                    onClick={confirmOTP}
                >
                    Verificar
                </Button>
            </div>
        </div>
    )
}

export default EmailVerification