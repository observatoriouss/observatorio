'use client';
import { getResourcesCredential, MapTrainingModality, ResourcesCredential, VerifyParticipant, verifyParticipant } from '@/services/events';
import Credential from '../components/credential';
import { formatDateTimeRange, evaluateIfIsPlaceOrLink } from '@/lib/utils';
import VirtualCredential from './components/VirtualCredential';
import ConfettiPage from './components/Confetti';
import ShareCredential from './components/ShareCredential';
import { useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function Page({ params }: { params: { id: string } }) {
  const [participant, setParticipant] = useState<VerifyParticipant | undefined>(undefined);
  const [resources, setResources] = useState<ResourcesCredential | undefined>(undefined);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const [participant, resources] = await Promise.all([
          verifyParticipant(params.id),
          getResourcesCredential(),
        ]);
        setParticipant(participant);
        setResources(resources);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, [])

  if (loading || !participant || !resources) {
    return <SplashScreen />
  }

  // Renderizado del componente con los datos
  return (
    <div className='flex flex-col md:flex-row h-full min-h-screen'>
      <ConfettiPage />

      <div className='w-full md:w-1/2 bg-black p-4 flex flex-col gap-4 overflow-y-auto max-h-screen'>
        <div className='text-white flex flex-col gap-1 items-center'>
          <div className='flex justify-center align-middle rounded px-2 bg-white text-black text-sm font-bold w-fit'>
            {participant.training.code}
          </div>
          <h1 className='text-4xl font-bold'>{participant.training.name}</h1>
          <h2 className='text-xl font-medium'>Modalidad: <b>{MapTrainingModality[participant.training.modality]}</b></h2>
        </div>

        <div className='text-white flex flex-col gap-1 text-center px-8'>
          <h2 className='text-xl font-medium'><b>Fecha(s):</b></h2>
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

        <ShareCredential participant={participant} />

        <div className='w-full flex justify-center align-middle py-4'>
          <div className='h-1 rounded w-3/4 bg-white text-center' />
        </div>
        <div className='text-white flex flex-col gap-1 text-center'>
          <h2 className='text-2xl font-bold'>¡Felicitaciones!</h2>
          <h2 className='text-xl font-medium'>Has logrado inscribirte a este evento.</h2>
        </div>
        <VirtualCredential participant={participant.participant} />
      </div>

      <div className='w-full md:w-1/2 bg-black hidden md:block'>
        <Credential participant={participant.participant} resources={resources} />
      </div>
    </div>
  );
}
