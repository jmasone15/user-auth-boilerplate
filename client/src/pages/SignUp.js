import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/jmasone15">
                Jordan Masone
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
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
            setView("password");
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={signUp}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={view}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordVerify"
                            label="Re-enter Password"
                            type={view}
                            id="passwordVerify"
                            autoComplete="current-password"
                            value={passVerify}
                            onChange={(e) => setPassVerify(e.target.value)}
                        />
                        {view === "password" && (
                            <FormControlLabel
                                control={<VisibilityIcon value="remember" style={{ marginLeft: "10px", marginRight: "10px" }} onClick={(e) => passView(e)} color="primary" />}
                                label="View Password"
                            />
                        )}
                        {view === "text" && (
                            <FormControlLabel
                                control={<VisibilityOffIcon value="remember" style={{ marginLeft: "10px", marginRight: "10px" }} onClick={(e) => passView(e)} color="primary" />}
                                label="Hide Password"
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign Up
                            </Button>
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
