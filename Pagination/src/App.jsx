import { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/products";
import Button from "./components/Button";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const json = await response.json();

    if (json && json.products) {
      setProducts(json.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div className="container">
      <h1 className="heading">Pagination</h1>
      {products.length > 0 && <Products page={page} products={products} />}

      {products.length > 0 && (
        <Button
          products={products}
          page={page}
          selectPageHandler={selectPageHandler}
        />
      )}
    </div>
  );
}

export default App;
