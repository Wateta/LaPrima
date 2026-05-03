import './landingPage.css'
import logo from "../logo.svg"
import frameImg2 from "../frame2.svg"

function LandingPage() {
    return (
        <div className="landing-page">

            {/* ── DARK HERO SECTION ── */}
            <div className="hero-section">
                <div className="landing-navbar">
                    <img src={logo} alt="logo" className='logo-image' />
                    <div className="navbar-links">
                        <a href="#about">About</a>
                        <a href="#how-it-works">How it works</a>
                        <a href="#features">Features</a>
                        <a href="#testimonials">Testimonials</a>
                    </div>
                    <button className="navbar-join-btn">Join Us</button>
                </div>

                <div className="landing-content">
                    <div className="left">
                        <div className="landing-page-container">
                            <div className="line-decoration"></div>
                            <p className="landing-page-subtitle">THE COFFEE SHOP PLATFORM</p>
                        </div>
                        <h1 className="landing-page-title">Where Every</h1>
                        <h1 className="landing-page-subtitle-coffee">Coffee Shop</h1>
                        <h1 className="landing-page-subtitle-secondary">Thrives Online</h1>
                        <p className="landing-page-description">
                            La Prima connects coffee shop owners with their customers. Register your shop, manage your menu, track orders, and grow your community — all in one elegant platform.
                        </p>
                        <div className="landing-buttons">
                            <button className="landing-register">Register your shop</button>
                            <button className="landing-register-btn2">See how it works</button>
                        </div>
                    </div>
                    <div className="right">
                        <img src={frameImg2} alt="coffee" className='frame-image2' />
                    </div>
                </div>
            </div>

            {/* ── WHITE SECTION ── */}
            <div className="white-section">

                {/* Stats card — bridges dark and white */}
                <div className="landing-rectangle">
                    <div className="stat-item">
                        <span className="stat-num">100+</span>
                        <span className="stat-label">Shops Registered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num">42+</span>
                        <span className="stat-label">Coffee Lovers</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num">180k+</span>
                        <span className="stat-label">Cities</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num">80%</span>
                        <span className="stat-label">Efficiency</span>
                    </div>
                </div>

                {/* ── BUILT FOR ── */}
                <div className="built-for-section" id="about">

                    {/* Left side */}
                    <div className="built-for-left">
                        <div className="built-for-eyebrow">
                            <div className="line-decoration-dark"></div>
                            <p className="built-for-tag">BUILT FOR</p>
                        </div>
                        <h2 className="built-for-title">
                            Two Worlds,<br />
                            <span className="built-for-title-gold">One platform</span>
                        </h2>
                        <p className="built-for-desc">
                            Whether you brew the perfect espresso or simply can't start your day without one, La Prima is built for you.
                        </p>
                    </div>

                    {/* Right side — cards */}
                    <div className="built-for-right">

                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">🏪</span>
                                <div>
                                    <h3 className="card-title">Coffee Shop Owners</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                Register your shop, manage your full menu, accept online orders, track daily revenue, and build a loyal local following with powerful tools designed for small businesses.
                            </p>
                        </div>

                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">☕</span>
                                <div>
                                    <h3 className="card-title">Coffee Enthusiasts</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                Discover curated coffee shops near you, browse menus, read real reviews, save your favorites, and order ahead so your cup is ready when you arrive.
                            </p>
                        </div>

                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">🤝</span>
                                <div>
                                    <h3 className="card-title">Community First</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                La Prima believes local coffee culture deserves a digital home. We help independent shops compete, grow, and connect with the people who love them most.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage