import './landingPage.css'

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-navbar">
                <div className="navbar-logo">
                    <svg className="crown-icon" width="40" height="40" viewBox="0 0 100 100" fill="#DDA15E" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 70 L30 30 L50 50 L70 30 L80 70 L20 70 Z" fill="#DDA15E"/>
                        <circle cx="30" cy="25" r="10" fill="#DDA15E"/>
                        <circle cx="50" cy="20" r="12" fill="#DDA15E"/>
                        <circle cx="70" cy="25" r="10" fill="#DDA15E"/>
                        <rect x="15" y="70" width="70" height="15" rx="3" fill="#DDA15E"/>
                    </svg>
                    <span className='la'>la</span>   <span className='p'>P</span>rima
                </div>
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
                    <p className="landing-page-subtitle"> THE COFFEE SHOP PLATFORM</p>
                    </div>
                     <h1 className="landing-page-title">Where Every </h1>
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

                </div>
            </div>
        </div>
    )
}

export default LandingPage