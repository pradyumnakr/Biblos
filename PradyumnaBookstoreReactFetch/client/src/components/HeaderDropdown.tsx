import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {CatProp} from "../types";
import {useState} from "react";

function HeaderDropdown(props:CatProp) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

  return (

      <div className="header-dropdown" onMouseLeave={closeDropdown}>
          <a className="dropbtn" href="#Home" onMouseOver={toggleDropdown}>
              {dropdownOpen ? <img src={require('../assets/images/site/icons8-x-26.png')} alt="Close"/> : <img src={require('../assets/images/site/icons8-category-30.png')} alt="Categories"/>}
              Categories
          </a>
          {dropdownOpen && (
          <ul>
              {props.catList.map((item,index) =>
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

