import { useParams, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ userToken }) => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Offer">
      <div className="offerPage">
        <img src={data.product_image.secure_url} alt="" />

        <div className="descriptionPart">
          <h2>{data.product_price} €</h2>
          <div className="descriptionOffer">
            {data.product_details.map((elem, index) => {
              const keys = Object.keys(elem);

              return (
                <div key={index} className="description">
                  <span>{keys[0]}</span>
                  <span>{elem[keys[0]]}</span>
                </div>
              );
            })}
          </div>

          <div>
            <h4>{data.product_name}</h4>
            <p>{data.product_description}</p>
            <p>{data.owner.account.username}</p>
          </div>
          <div>
            {userToken ? (
              <Link
                to={{ pathname: "/payment", state: { data: data } }}
                className="buy"
              >
                Acheter
              </Link>
            ) : (
              <Link className="buy" to="/login">
                Acheter
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
