
import '../assets/css/AppHeader.css';
import {Link, useLocation} from 'react-router-dom';
import HeaderDropdown from "./HeaderDropdown";
import {useContext} from "react";
import CartContext, {CartStore} from "../contexts/CartContext";

function AppHeader(){
    const categoryMatch = useLocation();
    const {cart} = useContext(CartStore);
    const cartQuantity = cart.reduce((acc,item) => acc + item.quantity, 0);

    return (
    <header>
        <nav>
            <div className="logo">
                <div className="logo_image">
                    <Link to="/">
                    <img className="image" src={require('../assets/images/site/B.png')} alt=""/>
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
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                        <HeaderDropdown/>
                </li>
                <>
                {categoryMatch.pathname.includes("/categories/") ? (
                    <>
                        <li>
                        <a href="#Home"><img src={require('../assets/images/site/icons8-user-30.png')} alt=""/>Rahul</a>
                        </li>
                        <li>
                        <a href="#Home"><img src={require('../assets/images/site/icons8-cart-30.png')} alt=""/>My
                            Cart</a>
                        <span className="cart-number">{cartQuantity}</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="#Home"><img src={require('../assets/images/site/icons8-user-30.png')} alt=""/>Login</a>
                        </li>
                        <li>
                            <a href="#Home"><img src={require('../assets/images/site/icons8-cart-30.png')} alt=""/>My
                            Cart</a>
                        </li>
                    </>

                )}

                </>

            </ul>
        </nav>
    </header>

)
}

export default AppHeader;

