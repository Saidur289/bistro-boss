import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {loadStripe} from '@stripe/stripe-js';
import CheckOutFrom from "./CheckOutFrom";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_GATEWAY_KEY)
    return (
       <>
        <div className="mb-5 mt-5">
            <SectionTitle heading={'payment'} subHeading={'Please pay to eat'}></SectionTitle>
           <Elements stripe={stripePromise}>
            <CheckOutFrom></CheckOutFrom>
           </Elements>
            
        </div>
       
        </>
    );
};

export default Payment;