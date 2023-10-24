import React, { memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import success from '../../assets/sound/default_success.mp3';
import successimg from '../../assets/Gif/successful1.gif';
import { useSelector } from 'react-redux';
import style from './Notification.module.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Success(props) {
    // const sound = new Audio(success);
    return (
        <Dialog
            // onOpen={props.data.successFlag && state && state.settings.issoundnotification && sound.play()}
            // onOpen={props.data.successFlag && Globalissound && Globalissound.issoundnotification && sound.play()}
            open={props.data.successFlag}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.Close}
            aria-describedby="alert-dialog-slide-description"
            className={`poup-notification ${style.poupNotification}`}
        >
            <DialogTitle className={style.notificationHeading}>
                {"SUCCESS"}</DialogTitle>
            <DialogContent>
                <div className="d-flex align-items-center ">
                    <img className={style.notificationImg} src={successimg} alt="successimg" />
                    <DialogContentText id="alert-dialog-slide-description" className={`popup-notification-message ${style.message}`}>
                        {props.data.successMsg}
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.Close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(Success)