import { useMediaQuery } from '@/hooks/use-media-query';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';

export default function MainMenu() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? (
    <div className=''>
      <ul className='flex flex-row gap-4 p-4'>
        <li>Account</li>
        <li>Your Journeys</li>
        <li>Add Journey</li>
        <li>Reviews</li>
        <li>Logout</li>
      </ul>
    </div>
  ) : (
    <div>
      <Drawer direction='right'>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <ul className='flex flex-col gap-4 p-4'>
            <li>Account</li>
            <li>Your Journeys</li>
            <li>Add Journey</li>
            <li>Reviews</li>
            <li>Logout</li>
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
