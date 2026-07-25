import api from "./api";

// Get Notifications
export const getNotifications = () => {
    return api.get("/notifications");
};

// Mark One Notification Read
export const markNotificationRead = (id) => {
    return api.put(`/notifications/read/${id}`);
};

// Mark All Notifications Read
export const markAllRead = () => {
    return api.put("/notifications/read-all");
};

// Delete Notification
export const deleteNotification = (id) => {
    return api.delete(`/notifications/${id}`);
};