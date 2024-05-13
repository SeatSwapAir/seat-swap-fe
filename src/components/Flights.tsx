import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const Flights = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h2' gutterBottom>
          Flights
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Flights;
