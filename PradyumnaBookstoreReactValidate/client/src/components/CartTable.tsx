
import  "../assets/css/CartTable.css"
import {BookItem} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CartStore} from "../contexts/CartContext";
import { useNavigate } from 'react-router-dom';
import {CartTypes} from "../reducers/CartReducer";
import {Category} from "../contexts/CategoryContext";


const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};


 function CartTable()
 {
     const {cart, dispatch} = useContext(CartStore);
     const history = useNavigate();
     const { lastVisited } = useContext(Category)

     const handleContinueShopping = () =>{
         history(-1);
     }

     const handleClearCart = () => {
         dispatch({type : CartTypes.CLEAR})
     }

     const subtotal = cart.reduce(
         (total, item) => total + item.quantity * item.book.price,
         0
     );

     const handleIncrement = (id:number) => {
         dispatch({type:CartTypes.ADD, id:id})
     }

     const handleDecrement = (id:number) =>{
         dispatch({type:CartTypes.REMOVE, id:id})
     }

     return (
         <div>
             {cart.length > 0 ? (
             <>
             <div className="cart-header">
                <p>My Shopping Cart ({cart.length} {cart.length === 1 ? 'book' : 'books'})</p>
             </div>
             <div className="cart-table">
                 <ul className="cart2">
                     <li className="table-heading">
                         <div className="heading-book">Book</div>
                         <div className="heading-price">Price / Quantity</div>
                         <div className="heading-subtotal">Amount</div>
                     </li>
                     {cart.map((item, index) => (
                         <li key={index}>
                             <div className="cart-book-image">
                                 <img className="cart1"
                                      src={require('../assets/images/books/' + bookImageFileName(item.book))}
                                      alt="Dune"/>
                             </div>
                             <div className="cart-book-title">{item.book.title}</div>
                             <div className="cart-book-price">{item.book.price}</div>
                             <div className="cart-book-quantity">

                                 <button className="icon-button inc-button" onClick={() => handleIncrement(item.id)}>
                                     <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                                 </button>
                                 <span className="quantity">{item.quantity}</span>&nbsp;
                                 <button className="icon-button dec-button" onClick={() => handleDecrement(item.id)}>
                                     <i className="fas fa-minus-circle"> <FontAwesomeIcon icon={faMinusCircle}/></i>
                                 </button>
                             </div>
                             <div className="cart-book-subtotal">${(item.quantity * item.book.price)}</div>
                             <ul><li className="line-sep"></li></ul>
                         </li>

                     ))}

                 </ul>
                 <p className="sub-total">Subtotal: ${subtotal}</p>
             </div>
             <div className="shopping-buttons">
                 <Link to={`/categories/${lastVisited}`}>
                     <button className="continue-shopping-button">
                         <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon"/>
                         &nbsp; CONTINUE SHOPPING
                     </button>
                 </Link>
                 <Link to="/checkout">
                     <button className="proceed-to-checkout-button">
                         PROCEED TO CHECKOUT&nbsp;
                         <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                     </button>
                 </Link>
             </div>
             <div className="clear-cart-part">
                 <button className="clear-cart-button" onClick={handleClearCart}>
                     Clear Cart
                 </button>
             </div>
             </>
            ) : (
                 <div className="empty-cart">
                     <p>Your Biblos Cart is empty</p>
                     <Link to={`/categories/${lastVisited}`}>
                         <button className="continue-shopping-button">
                             <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon"/>
                             &nbsp; CONTINUE SHOPPING
                         </button>
                     </Link>

                 </div>
             )}
         </div>
     );
 }

export default CartTable;

