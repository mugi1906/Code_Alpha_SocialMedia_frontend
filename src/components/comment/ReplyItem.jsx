import "./ReplyItem.css";

import { FaReply } from "react-icons/fa";

import { formatDate } from "../../utils/formatDate";

function ReplyItem({ reply }) {

    return (

        <div className="reply-item">

            <img

                src={
                    reply.user.profileImage ||

                    "https://placehold.co/35"
                }

                alt={reply.user.name}

            />

            <div className="reply-body">

                <div className="reply-top">

                    <span className="reply-name">

                        {reply.user.name}

                    </span>

                    <span className="reply-time">

                        {formatDate(reply.createdAt)}

                    </span>

                </div>

                <p>

                    {reply.comment}

                </p>

            </div>

        </div>

    );

}

export default ReplyItem;