'use client';
import { Button } from '@/components/ui/button';
import { Training } from '@/services/events'
import { useEventStore } from '../store/event.store';

function BtnInscription(
  { training }: { training: Training }
) {
  const setOpen = useEventStore(state => state.setOpen)
  const setTrainingSelected = useEventStore(state => state.setTrainingSelected)
  const OnClick = () => {
    setOpen(true)
    setTrainingSelected(training)
  }
  return (
    <Button onClick={OnClick} className='text-xs text-white bg-black px-2 m-0 h-8 w-full rounded-md'>Inscribirme</Button>
  )
}

export default BtnInscription