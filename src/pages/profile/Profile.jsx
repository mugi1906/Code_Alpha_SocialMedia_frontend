import { useEffect, useState } from "react";

import "./Profile.css";

import MainLayout from "../../components/layout/MainLayout";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfilePosts from "../../components/profile/ProfilePosts";
import Loader from "../../components/common/Loader";

import { getMyProfile } from "../../services/userApi";
import { getMyPosts } from "../../services/postApi";

import toast from "react-hot-toast";

function Profile() {

    const [user, setUser] = useState(null);

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {

        try {

            const [profileRes, postsRes] = await Promise.all([

                getMyProfile(),

                getMyPosts()

            ]);

            setUser(profileRes.data.user);

            setPosts(postsRes.data.posts);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load profile."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    if (loading) {

        return <Loader />;

    }

    return (

        <MainLayout>

            <div className="profile-page">

                <ProfileHeader

                    user={user}

                    isOwnProfile={true}

                />

                <ProfilePosts

                    posts={posts}

                />

            </div>

        </MainLayout>

    );

}

export default Profile;