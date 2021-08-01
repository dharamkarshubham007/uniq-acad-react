import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import {createBrowserHistory} from "history";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentHome from "./components/StudentHome";
import InstructorHome from "./components/InstructorHome";
import Spinner from "./components/Spinner";
import Toaster from "./components/Toaster";

const history = createBrowserHistory();
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <ProtectedRoute component={StudentHome} path="/student-dashboard"/>
          <ProtectedRoute component={InstructorHome} path="/instructor-dashboard"/>
        </Switch>
        <Spinner/>
        <Toaster/>
      </Router>
    </div>
  );
}

export default App;
