import './landingPage.css'
//import vectorImg from "../Vector.png";
import logo from "../logo.svg";
//import frameImg from "../frame.svg";
import frameImg2 from "../frame2.svg";
// LandingPage.jsx — full updated structure

function LandingPage() {
    return (
        <div className="landing-page">
            
            {/* ── HERO (dark brown) ── */}
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

            {/* ── WHITE SECTION (starts here, card overlaps from above) ── */}
            <div className="white-section">

                {/* Stats card sits on the border between dark and white */}
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

                {/* ── BUILT FOR SECTION ── */}
                <div className="built-for-section">
                    <div className="section-eyebrow">
                        <div className="line-decoration-dark"></div>
                        <p className="built-for-label">BUILT FOR</p>
                    </div>

                    <div className="built-for-cards">
                        <div className="built-for-card">
                            <h3 className="card-title">Coffee Shop Owners</h3>
                            <p className="card-desc">
                                Register your shop, build your full menu, accept online orders, track daily revenue, and build a loyal local following with powerful tools designed for small businesses.
                            </p>
                        </div>
                        <div className="built-for-card">
                            <h3 className="card-title">Coffee Lovers</h3>
                            <p className="card-desc">
                                Discover curated coffee shops near you, browse menus, read real reviews, save your favourites, and order ahead so your cup is ready when you arrive.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LandingPage