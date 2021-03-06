import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
const PUBLIC_KEY =
  'pk_test_51JkTYeSC3us5dMG8n2mfl1ZreUSKkSlAxNPm9xSMBDgTaCCn4hkyE8rsRCryqnnotnaxEDUxkFkUAtm4CqY6xvSD00FGquOIfM';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
