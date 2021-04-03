import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import axios from "axios";
import ThingsForm from '../components/ThingsForm';
import ThingsList from '../components/ThingsList';
import Navbar from "../components/Navbar";


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
            <Navbar />
            <div>
                <h1>My Things</h1>
                <ThingsForm getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
                <ThingsList things={userThings} getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
            </div>
        </div >
    )
}
