import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../util/auth';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  const [setAuth] = useAuth(true);
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false);
    navigate('/')
  };
  const handleLogOut = () => {
    localStorage.removeItem('sign');
    localStorage.removeItem('key');
    setAuth({ sign: '', key: '' });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Do you want to log out?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleLogOut}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
