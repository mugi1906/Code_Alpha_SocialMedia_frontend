import api from "./api";

// Add Comment
export const addComment = (postId, data) => {
    return api.post(`/comments/add/${postId}`, data);
};

// Get All Comments of a Post
export const getComments = (postId) => {
    return api.get(`/comments/post/${postId}`);
};

// Update Comment
export const updateComment = (id, data) => {
    return api.put(`/comments/update/${id}`, data);
};

// Delete Comment
export const deleteComment = (id) => {
    return api.delete(`/comments/delete/${id}`);
};

// Like / Unlike Comment
export const likeComment = (id) => {
    return api.put(`/comments/like/${id}`);
};

// Reply Comment
export const replyComment = (commentId, data) => {
    return api.post(`/comments/reply/${commentId}`, data);
};

// Get Replies
export const getReplies = (commentId) => {
    return api.get(`/comments/replies/${commentId}`);
};