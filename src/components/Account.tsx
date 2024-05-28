import { useState } from 'react';
import { Typography, Rating } from '@mui/material';

import { User } from '../../lib/types';
import ChangePassword from './ChangePassword';
import ChangeContactDetails from './ChangeContactDetails';

const mockUser: User = {
  email: 'testuser@gmail.com',
  firstname: 'Bob',
  lastname: 'Marley',
  gender: 1,
  phone: 123456789,
  rating: 4.2,
  created_at: '1979-04-02',
};

export default function Account() {
  const [user, setUser] = useState(mockUser);

  const { email, firstname, lastname, gender, phone, rating, created_at } =
    user;

  return (
    <Typography variant='body1'>
      <Typography variant='h4'>Account Settings</Typography>
      <Typography variant='h6'>
        Hello {firstname} {lastname}!
      </Typography>
      <Typography component='legend'>Your rating is:</Typography>
      <Rating name='read-only' value={rating} readOnly />
      <ChangePassword />
      <ChangeContactDetails
        email={email}
        firstname={firstname}
        lastname={lastname}
        gender={gender}
        phone={phone}
      />
    </Typography>
  );
}
