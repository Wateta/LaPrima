import './landingPage.css'
function LandingPage(){
    return (
        <div className="landing-page">
           <div className="landing-navbar">

           </div>
           <div className="landing-content">
            <div className="left">
         <h1 className="landing-page-title">THE COFFEE SHOP PLATFORM</h1>
         <h2 className="landing-page-subtitle">Where Every Coffee </h2>
         <h2 className="landing-page-subtitle">Coffee Shop</h2>
          <h2 className="landing-page-subtitle">Thrives Online</h2>
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