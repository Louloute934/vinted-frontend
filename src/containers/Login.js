import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      setUser(response.data.token);
      history.push("/");
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 401) {
        setError("Email ou Mot de Passe incorrect");
      }
      if (error.response.status === 400) {
        setError("Aucun compte existant avec ces informations");
      }
    }
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Se Connecter</h1>
        <input
          type="email"
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="error">{error}</div>
        <button className="submit" type="submit">
          Envoyer
        </button>
        <Link to="/signup" className="link1">
          Pas encore de compte? Inscris-toi
        </Link>
      </form>
    </div>
  );
};
export default Login;
