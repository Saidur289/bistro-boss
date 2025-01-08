import {
    CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckOutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [cart] = useCart()
  const totalPrice = cart.reduce((total, item) => total + item.price,0)
  useEffect(() => {
    axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })
  }, [axiosSecure, totalPrice])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
    const card = elements.getElement(CardElement);

    if (card == null) return;
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        // console.log('[error]', error);
        setErrorMessage(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setErrorMessage('')
      }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button  className="btn btn-sm btn-primary" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default CheckOutFrom;
