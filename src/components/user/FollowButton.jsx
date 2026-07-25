import { useState } from "react";
import "./FollowButton.css";

import toast from "react-hot-toast";
import { followUser } from "../../services/userApi";

function FollowButton({ user,onFollow  }) {

    const [isFollowing, setIsFollowing] = useState(
        user.isFollowing || false
    );

    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {

        if (loading) return;

        try {

            setLoading(true);

            const { data } = await followUser(user._id);

            setIsFollowing(data.isFollowing);

            toast.success(data.message);
            onFollow && onFollow(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <button
            className={
                isFollowing
                    ? "following-btn"
                    : "follow-btn"
            }
            onClick={handleFollow}
            disabled={loading}
        >

            {
                loading
                    ? "Loading..."
                    : isFollowing
                        ? "Following"
                        : "Follow"
            }

        </button>

    );

}

export default FollowButton;