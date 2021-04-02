import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function LogoutBtn() {

    const { getLoggedIn } = useContext(AuthContext);
    // Array of all histories from the browser
    const history = useHistory();

    async function logOut() {
        await axios.get("/auth/logout");
        await getLoggedIn();
        history.push("/");
    }

    return <button onClick={logOut}>Logout</button>
}
