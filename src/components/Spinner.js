import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Spinner = () => {
    const classes = useStyles();
    const {show} = useSelector(state => state.spinner);
    const loader = (
        <div>
            <Backdrop className={classes.backdrop} open={show}>
                <CircularProgress color="secondary" />
            </Backdrop>
        </div>
    );
    return ReactDOM.createPortal(loader, document.getElementById('spinner'))
}

export default Spinner;