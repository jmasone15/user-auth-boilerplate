import axios from 'axios';
import React, { useState } from 'react'

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
        <ul>
            {updateSwitch === true && (
                <div>
                    <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                    <button onClick={(e) => updateThing(e)}>Save</button>
                    <button onClick={(e) => restart(e)}>Go Back</button>
                </div>)}
            {things.map((t) => (
                <div key={t._id}>
                    <li>
                        <p>{t.name}</p>
                        <button onClick={(e) => getUpdateThing(e, t.name, t._id)}>Update</button>
                        <button onClick={(e) => deleteThing(e, t._id)}>Delete</button>
                    </li>
                    <br /><br />
                </div>
            ))}
        </ul>
    )
}
