import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ userInfo }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url is optional when redirect is set to 'if_required'
      },
      redirect: "if_required",
    });

    if (error) {
      alert(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("Payment successful");
      navigate("/orders");
    } else{
      alert("Payment Failed")
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
      <p>
        <strong>Name:</strong> {userInfo.name}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Phone:</strong> {userInfo.phone}
      </p>

      <div className="my-4">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
