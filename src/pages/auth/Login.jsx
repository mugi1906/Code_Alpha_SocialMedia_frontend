import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight
} from "react-icons/fa";

import toast from "react-hot-toast";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({

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

            const { data } = await loginUser(formData);

            await login(data.token);

            toast.success(data.message);

            navigate("/");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        } finally {

            setLoading(false);

        }

    };
    return (

        <AuthLayout

            title="Welcome Back"

            subtitle="Login to continue sharing your beautiful moments with InstaLanet."

        >

            <form

                className="login-form"

                onSubmit={handleSubmit}

            >

                <h2>Login</h2>

                <div className="input-group">

                    <FaEnvelope className="input-icon" />

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

                    <FaLock className="input-icon" />

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

                <div className="forgot-password">

                    <Link to="/forgot-password">

                        Forgot Password?

                    </Link>

                </div>
                <button

                    className="login-btn"

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading ?

                            "Logging In..."

                            :

                            <>

                                Login

                                <FaArrowRight />

                            </>

                    }

                </button>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </form>

        </AuthLayout>

    );

}

export default Login;