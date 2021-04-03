import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import LogoutBtn from "../components/LogoutBtn";
import { useHistory } from 'react-router';
import Navbar from "../components/Navbar";

export default function Home() {

    const { userEmail } = useContext(UserContext);
    const history = useHistory();

    function changePage(e, place) {
        e.preventDefault();

        history.push(place)
    }


    return (
        <div>
            <Navbar />
            <div style={{ textAlign: "center" }}>
                <h1>Home Page</h1>
                <h4>Welcome {userEmail}</h4>
                <LogoutBtn />
                <button onClick={(e) => changePage(e, "/things")}>Things</button>
            </div>
        </div>
    )
}
