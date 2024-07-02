import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
    BrowserRouter as Router,
    Routes,
    Route, useParams,
} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
  const [categories, setCategories]  = useState([]);

  useEffect(() => {
      axios.get('http://webdev.cs.vt.edu:8080/PradyumnaBookstoreReactFetch/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
      }, []);


  return (
      <Router basename={"PradyumnaBookstoreReactFetch"}>
      <AppHeader catList= {categories } />
        <Routes>
          <Route path="/" element={<Home catList= {categories } />} />
          <Route path="/categories" element={<CategoryBookList catList= {categories} />} >
            <Route path=":id" element={<CategoryBookList catList= {categories}  />} />
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      <AppFooter/>
      </Router>
  );
}

export default App;

