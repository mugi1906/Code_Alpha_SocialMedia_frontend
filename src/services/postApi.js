import api from "./api";

// Create Post
export const createPost = (data) => {

    return api.post(

        "/posts/createPost",

        data,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

};
// Home Feed
export const getHomeFeed = () => {
    return api.get("/posts/feed");
};

// All Posts
export const getAllPosts = () => {
    return api.get("/posts/allPost");
};

// My Posts
export const getMyPosts = () => {
    return api.get("/posts/myPosts");
};

// User Posts
export const getUserPosts = (userId) => {
    return api.get(`/posts/user/${userId}`);
};

// Single Post
export const getSinglePost = (id) => {
    return api.get(`/posts/singlePost/${id}`);
};

// Update Post
export const updatePost = (id, data) => {
    return api.put(`/posts/updatePost/${id}`, data);
};

// Delete Post
export const deletePost = (id) => {
    return api.delete(`/posts/deletePost/${id}`);
};

// Like / Unlike Post
export const likePost = (id) => {
    return api.put(`/posts/like/${id}`);
};

// Save / Unsave Post
export const savePost = (id) => {
    return api.put(`/posts/save/${id}`);
};

export const getSavedPosts = () => {
    return api.get("/posts/saved");
};