import "./ProfilePosts.css";
import { Link,useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

function ProfilePosts({ posts }) {
    const navigate = useNavigate();

    if (!posts || posts.length === 0) {

        return (

            <div className="empty-profile">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt=""
                />

                <h2>No Posts Yet</h2>

                <p>
                    Share your first photo or video.
                </p>

            </div>

        );

    }

    return (

        <>

            {/* Tabs */}

            <div className="profile-tabs">

                <button className="active-tab">

                    <BsFillGrid3X3GapFill size={18} />

                    <span>POSTS</span>

                </button>

                <button onClick={()=> navigate('/saved')}>

                    <CiBookmark size={18} />

                    <span>SAVED</span>

                </button>

            </div>

            {/* Gallery */}

            <div className="profile-posts-grid">

                {

                    posts.map(post => (

                        <Link
                            key={post._id}
                            to={`/post/${post._id}`}
                            className="profile-post-card"
                        >

                            {

                                post.image?.url ?

                                    <img
                                        src={post.image.url}
                                        alt=""
                                    />

                                    :

                                    post.video?.url ?

                                        <video>

                                            <source
                                                src={post.video.url}
                                            />

                                        </video>

                                        :

                                        <div className="text-post">

                                            {post.content}

                                        </div>

                            }

                            {/* Overlay */}

                            <div className="post-overlay">

                                <div>

                                    ❤️ {post.likesCount}

                                </div>

                                <div>

                                    💬 {post.commentsCount}

                                </div>

                            </div>

                        </Link>

                    ))

                }

            </div>

        </>

    );

}

export default ProfilePosts;