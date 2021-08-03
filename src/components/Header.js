import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser }) => {
  const history = useHistory();

  return (
    <header>
      <div className="header">
        <img
          src={logo}
          alt=""
          onClick={() => {
            history.push("/");
          }}
        />
        <div className="searchArea">
          <FontAwesomeIcon className="icon" icon="search" />
          <input type="text" placeholder="     Rechercher des articles" />
        </div>
        <div className="connectButtons">
          {userToken ? (
            <button className="deco" onClick={() => setUser(null)}>
              Se déconnecter
            </button>
          ) : (
            <div className="connectButtons">
              <Link className="link" to="login">
                Se connecter
              </Link>
              <br />
              <Link className="link" to="/signup">
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        <div className="sell">
          <button
            onClick={() => {
              userToken ? history.push("/publish") : history.push("/login");
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
