import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {hideToaster} from "../redux/actions/ToasterActions";
import ReactDOM from "react-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toaster = () => {
    const dispatch = useDispatch();
    const {show, message, severity} = useSelector(state => state.toaster);
    const toaster = (
        <Snackbar open={show}
                   autoHideDuration={4000}
                   onClose={() => dispatch(hideToaster())}
                   anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>)
    return ReactDOM.createPortal(toaster, document.getElementById('toaster'))

}

export default Toaster;