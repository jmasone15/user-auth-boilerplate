import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import axios from "axios";
import ThingsForm from '../components/ThingsForm';
import ThingsList from '../components/ThingsList';
import { useHistory } from 'react-router';
import Navbar from "../components/Navbar";


export default function Things() {

    const [userThings, setUserThings] = useState([]);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const { userEmail } = useContext(UserContext);
    const history = useHistory();

    async function getThings() {
        const thingsRes = await axios.get("/thing");
        setUserThings(thingsRes.data);
    }

    function changePage(e, place) {
        e.preventDefault();

        history.push(place)
    }

    useEffect(() => {
        getThings()
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ textAlign: "center" }}>
                <h1>{userEmail}'s Things</h1>
                <button onClick={(e) => changePage(e, "/home")}>Home</button>
                <ThingsForm getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
                <ThingsList things={userThings} getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
            </div>
        </div >
    )
}
