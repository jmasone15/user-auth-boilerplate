import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AuthContext from "./context/AuthContext";
import Things from "./pages/Things";
import Home from "./pages/Home";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar />
            <br />
            <Switch>
                {loggedIn === false && (
                    <>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Redirect to="/" />
                        </Route>
                        <Route path="/things">
                            <Redirect to="/" />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/things">
                            <Things />
                        </Route>
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/signup">
                            <Redirect to="/home" />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}
