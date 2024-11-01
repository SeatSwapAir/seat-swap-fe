import { useMediaQuery } from '@/hooks/use-media-query';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function MainMenu() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return isDesktop ? (
    <div className=''>
      <ul className='flex flex-row gap-4 p-4'>
        {/* <li>Account</li>
        <li>Your Journeys</li>
        <li>Add Journey</li>
        <li>Reviews</li> */}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
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
            {/* <li>Account</li>
            <li>Your Journeys</li>
            <li>Add Journey</li>
            <li>Reviews</li> */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
