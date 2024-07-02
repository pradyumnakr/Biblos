import '../assets/css/CategoryNav.css'

import {CategoryItem, SelectedCategory} from "../types";

import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {

    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({ categoryName: null });

    const {categories, updateVisited} = useContext(Category);

    const location = useLocation();
    const extractCategoryName = (pathname: string) => {

        const parts = pathname.split('/');
        const index = parts.indexOf('categories');
        return parts[index + 1].replaceAll('%20', ' ');
    };

    const categoryName = extractCategoryName(location.pathname);

    useEffect(() => {
        if (categoryName) {
            setSelectedCategory({ categoryName });
        }
    }, [categoryName]);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory({ categoryName });
    };

    return (
      <nav className="bottom_navbar">
        <ul className="navbar_list">

          {categories.map((category,index) => (

              <li key={category.categoryId}>
                  <div onClick={ () => updateVisited(category.name)}>
                      <Link  to={`/categories/${category.name}`}
                             className={category.name === selectedCategory.categoryName || category.name === categoryName ? "button-selected-category-button" : "button-unselected-category-button"}
                             onClick={() => handleCategoryClick(category.name)}
                      >
                          {category.name}
                      </Link>
                  </div>
              </li>

              ))}

        </ul>
      </nav>
  )
}

export default CategoryNav;

