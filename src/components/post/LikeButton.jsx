import { useState } from "react";
import "./LikeButton.css";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { likePost } from "../../services/postApi";

import toast from "react-hot-toast";

function LikeButton({ post }) {

    const [liked, setLiked] = useState(post.isLiked);

    const [likesCount, setLikesCount] = useState(post.likesCount);

    const [loading, setLoading] = useState(false);

    const handleLike = async () => {

        if (loading) return;

        try {

            setLoading(true);

            await likePost(post._id);

            if (liked) {

                setLiked(false);

                setLikesCount(prev => prev - 1);

            } else {

                setLiked(true);

                setLikesCount(prev => prev + 1);

            }

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

        <div className="like-section">

            <button

                className="like-btn"

                onClick={handleLike}

            >

                {

                    liked ?

                    <FaHeart className="liked" />

                    :

                    <FaRegHeart />

                }

            </button>

            
        </div>

    );

}

export default LikeButton;