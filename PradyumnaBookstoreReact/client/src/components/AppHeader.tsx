
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
function AppHeader(){
return (
    <header>
        <nav>
            <div className="logo">
                <div className="logo_image">
                    <Link to="/">
                    <img src={require('../assets/images/site/B.png')} alt=""/>
                    </Link>
                </div>
                <div className="logo_text">
                    <h6>Largest Book Mall</h6>
                    <Link className="logo_link" to="/">
                    <h2>Biblos</h2>
                    </Link>
                </div>
            </div>
            <div className="social_icon">
                <input type="text" name="" id="" placeholder="Search books by title"/>
                <img src={require('../assets/images/site/icons8-search-50.png')} alt=""/>
            </div>
            <ul>
                <li><a href="#Home">Home</a></li>
                <li className="dropdown">
                    <a className="dropbtn" href="#Home"><img
                        src={require('../assets/images/site/icons8-category-30.png')} alt=""/>Categories</a>
                    <div className="dropdown-content">
                        <Link to="/categories">
                        Best Sellers
                        </Link>
                        <a href="#Home">Fiction</a>
                        <a href="#Home">Non-Fiction</a>
                        <a href="#Home">Young Adult</a>
                    </div>
                </li>
                <li><a href="#Home"><img src={require('../assets/images/site/icons8-user-30.png')} alt=""/>Login</a>
                </li>
                <li><a href="#Home"><img src={require('../assets/images/site/icons8-cart-30.png')} alt=""/>My
                    Cart</a></li>
                {/*<HeaderDropdown />*/}
            </ul>
        </nav>
    </header>

)
}

export default AppHeader;

