import api from "./api";

// My Profile
export const getMyProfile = () => {
    return api.get("/users/profile");
};

// Update Profile
export const updateProfile = (data) => {
    return api.put("/users/update/profile", data);
};

// Upload Profile Image
export const uploadProfileImage = (data) => {

    return api.put(

        "/users/profile/image",

        data,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

};

// Follow / Unfollow User
export const followUser = (userId) => {
    return api.put(`/users/follow/${userId}`);
};

// Search Users
export const searchUsers = (query) => {
    return api.get(`/users/search?query=${query}`);
};

// User Profile
export const getUserProfile = (userId) => {
    return api.get(`/users/profile/${userId}`);
};

// Suggested Users
export const getSuggestedUsers = () => {
    return api.get("/users/suggestions");
};

// Delete Account
export const deleteAccount = () => {
    return api.delete("/users/delete/account");
};