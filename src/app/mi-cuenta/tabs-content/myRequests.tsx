'use client'
import { useEffect } from 'react';
import { DataTableRequests } from '../components/table';
import { columns } from '../components/columns';
import { useRequestStore } from '../store/requests.store';
import { useAuthStore } from '@/app/store/session';
import ModalRequest from '../components/ModalRequest';

function MyRequests() {
  const user = useAuthStore(state => state.user);
  const myRequests = useRequestStore(state => state.myRequests)
  const getRequestsByUser = useRequestStore(state => state.getRequestsByUser)
  const loading = useRequestStore(state => state.loading)
  const open = useRequestStore(state => state.open)

  useEffect(() => {
    if (!user) return
    getRequestsByUser(user?.id)
  }, [user])
  if (!user) return null;
  return (
    <div>
      <h1 className='uppercase text-green-800 font-bold text-xl pb-4'>MIS SOLICITUDES</h1>
      {loading ? <p>Cargando...</p> : (
        <DataTableRequests columns={columns} data={myRequests} />
      )}
      {open && <ModalRequest />}
    </div>
  )
}

export default MyRequests