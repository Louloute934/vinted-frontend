import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({ setUser, userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="Hero">
        <div className="container">
          <div className="herodiv">
            <h1>Prêts à faire du tri dans vos placards ?</h1>

            <button
              onClick={() => {
                userToken ? history.push("/publish") : history.push("/login");
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>
      <div className="offers">
        {data.offers.map((offer, index) => {
          return (
            <Link to={`/offer/${offer._id}`} className="unit">
              <p>{offer.owner.account.username}</p>
              <img src={offer.product_image.secure_url} alt="" />
              <p>{offer.product_price} €</p>
              {offer.product_details[1] && (
                <p>{offer.product_details[1].TAILLE}</p>
              )}
              {offer.product_details[0] && (
                <p>{offer.product_details[0].MARQUE}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
