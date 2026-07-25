import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./SinglePost.css";

import MainLayout from "../../components/layout/MainLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import PostCard from "../../components/post/PostCard";

import { getSinglePost } from "../../services/postApi";

import toast from "react-hot-toast";

function SinglePost() {

    const { id } = useParams();

    const [post, setPost] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {

        try {

            const { data } = await getSinglePost(id);

            setPost(data.post);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load post."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchPost();

    }, [id]);

    return (

        <MainLayout>

            <div className="single-post-page">

                {

                    loading ?

                    (

                        <Loader />

                    )

                    :

                    !post ?

                    (

                        <EmptyState

                            title="Post Not Found"

                            description="This post may have been deleted."

                        />

                    )

                    :

                    (

                        <PostCard post={post} />

                    )

                }

            </div>

        </MainLayout>

    );

}

export default SinglePost;