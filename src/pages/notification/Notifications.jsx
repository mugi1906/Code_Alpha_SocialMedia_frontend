import { useEffect, useState } from "react";

import "./Notifications.css";

import MainLayout from "../../components/layout/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import NotificationItem from "../../components/notification/NotificationItem";

import {
    getNotifications,
    markAllRead
} from "../../services/notificationApi";

import toast from "react-hot-toast";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {

        try {

            const { data } = await getNotifications();

            setNotifications(data.notifications);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load notifications."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleMarkAllRead = async () => {

        try {

            await markAllRead();

            fetchNotifications();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    useEffect(() => {

        fetchNotifications();

    }, []);

    return (

        <MainLayout>

            <div className="notifications-page">

                <div className="notification-header">

                    <h2>Notifications</h2>

                    <button

                        onClick={handleMarkAllRead}

                    >

                        Mark All Read

                    </button>

                </div>

                {

                    loading ?

                        <Loader />

                        :

                        notifications.length === 0 ?

                            (

                                <EmptyState

                                    title="No Notifications"

                                    description="You're all caught up."

                                />

                            )

                            :

                            notifications.map(notification => (

                                <NotificationItem

                                    key={notification._id}

                                    notification={notification}

                                />

                            ))

                }

            </div>

        </MainLayout>

    );

}

export default Notifications;