import React, { useState } from 'react';
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import useAuth from 'customHooks/useAuth';

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const { emptyCart, addCartToMyBooks } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          'http://localhost:5000/api/cart/checkout',
          {
            id
          },
          {
            withCredentials: true
          }
        );
        const { success, clientSecret } = response.data;
        if (success) {
          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card
            }
          });
          if (!error) {
            enqueueSnackbar('Payment Successful!', {
              variant: 'success'
            });
            enqueueSnackbar('Happy Reading!', {
              variant: 'success'
            });
            addCartToMyBooks((myBooks) => {
              emptyCart();
            });
            return;
          }
        }
        enqueueSnackbar('Payment failed! Please try again!', {
          variant: 'error'
        });
      } catch (err) {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Card number
          <CardNumberElement options={CARD_OPTIONS} />
        </label>
        <label>
          Expiration date
          <CardExpiryElement options={CARD_OPTIONS} />
        </label>
        <label>
          CVC
          <CardCvcElement options={CARD_OPTIONS} />
        </label>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </Button>
      </form>
    </>
  );
}
