import "./CommentBox.css";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    addComment,
    getComments
} from "../../services/commentApi";

import CommentItem from "./CommentItem";

function CommentBox({ postId }) {

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {

        try {

            const { data } = await getComments(postId);

            setComments(data.comments);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchComments();

    }, [postId]);

    const handleSubmit = async () => {

        if (!comment.trim()) {

            return;

        }

        try {

            setLoading(true);

            await addComment(

                postId,

                {

                    comment

                }

            );

            setComment("");

            fetchComments();

            toast.success("Comment Added");

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

    return (

        <div className="comment-box">

            <div className="comment-input">

                <input

                    type="text"

                    placeholder="Add a comment..."

                    value={comment}

                    onChange={(e) =>

                        setComment(e.target.value)

                    }

                />

                <button

                    onClick={handleSubmit}

                    disabled={loading}

                >

                    Post

                </button>

            </div>

            <div className="comment-list">

                {

                    comments.map((item) => (

                        <CommentItem

                            key={item._id}

                            comment={item}

                            refreshComments={fetchComments}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default CommentBox;