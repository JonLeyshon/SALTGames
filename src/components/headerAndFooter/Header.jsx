import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/">
        <p>SALT Games</p>
      </Link>
      <div className="menu">
        <ul>
          <li>Sounds</li>
          <li>Games </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
