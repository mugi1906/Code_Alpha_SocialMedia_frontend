import "./AuthLayout.css";

function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="auth-page">

            {/* Background Shapes */}
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>

            <div className="auth-container">

                {/* Left Side */}
                <div className="auth-left">

                    <div className="logo-box">

                        <div className="logo-circle">
                            📷
                        </div>

                        <h1>InstaLanet</h1>

                    </div>

                    <h2>{title}</h2>

                    <p>{subtitle}</p>

                    <div className="phone-preview">

                        <div className="phone">

                            <div className="phone-header">

                                <div></div>
                                <div></div>
                                <div></div>

                            </div>

                            <div className="story-row">

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                            <div className="post"></div>

                            <div className="post"></div>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="auth-right">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AuthLayout;