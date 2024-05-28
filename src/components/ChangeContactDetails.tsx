import { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
export default function ChangeContactDetails({email,
    firstname,
    lastname,
    gender,
    phone}: {email: string,
        firstname: string,
        lastname: string,
        gender: number,
        phone: number,}) {
    const [userEmail, setUserEmail] = useState(email);
    const [firstName, setFirstName] = useState(firstname);
    const [lastName, setLastName] = useState(lastname);
    const [userGender, setUserGender] = useState(gender);
    const [userPhone, setUserPhone] = useState(phone);

    const mockGenders: { name: string, genderId: number }[] = [
        {name: 'male',
        genderId: 0
    },
    {name: 'female',
        genderId: 1
    },
    {name: 'other',
        genderId: 2
    }
    ]

    const doGender = (event: SelectChangeEvent<number>) => {
        setUserGender(Number(event.target.value));
      };

      const doSubmitContactDetails = () => {
            console.log(userEmail, firstName, lastName, userGender, userPhone)
    }

    return (
        <>
         <Typography variant='h4'>
            Email:
            <TextField
        id="outlined-controlled"
        label="Email"
        value={userEmail}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserEmail(event.target.value);
        }}
      />
        </Typography>
        <Typography variant='h4'>
            First Name:
            <TextField
        id="outlined-controlled"
        label="First Name"
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(event.target.value);
        }}
      />
        </Typography>
        <Typography variant='h4'>
            Last Name:
            <TextField
        id="outlined-controlled"
        label="Last Name"
        value={lastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLastName(event.target.value);
        }}
      />
        </Typography>
        <Typography variant='h4'>
            Phone Number:
            <TextField
        id="outlined-controlled"
        label="Last Name"
        value={userPhone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserPhone(Number(event.target.value));
        }}
      />
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={userGender}
              label='Row Number'
              onChange={doGender}
            >
              {mockGenders.map((mockGender) => (
                <MenuItem key={mockGender.genderId.toString()} value={mockGender.genderId}>
                  {mockGender.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={doSubmitContactDetails}>Submit Changes</Button>    
        </>
    )
}