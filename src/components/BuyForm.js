import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BuyForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log(data);
  const history = useHistory();
  const calculateTotal = () => {
    let result = data.product_price + 0.4 + 0.8;
    return result;
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElements = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements, {
        name: data.owner._id,
      });
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: data.product_name,
          amount: data.product_price,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        history.push("/success");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <div className="payment">
      <div className="payform">
        <div>
          <p>Résumé de la commande</p>
        </div>
        <div className="prices">
          <div className="sectionp">
            <p>Commande</p>
            <p>{data.product_price} €</p>
          </div>
          <div className="sectionp">
            <p>Frais de protection acheteurs</p>
            <p>0.40 €</p>
          </div>
          <div className="sectionp">
            <p>Frais de port</p>
            <p>0.80 €</p>
          </div>
        </div>

        <div className="sectiont">
          <h4>Total</h4>
          <h4>{calculateTotal().toFixed(2)} €</h4>
        </div>
        <div>
          <span>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            {data.product_name}. Vous allez payer {calculateTotal().toFixed(2)}{" "}
            € frais de protection et frais de port inclus
          </span>
        </div>
        <form className="stripe" onSubmit={handleSubmit}>
          <CardElement className="card" />
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default BuyForm;
