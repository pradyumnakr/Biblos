import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext, useState} from "react";
import {Category} from "../contexts/CategoryContext";

function HeaderDropdown() {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const categories = useContext<CategoryItem[]>(Category);


  return (

      <div className="header-dropdown" onMouseLeave={closeDropdown}>
          <a className="dropbtn" href="#Home" onMouseOver={toggleDropdown}>
              {dropdownOpen ? <img src={require('../assets/images/site/icons8-x-26.png')} alt="Close"/> : <img src={require('../assets/images/site/icons8-category-30.png')} alt="Categories"/>}
              Categories
          </a>
          {dropdownOpen && (
          <ul>
              {categories.map((item,index) =>
                  <li key={item.categoryId}>
                      <Link  to={`/categories/${item.name}`}>
                          {item.name}</Link>
                  </li>
              )}

          </ul>
              )}
      </div>

  )
}

export default HeaderDropdown

