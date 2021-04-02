import React, { useContext } from "react";
import UserContext from "../context/UserContext";
export default function Home() {

    const { userEmail } = useContext(UserContext);


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Home Page</h1>
            <h4>Welcome {userEmail}</h4>
        </div>
    )
}
