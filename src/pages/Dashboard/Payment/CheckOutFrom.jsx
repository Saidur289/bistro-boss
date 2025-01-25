import {
    CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";



const CheckOutFrom = () => {
    // user for send confirmation data
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    // navigate hook for after order confirmed user redirect to payment history page 
    const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [cart, refetch, isLoading] = useCart()
  if(isLoading) return <Loading></Loading>
  const totalPrice = cart.reduce((total, item) => total + item.price,0)
  useEffect(() => {
   if(totalPrice>0){
    axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })
   }
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
    //   confirm payment 
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'

            }
        }
        
    })
    if(confirmError){
        console.log('error', confirmError);
    }
    else{
        console.log('payment intent', paymentIntent);
        setTransactionId(paymentIntent.id)
        // after confirm save data to database 
        const payment = {
            email: user?.email,
            price: totalPrice,
            transactionId: paymentIntent?.id,
            //moment js use korte hobe
            date: new Date(),
            cartIds: cart.map(item => item._id),
            menuId: cart.map(item => item.menuId),
            status: 'pending'

        }
        const res = await axiosSecure.post('/payments', payment)
        console.log(res.data);
        refetch()
        if(res?.data?.paymentResult?.insertedId){
        Swal.fire('Thank You For Order')
        }
        navigate('/dashboard/paymentHistory')
    }
  };
  const handleCreatePaymentWithSSL = async() => {
    const payment = {
      email: user?.email,
      price: totalPrice,
      transactionId: '',
      //moment js use korte hobe
      date: new Date(),
      cartIds: cart.map(item => item._id),
      menuId: cart.map(item => item.menuId),
      status: 'pending'

  }
  const response = await axiosPublic.post(`/create-ssl-payment`, payment)
  console.log('response', response);
  if(response?.data?.gateWayUrl){
    window.location.replace(response?.data?.gateWayUrl)
  }
  }
  return (
   <>
    <div className="mb-5">
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
        Pay With Stripe
      </button>
    </form>
    <p className="text-red-500">{errorMessage}</p>
    {
        transactionId && <p className="text-green-500"> TransactionId: {transactionId}</p>
    }
    </div>
    <button onClick={handleCreatePaymentWithSSL} className="btn btn-primary">Payment With Islcommerce</button>
    </>
  );
};

export default CheckOutFrom;
