import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Link, useHistory} from "react-router-dom";
import Copyright from "./Copyright";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useMutation} from "@apollo/client";
import {SIGN_UP} from "../graphql/mutations";
import {ERROR_TYPE, INSTRUCTOR, STUDENT, SUCCESS_TYPE} from "../appConstants";
import {toggleSpinner} from "../redux/actions/spinnerActions";
import {setUserDetails} from "../redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {showToaster} from "../redux/actions/ToasterActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register(props) {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUp] = useMutation(SIGN_UP);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email == '' || password == '' || confirmPassword == '' || firstName == '' || lastName == '' || role == '') {
            return false;
        }

        if(password != confirmPassword) {
            return false;
        }

        try {
            dispatch(toggleSpinner());
            const response = await signUp({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    role: role,
                }
            });
            const {data} = response;

            if (data) {
                let {user, token} = data.signUp;
                user = {...user, role};
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                dispatch(setUserDetails({user, token}));
                dispatch(toggleSpinner());
                dispatch(showToaster("Welcome!!", SUCCESS_TYPE));
                if (user.role == STUDENT) {
                    history.push("/student-dashboard");
                } else if (user.role == INSTRUCTOR) {
                    history.push("/instructor-dashboard");
                }
            }
        } catch (e) {
            dispatch(showToaster(e.message, ERROR_TYPE));
            dispatch(toggleSpinner());
        }
    }

    if(user.token) {
        if(user.user.role == INSTRUCTOR) {
            history.push('/instructor-dashboard')
        } else if (user.user.role == STUDENT) {
            history.push('/student-dashboard')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    label="Role"
                                    name="role"
                                    required
                                >
                                    <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
                                    <MenuItem value="STUDENT">Student</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default Register;
