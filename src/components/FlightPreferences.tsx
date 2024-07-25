import { Typography } from '@mui/material';
import { PreferencesProps } from '../../lib/types';
import { Button } from '@/components/ui/button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function FlightPreferences({
  preferences,
  seatsLength,
}: {
  preferences: PreferencesProps;
  seatsLength: number;
}) {
  console.log('🚀 ~ seatsLength:', seatsLength);
  const {
    legroom_pref,
    window_pref,
    middle_pref,
    aisle_pref,
    front_pref,
    center_pref,
    back_pref,
    same_row_pref,
    neighbouring_row_pref,
    side_by_side_pref,
  } = preferences;

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            className='text-xs underline decoration-dotted p-0 mt-0 border-0 h-0.75'
            variant='outline'
          >
            preferences
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-1'>
              <Typography variant='body2'>
                {seatsLength > 1 && (
                  <>
                    {neighbouring_row_pref
                      ? 'Neighbouring Rows'
                      : 'No Neighbouring Rows'}{' '}
                    - {same_row_pref ? 'Same Row ok' : 'Different Row ok'} -{' '}
                    {side_by_side_pref ? 'Side by Side' : 'No Side by Side'}
                  </>
                )}
                {seatsLength === 1 && (
                  <>
                    {legroom_pref ? 'Extra Legroom' : 'Standard Legroom'} -{' '}
                    {window_pref ? 'Window' : 'No Window'} -{' '}
                    {middle_pref ? 'Middle' : 'No Middle'} -{' '}
                    {aisle_pref ? 'Aisle' : 'No Aisle'} -{' '}
                    {front_pref ? 'Front' : 'No Front'} -{' '}
                    {center_pref ? 'Center' : 'No Center'} -{' '}
                    {back_pref ? 'Back' : 'No Back'}
                  </>
                )}
              </Typography>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
