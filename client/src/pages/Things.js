import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import axios from "axios";
import ThingsForm from '../components/ThingsForm'
import ThingsList from '../components/ThingsList'

export default function Things() {

    const [userThings, setUserThings] = useState([]);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const { userEmail } = useContext(UserContext);

    async function getThings() {
        const thingsRes = await axios.get("/thing");
        setUserThings(thingsRes.data);
    }

    useEffect(() => {
        getThings()
    }, []);

    return (
        <div>
            <h1>{userEmail}'s Things</h1>
            <ThingsForm getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
            <ThingsList things={userThings} getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
        </div>
    )
}