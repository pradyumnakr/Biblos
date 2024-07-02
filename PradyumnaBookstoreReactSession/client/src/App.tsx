import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {

  return (
      <Router basename={"PradyumnaBookstoreReactSession"}>
      <AppHeader />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categories" element={<CategoryBookList/>} >
            <Route path=":id" element={<CategoryBookList/>} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      <AppFooter/>
      </Router>
  );
}

export default App;

