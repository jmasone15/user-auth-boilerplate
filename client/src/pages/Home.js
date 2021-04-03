import React, { useContext } from "react";
import UserContext from "../context/UserContext";
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
    },
    root: {
        height: '100vh',
    },
}));

export default function Home() {

    const { userEmail } = useContext(UserContext);
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid container className={classes.image} justify="center">
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={5} component={Paper} elevation={3} >
                    <div style={{ textAlign: "center" }}>
                        <h1>Home Page</h1>
                        <h4>Welcome {userEmail}</h4>
                    </div>
                </Grid>
            </Grid>
        </Grid >
    )
}
