import React, { useState, useEffect } from 'react';
import axios from "axios";
import ThingsForm from '../components/ThingsForm';
import ThingsList from '../components/ThingsList';
import Navbar from "../components/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: "100%",
    },
    root: {
        height: '100vh',
    },
}));

export default function Things() {

    const [userThings, setUserThings] = useState([]);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const classes = useStyles();

    async function getThings() {
        const thingsRes = await axios.get("/thing");
        setUserThings(thingsRes.data);
    }

    useEffect(() => {
        getThings()
    }, []);

    return (
        <Grid container fluid component="main" className={classes.root}>
            <CssBaseline />
            <Grid item className={classes.image}>
                <Grid item>
                    <Navbar />
                </Grid>
                <Grid item sm={4} style={{ padding: "25px" }}>
                    <ThingsForm getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
                </Grid>
                <Grid item sm={6} style={{ padding: "25px" }}>
                    <ThingsList things={userThings} getThings={getThings} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch} />
                </Grid>
            </Grid>
        </Grid >
    )
}

