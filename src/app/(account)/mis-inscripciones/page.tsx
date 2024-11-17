'use client'
import { useEffect } from 'react';
import { DataTableRequests } from '../components/table';
import { useAuthStore } from "@/stores/session";
import { useSearchStore } from '@/app/consulta-certificados/store/search';
import { columns } from '../components/columns-inscriptions';
import SplashScreen from '@/components/SplashScreen';

function MyInscriptions() {
    const user = useAuthStore(state => state.user);
    const trainings = useSearchStore(state => state.trainings)
    const getCertificationsByDNI = useSearchStore(state => state.getCertificationsByDNI)
    const loading = useSearchStore(state => state.loading)

    useEffect(() => {
        if (!user.documentNumber || !user.documentType) return
        getCertificationsByDNI(user.documentNumber, user.documentType)
    }, [user, getCertificationsByDNI])

    if (!user) return <SplashScreen />;
    return (
        <div>
            <h2 className="text-3xl xl:text-4xl font-semibold mb-8">Mis Inscripciones a Eventos</h2>
            {loading ? <p>Cargando...</p> : (
                <DataTableRequests columns={columns} data={trainings?.trainings || []} />
            )}
        </div>
    )
}

export default MyInscriptions