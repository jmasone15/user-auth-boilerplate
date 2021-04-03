import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from '../context/AuthContext';
import axios from "axios";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default function LabelBottomNavigation() {
    const [value, setValue] = useState('recents');
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function handleClick(e, page) {
        e.preventDefault();
        if (page === "logout") {
            await axios.get("/auth/logout");
            await getLoggedIn();
            history.push("/");
        } else {
            history.push(page);
        }
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} >
            <BottomNavigationAction label="Home" value="home" onClick={(e) => handleClick(e, "/home")} icon={<HomeIcon />} />
            <BottomNavigationAction label="My Things" value="things" onClick={(e) => handleClick(e, "/things")} icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Logout" value="logout" onClick={(e) => handleClick(e, "logout")} icon={<ExitToAppIcon />} />
        </BottomNavigation>
    );
}
