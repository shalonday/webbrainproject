import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function AlertDialog({open, setOpen, title, negBtnText, posBtnText, onNegBtnClick, onPosBtnClick, children}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onNegBtnClick}>{negBtnText}</Button>
          <Button variant="outlined" onClick={onPosBtnClick}>
            {posBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool, 
  setOpen: PropTypes.func, 
  title: PropTypes.string, 
  negBtnText: PropTypes.string, 
  posBtnText: PropTypes.string, 
  onNegBtnClick: PropTypes.func, 
  onPosBtnClick: PropTypes.func, 
  children: PropTypes.node
}