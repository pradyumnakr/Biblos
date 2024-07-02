import HomeCategoryList from './HomeCategoryList';
import '../assets/css/Home.css'
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";


function Home() {
    const {categories, updateVisited} = useContext(Category);
    return (
        <div>
            <section>
                <div className="main">
                    <div className="main_tag">
                        <h1>Best Book in <br/> Top Categories</h1>
                            <Link to="/categories/Best%20Seller" className="main_btn" onClick={ () => updateVisited('Best%20Seller')}>Show Now</Link>
                    </div>

                    <div className="main_img">
                        <img src={require('../assets/images/site/Main.png')} alt=""/>
                    </div>
                </div>
            </section>

            <div className="categories">
                <HomeCategoryList/>
            </div>

        </div>

    )
}

export default Home;
