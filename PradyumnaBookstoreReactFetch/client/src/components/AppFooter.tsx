import '../assets/css/AppFooter.css'
import facebook from '../assets/images/footer/icons8-facebook-30.png'
import instagram from '../assets/images/footer/icons8-instagram-30.png'
import twitter from '../assets/images/footer/icons8-twitter-30.png'
import {Link} from "react-router-dom";


function AppFooter(){

return(
    <footer>
        <div className="footer_main">
            <div className="tag_one">
                <p>&copy; 2024 Biblos Info Private Limited. All Rights Reserved.</p>
            </div>

            <div className="tag_two">
                <Link to="/">About Us</Link>
                <Link to="/">Contact Us</Link>
            </div>

            <div className="tag_three">
                <div className="social_link">
                    <Link to="/"><img src={facebook} alt=""/></Link>
                    <Link to="/"><img src={instagram} alt=""/></Link>
                    <Link to="/"><img src={twitter} alt=""/></Link>
                </div>
            </div>

        </div>
    </footer>
);
}

export default AppFooter;
