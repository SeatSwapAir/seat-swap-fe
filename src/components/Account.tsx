import { useState } from 'react';
import {
  Typography,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { UserProps } from '../../lib/types';
import ChangePassword from './ChangePassword';
import ChangeContactDetails from './ChangeContactDetails';

const mockUser: UserProps = {
  email: 'testuser@gmail.com',
  firstname: 'Bob',
  lastname: 'Marley',
  gender: 1,
  phone: 123456789,
  rating: 4.2,
  created_at: '1979-04-02',
};

export default function Account() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleDelteAccount = () => {
    setOpenDialog(false);
    console.log('backend request to delete account');
  };

  const { email, firstname, lastname, gender, phone, rating, created_at } =
    mockUser;

  return (
    <>
      <Typography>Account Settings</Typography>
      <Typography>
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
      <Typography>Your account has been created on {created_at}</Typography>

      <Button
        variant='outlined'
        color='error'
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete Account Permanently
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        disableRestoreFocus
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Your account and all data will be lost!{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color='error' onClick={handleDelteAccount}>
            Delete Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
