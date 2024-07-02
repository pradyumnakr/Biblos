import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};

function CategoryBookListItem(props:BookItem) {
    const isFirstBook = props.bookId === 1001;
return (

    <div className="flex-item">
        <div className="left">
            <img src={require('../assets/images/books/' + bookImageFileName(props))} alt="Book 1"/>
            {isFirstBook && <button className="read-now">Read Now</button>}
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
            <button>Add to Cart</button>

        </div>

    </div>

)
}

export default CategoryBookListItem;
