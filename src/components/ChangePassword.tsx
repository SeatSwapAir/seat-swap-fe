import { useState } from 'react';
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
      <TextField
        InputLabelProps={{ shrink: true }}
        id='outlined-controlled'
        label='Current Password'
        value={oldPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOldPassword(event.target.value);
        }}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        id='outlined-controlled'
        label='New Password'
        value={newPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewPassword(event.target.value);
        }}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        id='outlined-controlled'
        label='Confirm New Password'
        value={confirmNewPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmNewPassword(event.target.value);
        }}
      />
      <Button onClick={doSubmitPassword}>Submit Changes</Button>
    </>
  );
}
