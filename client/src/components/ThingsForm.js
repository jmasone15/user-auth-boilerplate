import axios from 'axios';
import React, { useState } from 'react'

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
        <div>
            <form onSubmit={saveThing}>
                <label>Enter a thing:    </label>
                <input type="text" placeholder="Thing" value={thingName} onChange={(e) => setThingName(e.target.value)} />
                <br /><br />
                <button type="submit">Add to your things</button>
            </form>
            <br />
        </div>
    )
}
