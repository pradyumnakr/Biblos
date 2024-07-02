import '../assets/css/AppFooter.css'
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
                    <Link to="/"><img src={require('../assets/images/footer/icons8-facebook-30.png')} alt=""/></Link>
                    <Link to="/"><img src={require('../assets/images/footer/icons8-facebook-30.png')} alt=""/></Link>
                    <Link to="/"><img src={require('../assets/images/footer/icons8-facebook-30.png')} alt=""/></Link>
                </div>
            </div>

        </div>
    </footer>
);
}

export default AppFooter;
