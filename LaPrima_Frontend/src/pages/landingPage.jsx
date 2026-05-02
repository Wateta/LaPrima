import './landingPage.css'

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-navbar">

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
                        <button className="landing-register">See how it works</button>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        </div>
    )
}

export default LandingPage