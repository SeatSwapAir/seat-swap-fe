import { useState } from 'react';
import { Typography } from '@mui/material';


import {User} from '../../lib/types';
import ChangePassword from './ChangePassword';

export default function Account() {
    return (
        <Typography variant='h2'>
            <ChangePassword/>
        </Typography>
    )
}