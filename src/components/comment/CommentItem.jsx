import "./CommentItem.css";

import { useEffect, useState } from "react";

import {
    FaTrash,
    FaReply
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
    deleteComment,
    getReplies,
    replyComment
} from "../../services/commentApi";

import ReplyItem from "./ReplyItem";

import { useAuth } from "../../context/AuthContext";

import { formatDate } from "../../utils/formatDate";

function CommentItem({

    comment,

    refreshComments

}) {

    const { user } = useAuth();

    const [showReplies, setShowReplies] = useState(false);

    const [replies, setReplies] = useState([]);

    const [replyText, setReplyText] = useState("");

    const [loading, setLoading] = useState(false);

    const fetchReplies = async () => {

        try {

            const { data } = await getReplies(

                comment._id

            );

            setReplies(data.replies);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteComment(comment._id);

            toast.success(

                "Comment Deleted"

            );

            refreshComments();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    const handleReply = async () => {

        if (!replyText.trim()) {

            return;

        }

        try {

            setLoading(true);

            await replyComment(

                comment._id,

                {

                    comment: replyText

                }

            );

            toast.success(

                "Reply Added"

            );

            setReplyText("");

            fetchReplies();

            setShowReplies(true);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const toggleReplies = () => {

        if (!showReplies) {

            fetchReplies();

        }

        setShowReplies(

            !showReplies

        );

    };

    return (

        <div className="comment-item">

            <img

                src={

                    comment.user.profileImage ||

                    "https://placehold.co/40"

                }

                alt={comment.user.name}

            />

            <div className="comment-content">

                <div className="comment-header">

                    <h5>

                        {comment.user.name}

                    </h5>

                    <small>

                        {

                            formatDate(

                                comment.createdAt

                            )

                        }

                    </small>

                </div>

                <p>

                    {comment.comment}

                </p>

                <div className="comment-actions">

                    <button

                        onClick={toggleReplies}

                    >

                        <FaReply />

                        Reply

                    </button>

                    {

                        comment.user._id === user?._id && (

                            <button

                                onClick={handleDelete}

                            >

                                <FaTrash />

                                Delete

                            </button>

                        )

                    }

                </div>

                {

                    showReplies && (

                        <>

                            <div className="reply-input">

                                <input

                                    type="text"

                                    placeholder="Write a reply..."

                                    value={replyText}

                                    onChange={(e) =>

                                        setReplyText(

                                            e.target.value

                                        )

                                    }

                                />

                                <button

                                    onClick={handleReply}

                                    disabled={loading}

                                >

                                    Reply

                                </button>

                            </div>

                            {

                                replies.length > 0 &&

                                replies.map(

                                    (reply) => (

                                        <ReplyItem

                                            key={reply._id}

                                            reply={reply}

                                        />

                                    )

                                )

                            }

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default CommentItem;