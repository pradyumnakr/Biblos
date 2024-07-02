
import {CategoryItem} from "../types";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';
function CategoryContext ({ children }:any)  {
    const [categories, setCategories]  = useState([]);

    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/PradyumnaBookstoreReactFetch/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;