
import {CategoryItem} from "../types";
import {createContext, useEffect, useState} from "react";
import axios from "axios";

interface CategoryType {
    categories: CategoryItem[];
    lastVisited: string;
    updateVisited: (categoryName:string) => void;
}
export const Category = createContext<CategoryType>({
    categories:[],
    lastVisited: "",
    updateVisited: () => {},
});

Category.displayName = 'CategoryContext';
function CategoryContext ({ children }:any)  {
    const [categories, setCategories]  = useState<CategoryItem[]>([]);
    const [lastVisited, setLastVisited] = useState("");

    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/PradyumnaBookstoreReactFetch/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    const updateVisited = (categoryName: string) => {
        setLastVisited(categoryName);
    }

    const value = {categories, lastVisited, updateVisited};

    return (
        <Category.Provider value ={value}>{children}</Category.Provider>
    );
}
export default CategoryContext;