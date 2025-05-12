
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51RA2tw2KEtFpkeqFlKUnvL9wlNdRulNQ1RwhJ426O3DMKHXprCueE18ABqYifyDy1V2ddjm2C4iK7D2VL8jwnSJ600XEaEL3GC"); // Your publishable key

function PaymentPage() {
  const location = useLocation();
  const { amount, userInfo, cart } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (amount && userInfo) {
      axios
        .post(`https://sai-enterprises-backend.onrender.com/create-payment-intent`, {
          totalAmount: amount,
          customer_email: userInfo.email, 
          metadata: {
            name: userInfo.name,
            phone: userInfo.phone,
          },
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [amount, userInfo]);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm userInfo={userInfo} cart={cart} />
      </Elements>
    )
  );
}

export default PaymentPage;
