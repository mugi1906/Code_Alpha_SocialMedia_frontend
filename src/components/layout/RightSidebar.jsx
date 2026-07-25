import "./RightSidebar.css";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function RightSidebar() {

    const { user } = useAuth();

    return (

        <aside className="right-sidebar">

            <div className="current-user">

                <img

                    src={
                        user?.profileImage ||
                        "https://placehold.co/60"
                    }

                    alt={user?.name}

                />

                <div>

                    <h4>{user?.name}</h4>

                    <p>@{user?.username}</p>

                </div>

            </div>

            <div className="sidebar-section">

                <h5>Quick Links</h5>

                <Link to="/profile">

                    My Profile

                </Link>

                <Link to="/saved">

                    Saved Posts

                </Link>

                <Link to="/notifications">

                    Notifications

                </Link>

            </div>

            <div className="sidebar-footer">

                <p>

                    © 2026 InstaLant

                </p>

            </div>

        </aside>

    );

}

export default RightSidebar;