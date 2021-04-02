import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "./LogoutBtn";

export default function Navbar() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <div>
            {loggedIn === false && (
                <>
                    <Link style={{ margin: "15px" }} to="/signup">Sign Up</Link>
                    <Link style={{ margin: "15px" }} to="/">Login</Link>
                </>
            )}
            {loggedIn === true && (
                <>
                    <Link style={{ margin: "15px" }} to="/home">Home</Link>
                    <Link style={{ margin: "15px" }} to="/things">Things</Link>
                    <LogoutBtn />
                </>
            )}
        </div>
    )
}
