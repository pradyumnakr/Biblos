import React from "react";
import {Link} from "react-router-dom";

const Checkout = () =>{
    return(
        <div className="checkout">
            <Link to="/cart">
                Back to Cart
            </Link>
        </div>
    );
};

export default Checkout;