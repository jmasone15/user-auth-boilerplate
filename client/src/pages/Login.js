import React, { useState, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function Login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email: email,
                password: password,
            };

            await axios.post("/auth/login", loginData);
            await getLoggedIn();
            history.push("/home");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Login to your account!</h1>
            <form onSubmit={Login}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}