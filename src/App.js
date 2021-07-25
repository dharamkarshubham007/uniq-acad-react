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

const history = createBrowserHistory();
function App() {
  return (
    <div>
      <Router history={history}>
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
          <ProtectedRoute component={StudentHome} to="/student-dashboard"/>
          <ProtectedRoute component={InstructorHome} to="/instructor-dashboard"/>
        </Switch>
        <Spinner/>
      </Router>
    </div>
  );
}

export default App;
