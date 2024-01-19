import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const pathNames = pathname.split("/").filter((x) => x);
  console.log(pathNames);

  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      {pathNames.length > 0 && <Link to="/">Home</Link>}
      {pathNames.map((name, index) => {
        breadcrumbPath += `/${name}`;

        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <span key={breadcrumbPath}>/ {name}</span>
        ) : (
          <span key={index}>
            <Link to={breadcrumbPath}>/ {name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
