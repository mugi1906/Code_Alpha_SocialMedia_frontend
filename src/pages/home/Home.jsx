import { useEffect, useState } from "react";

import "./Home.css";

import MainLayout from "../../components/layout/MainLayout";
import CreatePost from "../../components/post/CreatePost";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { getHomeFeed } from "../../services/postApi";

function Home() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {

        try {

            setLoading(true);

            const { data } = await getHomeFeed();

            setPosts(data.posts);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchPosts();

    }, []);

    return (

        <MainLayout>

            <div className="home">

                {

                    loading ?

                        <Loader />

                        :

                        posts.length === 0 ?

                            <EmptyState

                                title="No Posts Yet"

                                description="Follow users or create your first post."

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

export default Home;