import image from '../assets/welcomeImage.jpg'

function WelcomeImage(){
    return (
        <div className="welcomeImage_component">
            <div className="box_shadow"></div>
           <div className="welcomeImage_content_box">
            <p>Get up to 30% off on</p>
            <p>New Arrivals</p>
            <a href="#productList_id">
                <button>SHOP NOW</button>
            </a>
           </div>
           <img src={image} alt="welcome image" />
        </div>
    )
}

export default WelcomeImage;