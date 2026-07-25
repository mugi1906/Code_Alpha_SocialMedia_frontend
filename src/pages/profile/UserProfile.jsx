import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./UserProfile.css";

import MainLayout from "../../components/layout/MainLayout";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { getUserProfile } from "../../services/userApi";

import toast from "react-hot-toast";

function UserProfile() {

    const { userId } = useParams();

    const [user, setUser] = useState(null);

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {

        try {

            const { data } = await getUserProfile(userId);

            setUser(data.user);

            setPosts(data.posts);

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

    }, [userId]);

    if (loading) {

        return <Loader />;

    }

    return (

        <MainLayout>

            <div className="user-profile-page">

                <ProfileHeader user={user} isOwnProfile={false} />

                {

                    posts.length === 0 ?

                    (

                        <EmptyState

                            title="No Posts"

                            description="This user hasn't posted anything."

                        />

                    )

                    :

                    (

                        posts.map(post => (

                            <PostCard

                                key={post._id}

                                post={post}

                            />

                        ))

                    )

                }

            </div>

        </MainLayout>

    );

}

export default UserProfile;