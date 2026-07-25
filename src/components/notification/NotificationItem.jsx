import "./NotificationItem.css";

import { Link } from "react-router-dom";

import {
    markNotificationRead,
    deleteNotification
} from "../../services/notificationApi";

import { useState } from "react";

import toast from "react-hot-toast";

function NotificationItem({ notification }) {

    const [isRead, setIsRead] = useState(notification.isRead);
    const [removed, setRemoved] = useState(false);

    const handleRead = async () => {

        try {

            if (isRead) return;

            await markNotificationRead(notification._id);

            setIsRead(true);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    const handleDelete = async () => {

        try {

            await deleteNotification(notification._id);

            setRemoved(true);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    if (removed) return null;

    return (

        <div

            className={`notification-card ${isRead ? "read" : ""}`}

            onClick={handleRead}

        >

            <Link

                to={`/profile/${notification.sender?._id}`}

                className="notification-user"

            >

                <img

                    src={
                        notification.sender?.profileImage ||
                        "https://placehold.co/50"
                    }

                    alt={notification.sender?.name}

                />

            </Link>

            <div className="notification-content">

                <p>

                    <strong>

                        {notification.sender?.name}

                    </strong>{" "}

                    {

                        notification.type === "follow" &&

                        "started following you."

                    }

                    {

                        notification.type === "like" &&

                        "liked your post."

                    }

                    {

                        notification.type === "comment" &&

                        "commented on your post."

                    }

                    {

                        notification.type === "reply" &&

                        "replied to your comment."

                    }

                </p>

            </div>

            <button

                className="notification-delete"

                onClick={(e) => {

                    e.stopPropagation();

                    handleDelete();

                }}

            >

                ✕

            </button>

        </div>

    );

}

export default NotificationItem;