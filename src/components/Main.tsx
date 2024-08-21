import FindFlight from './FindFlight';
import { useFlightsByUserId } from '../hooks/queries';
import { Separator } from '@/components/ui/separator';
import Flights from './Flights';

export default function Main() {
  const FlightsByUserIdQuery = useFlightsByUserId(21);

  return (
    <div className='grid-flow-row'>
      <h3 className='text-3xl py-6'>Add or pick a journey to edit!</h3>
      <div className='grid place-items-center pt-4'>
        <div className='grid lg:flex lg:flex-row lg:w-[1000px] justify-center'>
          <div className='min-w-[45%]'>
            <FindFlight flights={FlightsByUserIdQuery.data || []} />
          </div>
          <Separator
            className='my-4 lg:my-0 lg:mx-[50px] lg:h-auto lg:w-px max-w-[450px]'
            orientation='horizontal'
          />
          <div className='min-w-[45%]'>
            <Flights />
          </div>
        </div>
      </div>
    </div>
  );
}
