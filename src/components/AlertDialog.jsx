import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

export default function AlertDialog({open, setOpen, title, negBtnText, posBtnText, onNegBtnClick, onPosBtnClick, children}) {

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            onClose={handleClose}
            open={open}
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
                <Button
                    onClick={onNegBtnClick}
                    variant="outlined"
                >
                    {negBtnText}
                </Button>
                <Button
                    onClick={onPosBtnClick}
                    variant="outlined"
                >
                    {posBtnText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.propTypes = {
    children: PropTypes.node.isRequired, 
    negBtnText: PropTypes.string.isRequired, 
    onNegBtnClick: PropTypes.func.isRequired, 
    onPosBtnClick: PropTypes.func.isRequired, 
    open: PropTypes.bool.isRequired, 
    posBtnText: PropTypes.string.isRequired, 
    setOpen: PropTypes.func.isRequired, 
    title: PropTypes.string.isRequired
}