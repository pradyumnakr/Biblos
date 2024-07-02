import '../assets/css/HeaderDropdown.css';
import {categoryList} from '../types';
import { Link } from 'react-router-dom';

function HeaderDropdown() {
  return (

      <div className="header-dropdown">
        <ul>
         {categoryList.map((item) =>
             <li><Link to ="/categories">{item.name}</Link></li>
         )}
        </ul>
      </div>

)
}
export default HeaderDropdown

