import { useEffect, useState } from "react";
import "./SavedPosts.css";

import MainLayout from "../../components/layout/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import PostCard from "../../components/post/PostCard";

import { getSavedPosts } from "../../services/postApi";

import toast from "react-hot-toast";

function SavedPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSavedPosts = async () => {

        try {

            const { data } = await getSavedPosts();

            setPosts(data.posts);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load saved posts."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSavedPosts();

    }, []);

    return (

        <MainLayout>

            <div className="saved-page">

                <h2>Saved Posts</h2>

                {

                    loading ?

                        <Loader />

                        :

                        posts.length === 0 ?

                            <EmptyState
                                title="No Saved Posts"
                                description="Save posts to view them here."
                            />

                            :

                            posts.map(post => (

                                <PostCard
                                    key={post._id}
                                    post={post}
                                />

                            ))

                }

            </div>

        </MainLayout>

    );

}

export default SavedPosts;