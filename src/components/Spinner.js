import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Spinner = (props) => {
    const classes = useStyles();

    const loader = (
        <div>
            <Backdrop className={classes.backdrop} open={props.show}>
                <CircularProgress color="secondary" />
            </Backdrop>
        </div>
    );
    return ReactDOM.createPortal(loader, document.getElementById('spinner'))
}
const mapStateToProps = (state) => {
    return {
        show: state.spinner.show
    }
}

export default connect(mapStateToProps, null)(Spinner)