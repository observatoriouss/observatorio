'use client'
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailsAccount from './tabs-content/detailsAccount';
import MyRequests from './tabs-content/myRequests';
import { useAuthStore } from '../store/session';
import { useRouter } from 'next/navigation';

function MyAccountPage() {
    const navigate = useRouter();
    const user = useAuthStore(state => state.user);
    const hasHydrated = useAuthStore(state => state._hasHydrated);

    useEffect(() => {
        if (!hasHydrated) return
        if (!user) {
            navigate.push('/iniciar-sesion')
        }
    }, [hasHydrated, user])

    return (
        <div className='py-4 md:py-6 flex flex-col gap-4'>
            <div className='p-4 bg-uss-green'>
                <h3 className='font-medium'>Bienvenido</h3>
                <h2 className='font-bold text-lg'>{user?.name}</h2>
            </div>

            <Tabs defaultValue="account">
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full h-full md:w-1/5 py-6'>
                        <TabsList className='flex flex-col gap-2 h-20'>
                            <TabsTrigger value="account" className='w-full'>Detalles de cuenta</TabsTrigger>
                            <TabsTrigger value="requests" className='w-full'>Mis Solicitudes</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className='w-full md:w-4/5 py-6'>
                        <TabsContent value="account">
                            <DetailsAccount />
                        </TabsContent>
                        <TabsContent value="requests">
                            <MyRequests />
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default MyAccountPage