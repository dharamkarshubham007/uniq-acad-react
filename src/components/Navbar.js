import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import {
  AccountBoxSharp,
  AddCircle,
  Assignment,
  Ballot,
  ExitToApp,
  LockOpen
} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {INSTRUCTOR, STUDENT} from "../appConstants";
import {logout} from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: "20px"
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.logout();
    history.push('/login')
  }

  const getNavigationLinks = () => {
    let links = [];
    if( props.user.token ) {
      if(props.user.user.role == INSTRUCTOR) {
        links = [{
          id: "my_courses",
          name: "My Courses",
          to: "/instructor-dashboard",
          icon: <Assignment/>
        }, {
          id: "create_courses",
          name: "Create Courses",
          to: "/instructor-dashboard/create-course",
          icon: <AddCircle/>
        }]
      } else if( props.user.user.role == STUDENT) {
        links = [{
          id: "enrolled_courses",
          name: "Enrolled Courses",
          to: "/student-dashboard",
          icon: <Assignment/>
        }, {
          id: "available_courses",
          name: "Available Courses",
          to: "/student-dashboard/available-courses",
          icon: <Ballot/>
        }]
      }
    } else {
      links = [{
        id: "login",
        name: "Login",
        to: "/login",
        icon: <LockOpen/>
      }, {
        id: "register",
        name: "Register",
        to: "/register",
        icon: <AccountBoxSharp/>
      }]
    }
    return links;
  }
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Uniq Acad
        </Typography>
        {getNavigationLinks().map((item) => {
          return (
              <Button
                  key={item.id}
                  color="inherit"
                  startIcon={item.icon}
                  component={Link }
                  to={item.to}
              >
                {item.name}
              </Button>
          )
          })
        }
        {props.user.token ? (
            <Button
                color="inherit"
                startIcon={<ExitToApp/>}
                onClick={handleLogout}
            >
              Logout
            </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
