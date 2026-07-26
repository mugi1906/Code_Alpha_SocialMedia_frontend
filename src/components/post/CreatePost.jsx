import { useState } from "react";
import "./CreatePost.css";

import { createPost } from "../../services/postApi";

import toast from "react-hot-toast";

function CreatePost({ onPostCreated }) {

    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

    const [video, setVideo] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("Button Clicked");

        console.log(content);
        console.log(image);
        console.log(video);

        if (!content && !image && !video) {

            return toast.error(

                "Write something or upload media."

            );

        }

        try {

            console.log("API Calling...");

            setLoading(true);

            const formData = new FormData();

            formData.append("content", content);

            if (image) {

                formData.append("image", image);

            }

            if (video) {

                formData.append("video", video);

            }

            const response = await createPost(formData);
            console.log("1");
            

            toast.success("Post created successfully.");
            console.log("2");
            setContent("");
console.log("3");
            setImage(null);
console.log("4");
            setVideo(null);
console.log("5");
            if (onPostCreated) {

                onPostCreated();

            }
console.log("6");
        }

        catch (error) {

            console.log("========== ERROR ==========");
            console.log(error);
            console.log("message:", error.message);
            console.log("response:", error.response);
            console.log("data:", error.response?.data);
            console.log("===========================");

            toast.error(

                error.response?.data?.message ||

                "Failed to create post."

            );

            console.log(error.message);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            className="create-post-form"
            onSubmit={handleSubmit}
        >
            <div className="post-content-box">

                <label className="section-title">
                    Post Description
                </label>

                <textarea
                    placeholder="Share your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

            </div>
            <br />
            <div className="upload-grid">

                <label className="upload-card">

                    <span className="upload-icon">
                        🖼
                    </span>

                    <h4>Upload Image</h4>

                    <p>

                        {
                            image ?

                                image.name

                                :

                                "Choose Image"

                        }

                    </p>

                    <input

                        type="file"

                        accept="image/*"

                        hidden

                        onChange={(e) =>

                            setImage(e.target.files[0])

                        }

                    />

                </label>

                <label className="upload-card">

                    <span className="upload-icon">
                        🎥
                    </span>

                    <h4>Upload Video</h4>

                    <p>

                        {
                            video ?

                                video.name

                                :

                                "Choose Video"

                        }

                    </p>

                    <input

                        type="file"

                        accept="video/*"

                        hidden

                        onChange={(e) =>

                            setVideo(e.target.files[0])

                        }

                    />

                </label>

            </div>
            <br />
            <div className="create-post">
                <button

                    type="submit"
                    disabled={loading}
                >

                    {
                        loading ?

                            "Posting..."

                            :

                            "Create Post"

                    }

                </button>
            </div>
        </form>
    );

}

export default CreatePost;