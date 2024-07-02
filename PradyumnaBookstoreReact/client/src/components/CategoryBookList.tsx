import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {bookList,BookItem} from "../types";


function CategoryBookList() {
  return (
      <>
          <CategoryNav/>
          <div className="container">
              <div className="flex-container">
              {bookList.map((book: BookItem, index) => (
                  <CategoryBookListItem key={index} bookId={book.bookId} isPublic={book.isPublic} price={book.price}
                                        title={book.title} author={book.author}/>))}
              </div>
          </div>
      </>
  )
}

export default CategoryBookList;
