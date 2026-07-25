import "./ProfileHeader.css";

import { useState, useRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import EditProfileModal from "./EditProfileModal";

import {
    deleteAccount,
    uploadProfileImage
} from "../../services/userApi";

function ProfileHeader({ user, isOwnProfile = false }) {

    const { logout, loadUser } = useAuth();

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [showModal, setShowModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const handleImageChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("profileImage", file);

        try {

            const { data } = await uploadProfileImage(formData);

            toast.success(data.message);

            await loadUser();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Image upload failed."

            );

        }

    };

    const handleDeleteAccount = async () => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete your account?"

        );

        if (!confirmDelete) return;

        try {

            await deleteAccount();

            toast.success("Account deleted successfully");

            logout();

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    return (

        <>

            <section className="profile-header">

                {/* Left */}

                <div className="profile-left">

                    <div className="profile-image-wrapper">

                        <img

                            src={
                                user?.profileImage ||

                                "https://placehold.co/300"
                            }

                            alt={user?.name}

                            className="profile-image"

                        />

                        {

                            isOwnProfile &&

                            <>

                                <button

                                    className="camera-btn"

                                    onClick={() =>
                                        fileInputRef.current.click()
                                    }

                                >

                                    <FaCamera />

                                </button>

                                <input

                                    type="file"

                                    accept="image/*"

                                    ref={fileInputRef}

                                    style={{ display: "none" }}

                                    onChange={handleImageChange}

                                />

                            </>

                        }

                    </div>

                </div>

                {/* Right */}

                <div className="profile-right">

                    <div className="profile-top">

                        <div className="username-row">

                            <h2>

                                {user?.username}

                            </h2>

                            <h3>

                                {user?.name}

                            </h3>

                        </div>

                        {

                            isOwnProfile &&

                            <div className="menu-wrapper">

                                <button

                                    className="menu-btn"

                                    onClick={() =>
                                        setShowMenu(!showMenu)
                                    }

                                >

                                    <HiOutlineDotsHorizontal />

                                </button>

                                {

                                    showMenu &&

                                    <div className="profile-menu">

                                        <button
                                            onClick={() => {
                                                setShowModal(true);
                                                setShowMenu(false);
                                            }}
                                        >
                                            ✏️ Edit Profile
                                        </button>

                                        <button
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            🚪 Logout
                                        </button>

                                        <button
                                            className="delete-item"
                                            onClick={handleDeleteAccount}
                                        >
                                            🗑 Delete Account
                                        </button>

                                    </div>

                                }

                            </div>

                        }

                    </div>

                    <div className="profile-stats">

                        <div>

                            <h3>

                                {user?.postsCount || 0}

                            </h3>

                            <span>

                                Posts

                            </span>

                        </div>

                        <div>

                            <h3>

                                {user?.followersCount || 0}

                            </h3>

                            <span>

                                Followers

                            </span>

                        </div>

                        <div>

                            <h3>

                                {user?.followingCount || 0}

                            </h3>

                            <span>

                                Following

                            </span>

                        </div>

                    </div>

                    <div className="profile-bio">

                        {

                            user?.bio &&

                            <p>

                                {user.bio}

                            </p>

                        }

                        {

                            user?.location &&

                            <p>

                                📍 {user.location}

                            </p>

                        }

                        {

                            user?.website &&

                            <a

                                href={user.website}

                                target="_blank"

                                rel="noreferrer"

                            >

                                {user.website}

                            </a>

                        }

                    </div>

                </div>

            </section>

            {

                showModal &&

                <EditProfileModal

                    closeModal={() =>
                        setShowModal(false)
                    }

                />

            }

        </>

    );

}

export default ProfileHeader;