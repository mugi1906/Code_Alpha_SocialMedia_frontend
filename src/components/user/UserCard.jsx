import "./UserCard.css";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

function UserCard({ user }) {

    return (

        <div className="user-card">

            <Link
                to={`/profile/${user._id}`}
                className="user-info"
            >

                <img
                    src={
                        user.profileImage ||
                        "https://placehold.co/60"
                    }
                    alt={user.name}
                />

                <div>

                    <h4>{user.name}</h4>

                    <p>@{user.username}</p>

                </div>

            </Link>

            <FollowButton user={user} />

        </div>

    );

}

export default UserCard;