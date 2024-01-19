import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsListing from "./pages/ProductsListing";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
