import "./PostCard.css";

import { Link } from "react-router-dom";

import { useState } from "react";

import {
    FaRegHeart,
    FaHeart,
    FaRegComment,
    FaRegBookmark,
    FaBookmark
} from "react-icons/fa";

import { BsThreeDots } from "react-icons/bs";

import toast from "react-hot-toast";

import {

    likePost,

    savePost

} from "../../services/postApi";

import CommentBox from "../comment/CommentBox";

import { formatDate } from "../../utils/formatDate";

function PostCard({ post }) {

    const [liked, setLiked] = useState(post.isLiked);

    const [saved, setSaved] = useState(post.isSaved || false);

    const [likesCount, setLikesCount] = useState(post.likesCount);

    const [commentsOpen, setCommentsOpen] = useState(false);

    const handleLike = async () => {

        try {

            const { data } = await likePost(post._id);

            setLiked(data.isLiked);

            setLikesCount(data.likesCount);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    const handleSave = async () => {

        try {

            await savePost(post._id);

            setSaved(!saved);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    return (

        <div className="post-card">

            {/* Header */}

            <div className="post-header">

                <Link

                    to={`/profile/${post.user._id}`}

                    className="post-user"

                >

                    <img

                        src={

                            post.user.profileImage ||

                            "https://placehold.co/50"

                        }

                        alt={post.user.name}

                    />

                    <div>

                        <h4>{post.user.name}</h4>

                        <span>

                            @{post.user.username}

                        </span>

                    </div>

                </Link>

                <button className="menu-btn">

                    <BsThreeDots />

                </button>

            </div>

            {/* Caption */}

            {

                post.content && (

                    <p className="post-content">

                        {post.content}

                    </p>

                )

            }

            {/* Image */}

            {

                post.image?.url && (

                    <img

                        src={post.image.url}

                        alt="post"

                        className="post-image"

                    />

                )

            }

            {/* Video */}

            {

                post.video?.url && (

                    <video

                        controls

                        className="post-video"

                    >

                        <source

                            src={post.video.url}

                        />

                    </video>

                )

            }

            {/* Actions */}

            <div className="post-actions">

                <div className="left-actions">

                    <button onClick={handleLike}>

                        {

                            liked ?

                            <FaHeart className="liked"/>

                            :

                            <FaRegHeart/>

                        }

                    </button>

                    <button

                        onClick={()=>

                            setCommentsOpen(

                                !commentsOpen

                            )

                        }

                    >

                        <FaRegComment/>

                    </button>

                </div>

                <button

                    onClick={handleSave}

                >

                    {

                        saved ?

                        <FaBookmark/>

                        :

                        <FaRegBookmark/>

                    }

                </button>

            </div>

            <div className="post-info">

                <strong>

                    {likesCount} Likes

                </strong>

            </div>

            <div className="post-date">

                {formatDate(post.createdAt)}

            </div>

            {

                commentsOpen && (

                    <CommentBox

                        postId={post._id}

                    />

                )

            }

        </div>

    );

}

export default PostCard;