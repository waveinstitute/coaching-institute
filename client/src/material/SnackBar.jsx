import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar({children, type}) {
  const [open, setOpen] = React.useState(true);
  const alertType = type === 'success' ? 'success' : 'error';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
            {children}
        </Alert>
      </Snackbar>
    </div>
  );
}