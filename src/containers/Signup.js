import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useState } from "react";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );

      //console.log(response.data.token);
      setUser(response.data.token);
      history.push("/");
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 409) {
        setError("Un compte existe déjà avec cet email");
      }
    }
  };
  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="Adresse email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="news">
          <input type="checkbox" placeholder="S'inscrire à notre Newsletter" />
          <h3>S'inscrire à notre Newsletter</h3>
        </div>

        <span className="politic">
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans
        </span>
        <div className="error">{error}</div>

        <button className="submit" type="submit">
          S'inscrire
        </button>
        <Link className="link1" to="/login">
          Tu as déjà un compte ? Connecte-toi!
        </Link>
      </form>
    </div>
  );
};
export default Signup;
