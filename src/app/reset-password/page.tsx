import { Suspense } from 'react'
import FormResetPassword from './components/form'
import SplashScreen from '@/components/SplashScreen'

export default function Page() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <FormResetPassword />
        </Suspense>
    )
}