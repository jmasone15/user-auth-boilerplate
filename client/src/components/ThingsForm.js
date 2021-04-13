import axios from 'axios';
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


export default function ThingsForm({ getThings }) {

    const [thingName, setThingName] = useState("");

    async function saveThing(e) {
        e.preventDefault();

        try {

            const thingData = {
                name: thingName
            }
            await axios.post("/thing", thingData)
            getThings();
            setThingName("");
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <Grid container justify="center">
            <CssBaseline />
            <Paper evelation={3} style={{ padding: "25px", textAlign: "center" }}>
                <h1>Add A Thing!</h1>
                <form onSubmit={saveThing}>
                    <TextField label="Enter Thing" variant="outlined" value={thingName} onChange={(e) => setThingName(e.target.value)} />
                    <br /><br />
                    <Button type="submit" variant="outlined" color="primary">Add to your things</Button>
                </form>
            </Paper>
        </Grid>
    )
}
