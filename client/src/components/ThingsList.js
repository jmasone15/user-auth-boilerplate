import axios from 'axios';
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function ThingsList({ things, updateSwitch, setUpdateSwitch, getThings }) {

    const [updateName, setUpdateName] = useState("");
    const [updateId, setUpdateId] = useState("");

    function getUpdateThing(e, name, id) {
        e.preventDefault();
        setUpdateName(name);
        setUpdateId(id);
        setUpdateSwitch(true)
    }

    function restart(e) {
        e.preventDefault();
        setUpdateSwitch(false);
        setUpdateId("");
        setUpdateName("");
    }

    async function updateThing(e) {
        e.preventDefault();

        try {
            await axios.put(`/thing/${updateId}`, { name: updateName });

            setUpdateSwitch(false);
            setUpdateId("");
            setUpdateName("");
            getThings();
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteThing(e, id) {
        e.preventDefault();

        try {
            await axios.delete(`/thing/${id}`);
            getThings();

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Grid>
            <CssBaseline />
            <div style={{ padding: "25px", textAlign: "center" }}>
                {updateSwitch === true && (
                    <Paper evelation={3} style={{ padding: "25px", margin: "15px" }}>
                        <TextField value={updateName} variant="outlined" onChange={(e) => setUpdateName(e.target.value)} />
                        <br /><br />
                        <Button style={{ marginRight: "10px" }} variant="outlined" color="primary" onClick={(e) => updateThing(e)}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={(e) => restart(e)}>Go Back</Button>
                    </Paper>)}
                {things.map((t) => (
                    <Paper evelation={3} key={t._id} style={{ padding: "25px", margin: "15px" }}>
                        <h3>{t.name}</h3>
                        <Button style={{ marginRight: "10px" }} variant="outlined" color="primary" onClick={(e) => getUpdateThing(e, t.name, t._id)}>Update</Button>
                        <Button variant="outlined" color="secondary" onClick={(e) => deleteThing(e, t._id)}>Delete</Button>
                    </Paper>
                ))}
            </div>
        </Grid >
    )
}
