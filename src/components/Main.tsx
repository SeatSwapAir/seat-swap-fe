import FindFlight from './FindFlight';
import { useFlightsByUserId } from '../hooks/queries';
import { Separator } from '@/components/ui/separator';
import Flights2 from './Flights2';

export default function Main() {
  const FlightsByUserIdQuery = useFlightsByUserId(21);

  return (
    <div className='grid-flow-row'>
      <h3>Choose or add your journey</h3>
      <div className='grid lg:flex lg:flex-row lg:w-[1000px] md:w-[768px]'>
        <div className='min-w-[45%]'>
          <FindFlight flights={FlightsByUserIdQuery.data || []} />
        </div>
        <Separator
          className='my-4 lg:my-0 lg:mx-4 lg:h-auto lg:w-px'
          orientation='horizontal'
        />
        <div className='min-w-[45%]'>
          <Flights2 />
        </div>
      </div>
    </div>
  );
}
