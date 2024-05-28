import { useState } from 'react';
import { Typography } from '@mui/material';


import {User} from '../../lib/types';
import ChangePassword from './ChangePassword';


export default function AccountPage({
        user
}: {user: User}) {
    return (
        <Typography variant='h2'>
            <ChangePassword/>
        </Typography>
    )
}