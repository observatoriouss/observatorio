import { MapTrainingModality, verifyParticipant } from '@/services/events';
import Credential from '../components/credential';
import { formatDateTimeRange, evaluateIfIsPlaceOrLink } from '@/lib/utils';
import VirtualCredential from './components/VirtualCredential';
import ConfettiPage from './components/Confetti';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  console.log({ id: params.id })
  const participant = await verifyParticipant(params.id)
  console.log({ participant })

  return (
    <Suspense fallback={<></>}>
      <ConfettiPage />
      <div className='flex flex-col md:flex-row h-full min-h-screen'>

        <div className='w-full md:w-1/2 bg-black p-4 flex flex-col gap-4'>
          <div className='text-white flex flex-col gap-1 items-center'>
            <div className='flex justify-center align-middle rounded px-2 bg-white text-black text-sm font-bold w-fit'> {participant.training.code} </div>
            <h1 className='text-4xl font-bold'> {participant.training.name} </h1>
            <h2 className='text-xl font-medium'>Modalidad: <b>{MapTrainingModality[participant.training.modality]}</b></h2>
          </div>

          <div className='text-white flex flex-col gap-1 text-center px-8'>
            <h2 className='text-xl font-medium'> <b>Fecha(s):</b> </h2>
            <div className='flex flex-col gap-1'>
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
                fontSize: '14px',
              }}>
                <thead>
                  <tr>
                    <th style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '6px',
                      textAlign: 'center',
                      fontWeight: '600',
                      borderBottom: '2px solid white',
                    }}>Fecha</th>
                    <th style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '6px',
                      textAlign: 'center',
                      fontWeight: '600',
                      borderBottom: '2px solid white',
                    }}>Hora</th>
                    <th style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '6px',
                      textAlign: 'center',
                      fontWeight: '600',
                      borderBottom: '2px solid white',
                    }}>Lugar / Link</th>
                  </tr>
                </thead>
                <tbody>
                  {participant.executions.map((execution) => {
                    const { date, time } = formatDateTimeRange(execution.from, execution.to);
                    return (
                      <tr key={execution.id} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}>
                        <td style={{
                          padding: '6px',
                          color: 'white',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{date}</td>
                        <td style={{
                          padding: '6px',
                          color: 'white',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{time}</td>
                        <td style={{
                          padding: '6px',
                          color: 'white',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{evaluateIfIsPlaceOrLink(execution.place)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='w-full flex justify-center align-middle py-4'>
            <div className='h-1 rounded w-3/4 bg-white text-center' />
          </div>
          <div className='text-white flex flex-col gap-1 text-center'>
            <h2 className='text-2xl font-bold'>¡Felicitaciones!</h2>
            <h2 className='text-xl font-medium'>Has logrado inscribirte a este evento.</h2>
          </div>
          <VirtualCredential participant={participant.participant} />

        </div>

        <div className='w-full md:w-1/2 bg-black'>
          <Credential participant={participant.participant} />
        </div>
      </div>
    </Suspense>
  )
}