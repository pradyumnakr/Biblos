import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};

function CategoryBookListItem(props:BookItem) {

    const  {dispatch} = useContext(CartStore);
    const addBookToCart = (book:BookItem)=>() => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };

return (

    <div className="flex-item">
        <div className="left">
            <img src={require('../assets/images/books/' + bookImageFileName(props))} alt="Book 1"/>
            {props.isPublic && <button className="read-now">Read Now</button>}
        </div>
        <div className="right">
        <h3>{props.title}</h3>
            <p className="author">by {props.author}</p>
            <p>
                <span className="stars">★★★★★</span>
                <span className="purchases">(165)</span>
            </p>
            <p>
                <span className="price">${(props.price)}</span>
                <span className="old-price">$20</span>
                <span className="discount">(30% Off)</span>
            </p>
            <button className="add-cart" onClick={addBookToCart(props)}>Add to Cart</button>

        </div>

    </div>

)
}

export default CategoryBookListItem;
