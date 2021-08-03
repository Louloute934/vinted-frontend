import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

import BuyForm from "../components/BuyForm";

const Payment = () => {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const location = useLocation();
  const data = location.state.data;

  return (
    <Elements stripe={stripePromise}>
      <BuyForm data={data} />
    </Elements>
  );
};
export default Payment;
