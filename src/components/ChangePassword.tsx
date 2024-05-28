import { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const doSubmitPassword = () => {
    if (newPassword === confirmNewPassword) {
      console.log('password submitted to backend');
    } else {
      console.log('new password does not match confirmed one');
    }
  };
  return (
    <>
      <Typography>Current Password:</Typography>
      <TextField
        id='outlined-controlled'
        label='Controlled'
        value={oldPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOldPassword(event.target.value);
        }}
      />
      <Typography>New Password:</Typography>
      <TextField
        id='outlined-controlled'
        label='Controlled'
        value={newPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewPassword(event.target.value);
        }}
      />
      <Typography>Confirm New Password:</Typography>
      <TextField
        id='outlined-controlled'
        label='Controlled'
        value={confirmNewPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmNewPassword(event.target.value);
        }}
      />
      <Button onClick={doSubmitPassword}>Submit Changes</Button>
    </>
  );
}
