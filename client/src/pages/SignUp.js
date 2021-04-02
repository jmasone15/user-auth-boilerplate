import React, { useState, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVerify, setPassVerify] = useState("");

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
        }
    }

    return (
        <div>
            <h1>Sign Up for our website!</h1>
            <form onSubmit={signUp}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Verify Password" value={passVerify} onChange={(e) => setPassVerify(e.target.value)} />
                <br /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
