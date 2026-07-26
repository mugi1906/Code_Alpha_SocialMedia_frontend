import "./BottomBar.css";

import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaSearch,
    FaPlusSquare,
    FaHeart,
    FaBookmark,
    FaUser
} from "react-icons/fa";

function BottomBar() {

    return (

        <nav className="bottom-bar">

            <NavLink
                to="/"
                className="bottom-link"
            >
                <FaHome />
            </NavLink>

            <NavLink
                to="/search"
                className="bottom-link"
            >
                <FaSearch />
            </NavLink>

            <NavLink
                to="/create"
                className="bottom-link"
            >
                <FaPlusSquare />
            </NavLink>

            <NavLink
                to="/notifications"
                className="bottom-link"
            >
                <FaHeart />
            </NavLink>

            <NavLink
                to="/profile"
                className="bottom-link"
            >
                <FaUser />
            </NavLink>

        </nav>

    );

}

export default BottomBar;