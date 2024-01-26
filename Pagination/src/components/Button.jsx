const Button = ({ products, page, selectPageHandler }) => {
  return (
    <div className="pagination">
      <span
        onClick={() => selectPageHandler(page - 1)}
        className={page > 1 ? "" : "pagination__disable"}
      >
        ◀
      </span>

      {[...Array(products.length / 10)].map((_, i) => {
        return (
          <span
            key={i}
            className={page === i + 1 ? "pagination__selected" : ""}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        );
      })}

      <span
        onClick={() => selectPageHandler(page + 1)}
        className={page < products.length / 10 ? "" : "pagination__disable"}
      >
        ▶
      </span>
    </div>
  );
};

export default Button;
