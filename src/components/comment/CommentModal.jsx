import { useEffect, useState } from "react";

import "./CommentModal.css";

import toast from "react-hot-toast";

import {
    getComments,
    addComment
} from "../../services/commentApi";

import CommentItem from "./CommentItem";

function CommentModal({

    show,

    onClose,

    post

}) {

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {

        try {

            const { data } = await getComments(post._id);

            setComments(data.comments);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (show) {

            fetchComments();

        }

    }, [show]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!comment.trim()) {

            return;

        }

        try {

            setLoading(true);

            await addComment(

                post._id,

                {

                    comment

                }

            );

            setComment("");

            fetchComments();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to add comment."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (!show) return null;

    return (

        <div className="comment-overlay">

            <div className="comment-modal">

                <div className="comment-header">

                    <h3>Comments</h3>

                    <button

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="comment-list">

                    {

                        comments.length === 0 ?

                        (

                            <p>

                                No comments yet.

                            </p>

                        )

                        :

                        comments.map(item => (

                            <CommentItem

                                key={item._id}

                                comment={item}

                            />

                        ))

                    }

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="comment-form"

                >

                    <input

                        type="text"

                        placeholder="Write a comment..."

                        value={comment}

                        onChange={(e) =>

                            setComment(e.target.value)

                        }

                    />

                    <button

                        disabled={loading}

                    >

                        {

                            loading ?

                            "Posting..."

                            :

                            "Post"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CommentModal;