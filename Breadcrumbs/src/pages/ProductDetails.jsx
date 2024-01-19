import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(product);

  return (
    <div>
      <h2 className="heading"> Products Details </h2>
      <Breadcrumbs />
      {product ? (
        <div className="product__content">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="image"
            />
          </div>
          <div className="product__info">
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
