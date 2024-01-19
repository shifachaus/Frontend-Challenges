import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="heading"> Products Listing </h2>
      <Breadcrumbs />
      <div className="product__grid">
        {products?.map((product) => {
          return (
            <div className="product__card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="image"
                />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsListing;
