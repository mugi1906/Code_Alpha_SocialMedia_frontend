import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaAt,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight
} from "react-icons/fa";

import toast from "react-hot-toast";
import { registerUser } from "../../services/authApi";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

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

            const { data } = await registerUser(formData);

            toast.success(data.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

        return (

        <AuthLayout

            title="Join InstaLanet"

            subtitle="Create your account and start sharing beautiful moments."

        >

            <form

                className="register-form"

                onSubmit={handleSubmit}

            >

                <h2>Create Account</h2>

                <div className="input-group">

                    <FaUser className="input-icon"/>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaAt className="input-icon"/>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaEnvelope className="input-icon"/>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaLock className="input-icon"/>

                    <input

                        type={showPassword ? "text" : "password"}

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />

                    {

                        showPassword ?

                        <FaEyeSlash

                            className="eye-icon"

                            onClick={() => setShowPassword(false)}

                        />

                        :

                        <FaEye

                            className="eye-icon"

                            onClick={() => setShowPassword(true)}

                        />

                    }

                </div>

                                <button

                    className="login-btn"

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading ?

                        "Creating Account..."

                        :

                        <>

                            Create Account

                            <FaArrowRight/>

                        </>

                    }

                </button>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </AuthLayout>

    );

}

export default Register;