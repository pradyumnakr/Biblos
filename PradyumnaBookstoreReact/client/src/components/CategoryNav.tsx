import '../assets/css/CategoryNav.css'
import { categoryList } from '../types';
import {useState} from "react";

function CategoryNav() {
    const [selectedCategory, setSelectedCategory] = useState(0);

    const handleCategoryClick = (index:number) => {
        setSelectedCategory(index);
    };

    return (
      <nav className="bottom_navbar">
        <ul>

          {categoryList.map((category,index) => (

              <li key={category.categoryId}
                  className={index === selectedCategory ? "button-selected-category-button" : "button-unselected-category-button"}
                  onClick={() => handleCategoryClick(index)}
              >
                  <a href="">{category.name}</a>
              </li>

              ))}

        </ul>
      </nav>
  )
}

export default CategoryNav;

