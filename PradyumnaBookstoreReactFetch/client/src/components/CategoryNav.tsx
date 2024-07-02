import '../assets/css/CategoryNav.css'

import {CatProp, SelectedCategory} from "../types";

import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function CategoryNav(props: CatProp) {

    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({ categoryName: null });

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
        <ul>

          {props.catList.map((category,index) => (

              <li key={category.categoryId}>
                  <Link  to={`/categories/${category.name}`}
                         className={category.name === selectedCategory.categoryName || category.name === categoryName ? "button-selected-category-button" : "button-unselected-category-button"}
                         onClick={() => handleCategoryClick(category.name)}
                  >
                      {category.name}
                  </Link>
              </li>

              ))}

        </ul>
      </nav>
  )
}

export default CategoryNav;

