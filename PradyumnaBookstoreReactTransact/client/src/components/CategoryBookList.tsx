import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem} from "../types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function CategoryBookList() {
  const {id} = useParams ();

  const [categories, setCategories]  = useState([]);

  useEffect(() => {
      axios.get(`http://webdev.cs.vt.edu:8080/PradyumnaBookstoreReactFetch/api/categories/name/${id}/books/`)
            .then((result) => setCategories(result.data ))
            .catch(console.error);
  }, [id]);



  return (
      <>
          <CategoryNav/>
          <div className="container">
              <div className="flex-container">
              {categories.map((book: BookItem, index) => (
                  <CategoryBookListItem key={index} bookId={book.bookId} isPublic={book.isPublic} price={book.price}
                                        title={book.title} author={book.author} categoryId={book.categoryId}/>))}
              </div>
          </div>
      </>
  )
}

export default CategoryBookList;
