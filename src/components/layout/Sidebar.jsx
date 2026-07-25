import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaSearch,
    FaPlusSquare,
    FaHeart,
    FaBookmark,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { logout } = useAuth();

    return (

        <aside className="sidebar">

            <div className="sidebar-menu">

                <NavLink to="/" className="sidebar-link">
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/search" className="sidebar-link">
                    <FaSearch />
                    <span>Search</span>
                </NavLink>

                <NavLink to="/create" className="sidebar-link">
                    <FaPlusSquare />
                    <span>Create</span>
                </NavLink>

                <NavLink to="/notifications" className="sidebar-link">
                    <FaHeart />
                    <span>Notifications</span>
                </NavLink>

                <NavLink to="/saved" className="sidebar-link">
                    <FaBookmark />
                    <span>Saved</span>
                </NavLink>

                <NavLink to="/profile" className="sidebar-link">
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

            </div>

            <button
                className="logout-sidebar-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;