import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user } = useAuth();

    return (

        <header className="navbar">

            <Link
                to="/"
                className="logo"
            >

                InstaLant

            </Link>

            <Link
                to="/profile"
                className="profile-box"
            >

                <img

                    src={
                        user?.profileImage ||
                        "https://placehold.co/40"
                    }

                    alt="Profile"

                />

            </Link>

        </header>

    );

}

export default Navbar;