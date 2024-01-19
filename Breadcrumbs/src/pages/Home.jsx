import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        const sliceTrending = res.products.slice(0, 6);
        setTrendingProducts(sliceTrending);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="heading">Trending Products 🔥 </h2>
      <Breadcrumbs />
      <div className="product__grid">
        {trendingProducts?.map((product) => {
          return (
            <div className="product__card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="image"
                />
                <h3>{product.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/products">
        <button style={{ width: "100%", padding: 10 }}>
          View All Products
        </button>
      </Link>
    </div>
  );
};

export default Home;
