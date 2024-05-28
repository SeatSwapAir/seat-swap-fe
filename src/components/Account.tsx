import { useState } from 'react';
import { Typography } from '@mui/material';


import {User} from '../../lib/types';
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
      }

export default function Account() {
    const [user, setUser] = useState(mockUser);

    const   {email,
            firstname,
            lastname,
            gender,
            phone,
            rating,
            created_at} = user
   
    return (
        <Typography variant='h2'>
            <ChangePassword/>
            <ChangeContactDetails email = {email}
            firstname = {firstname}
            lastname = {lastname}
            gender = {gender}
            phone = {phone}/>
        </Typography>
    )
}