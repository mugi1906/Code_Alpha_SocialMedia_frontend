import { useState } from "react";
import "./EditProfileModal.css";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/userApi";

import toast from "react-hot-toast";

function EditProfileModal({ closeModal }) {

    const { user, loadUser } = useAuth();

    const [formData, setFormData] = useState({

        name: user?.name || "",

        bio: user?.bio || "",

        location: user?.location || "",

        website: user?.website || ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateProfile(formData);

            await loadUser();

            toast.success("Profile updated successfully.");

            closeModal();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update profile."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="edit-profile-modal">

                <h2>Edit Profile</h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="name"

                        placeholder="Name"

                        value={formData.name}

                        onChange={handleChange}

                    />

                    <textarea

                        name="bio"

                        placeholder="Bio"

                        value={formData.bio}

                        onChange={handleChange}

                    />

                    <input

                        type="text"

                        name="location"

                        placeholder="Location"

                        value={formData.location}

                        onChange={handleChange}

                    />

                    <input

                        type="text"

                        name="website"

                        placeholder="Website"

                        value={formData.website}

                        onChange={handleChange}

                    />

                    <div className="modal-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={closeModal}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="save-btn"

                            disabled={loading}

                        >

                            {

                                loading ?

                                "Saving..."

                                :

                                "Save"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProfileModal;