import React, { memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Errorimg from '../../assets/Gif/error1.gif'
import error from '../../assets/sound/default_error.mp3'
import { useSelector } from 'react-redux';
import style from './Notification.module.css';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Error(props) {
    // const Globalissound = useSelector(state => state && state.settings );
    // const issoundnotification = Globalissound ? Globalissound.issoundnotification : false

    // const sound = new Audio(error);
    const deletesession = props.deletesession
    return (
        <Dialog
            // onOpen={(props.data.errorFlag && issoundnotification) ? sound.play() : false}
            open={props.data.errorFlag}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.Close}
            aria-describedby="alert-dialog-slide-description"
            className={`poup-notification ${style.poupNotification}`}
        >
            <DialogTitle className={style.notificationHeading}>
                {"ERROR"}
            </DialogTitle>
            <DialogContent>
                <div className="d-flex align-items-center ">
                    <img className={style.notificationImg} src={Errorimg} alt="Errorimg" />
                    <DialogContentText id="alert-dialog-slide-description" className={`popup-notification-message ${style.message}`}>
                        {props.data.errorMsg}
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
            {props.data.activesession ? <Button onClick={deletesession}>Logout All Session</Button> : null}
                <Button onClick={props.Close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(Error)