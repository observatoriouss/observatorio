'use client'
import { useEffect } from 'react';
import { DataTableRequests } from '../components/table';
import { columns } from '../components/columns';
import { useRequestStore } from '../store/requests.store';
import ModalRequest from '../components/ModalRequest';
import { useAuthStore } from "@/stores/session";
import SplashScreen from '@/components/SplashScreen';

function MyRequests() {
    const user = useAuthStore(state => state.user);
    const myRequests = useRequestStore(state => state.myRequests)
    const getRequestsByUser = useRequestStore(state => state.getRequestsByUser)
    const loading = useRequestStore(state => state.loading)
    const open = useRequestStore(state => state.open)

    useEffect(() => {
        getRequestsByUser(user.id)
    }, [user, getRequestsByUser])

    if (!user) return <SplashScreen />;

    return (
        <div className='overflow-x-auto container mx-auto'>
            <h2 className="text-3xl xl:text-4xl font-semibold mb-8">Mis Solicitudes de Post</h2>
            {loading ? <p>Cargando...</p> : (
                <DataTableRequests columns={columns} data={myRequests} />
            )}
            {open && <ModalRequest />}
        </div>
    )
}

export default MyRequests