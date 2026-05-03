import './landingPage.css'
//import vectorImg from "../Vector.png";
import logo from "../logo.svg";
//import frameImg from "../frame.svg";
import frameImg2 from "../frame2.svg";
function LandingPage() {
    return (
        <div className="landing-page">
             
            <div className="landing-navbar">
                
               {/* <div className="navbar-logo"><span className='la'>la</span>   <span className='p'>P</span>rima</div>  */}
              <img src={logo} alt="Image"className='logo-image' />
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
                     
                    <img src={frameImg2} alt="Image"className='frame-image2' />
                    
                </div>
            </div>
        </div>
    )
}

export default LandingPage