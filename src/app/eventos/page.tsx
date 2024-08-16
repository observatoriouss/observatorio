import { getEvents, MapTrainingModality } from '@/services/events';
import Inscription from './components/Inscription';
import ListExecutions, { InfoExecution } from './components/ListExecutions';
import { Toaster } from 'sonner';
import ChargeData from './components/ChargeData';
import BtnInscription from './components/BtnInscription';

export const dynamic = 'force-dynamic';

async function fetchData() {
  try {
    const events = await getEvents()
    return { events }
  } catch (error) {
    console.error(error)
    return { events: [] }
  }
}
async function Events() {
  const { events } = await fetchData()
  return (
    <div className='container mx-auto min-h-[600px] flex flex-col justify-center items-center gap-4 py-5'>
      <ChargeData />
      <div>
        <h1 className='text-4xl font-bold text-uss-black'>Eventos</h1>
      </div>

      <section className='flex flex-col gap-4  min-w-full'>

        {events.length === 0 && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-2xl font-bold'>No hay eventos disponibles</h1>
            <p>Por favor, vuelve más tarde.</p>
          </div>

        )}
        {events.map((evt, index) => (
          <div className='flex flex-col md:flex-row rounded-xl gap-8 min-w-full h-full bg-white p-4 shadow-lg' key={index}>
            <InfoExecution executions={evt.executions} />

            <div className='flex flex-col gap-1 w-full justify-center'>
              <span className='bg-black px-3 p-1 text-white text-[10px] w-fit rounded-md'>{evt.code}</span>
              <h1 className='text-2xl font-bold'>{evt.name}</h1>
              <p className='text-sm font-light'><b>Organizador:</b> {evt.organizer === 'DDA' ? 'DDA' : evt.organizer.name}</p>
              <p className='text-sm font-light'><b>Modalidad:</b> {MapTrainingModality[evt.modality]}</p>
              <p className='text-sm font-light'>
                {evt.description?.length > 100 ? evt.description?.slice(0, 100) + '...' : evt.description}
              </p>
            </div>

            <div className='flex justify-center h-fit items-center p-2'>
              <BtnInscription training={evt} />
            </div>
          </div>
        ))}
        <Inscription />
        <ListExecutions />
      </section>
      <Toaster />
    </div>
  )
}

export default Events