import { useMediaQuery } from '@/hooks/use-media-query';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';

export default function MainMenu() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? (
    <div>desktop</div>
  ) : (
    <div>
      <Drawer direction='right'>
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <ul>
            <li>Account</li>
            <li>Your Journeys</li>
            <li>Revews</li>
            <li>Logout</li>
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
