const Products = ({ products, page }) => {
  return (
    <div className="products">
      {products.slice(page * 10 - 10, page * 10).map((product) => {
        return (
          <div className="product__single" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
