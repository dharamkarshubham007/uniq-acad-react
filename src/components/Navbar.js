import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { AccountBoxSharp, LockOpen } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
}));

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Uniq Acad
        </Typography>
        <Button
          color="inherit"
          startIcon={<LockOpen />}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          color="inherit"
          startIcon={<AccountBoxSharp />}
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
