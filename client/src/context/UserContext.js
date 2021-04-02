import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const UserContext = createContext();

function UserContextProvider(props) {
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const { loggedIn } = useContext(AuthContext);

    async function getUserId() {
        if (loggedIn === true) {
            const token = document.cookie;
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            const id = payload.user;
            setUserId(id);
        }
    }
    async function getUserEmail() {
        if (userId !== "") {
            const userData = await axios.get(`/auth/profile/${userId}`);
            setUserEmail(userData.data.email)
        }
    }

    useEffect(() => {
        getUserId();
        getUserEmail();
    });

    return (
        <UserContext.Provider value={{ userId, getUserId, userEmail, getUserEmail }}>
            {props.children}
        </UserContext.Provider>
    )
}

// Test comments for heroku create

export default UserContext;
export { UserContextProvider };