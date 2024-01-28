import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe public key
const stripePromise = loadStripe();

const cardElementOptions = {
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
};

const StripePaymentComponent = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Ensure Stripe.js has loaded
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);
      // Send the paymentMethod.id to your server for further processing
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 border rounded-lg shadow-md">
        <h1 className="text-lg font-medium mb-4 text-center">Charge Amount: $100</h1>
        <CardElement options={cardElementOptions} className="p-2 border rounded-md mb-4" />
        <button type="submit" disabled={loading} className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </Elements>
  );
};

export default StripePaymentComponent;
