import React, { useState, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVerify, setPassVerify] = useState("");
    const [view, setView] = useState("password");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function signUp(e) {
        e.preventDefault();

        try {
            const signUpData = {
                email: email,
                password: password,
                passwordVerify: passVerify
            };

            await axios.post("/auth/signup", signUpData);
            await getLoggedIn();
            history.push("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    }

    function passView(e) {
        e.preventDefault();
        if (view === "password") {
            setView("text");
        } else {
            setView("password")
        }
    }

    return (
        <div>
            <h1>Sign Up for our website!</h1>
            <form onSubmit={signUp}>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <input type={view} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={(e) => passView(e)}>View</button>
                <br /><br />
                <input type={view} placeholder="Verify Password" required value={passVerify} onChange={(e) => setPassVerify(e.target.value)} />
                <br /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
