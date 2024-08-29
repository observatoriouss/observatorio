'use client'
import { useEffect } from 'react';
import { DataTableRequests } from '../components/table';
import { columns } from '../components/columns';
import { RequestStore } from '../store/requests.store';
import useStore from '@/hooks/useStore';
import { authStore } from '@/app/store/session';
import ModalRequest from '../components/ModalRequest';

function MyRequests() {
  const session = useStore(authStore, (state) => state)!;
  const { myRequests, getRequestsByUser, loading, open } = RequestStore()
  useEffect(() => {
    console.log('asdasda')
    if (!session?.user) return
    getRequestsByUser(session?.user?.id!)
  }, [session?.user])
  if (!session?.user) return
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