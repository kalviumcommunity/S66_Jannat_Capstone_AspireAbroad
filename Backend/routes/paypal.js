process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

// Configure PayPal


paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: process.env.CLIENT,
  client_secret: process.env.PAYPAL_SECRET,
});

// Route to create a payment
router.post('/create-payment', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:0710/paypal/success',
      cancel_url: 'http://localhost:0710/paypal/cancel'
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Visa Consultation',
          sku: '001',
          price: '10.00',
          currency: 'USD',
          quantity: 1
        }]
      },
      amount: {
        currency: 'USD',
        total: '10.00'
      },
      description: 'Visa Consultation Payment'
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.status(500).send(error);
    } else {
      // Redirect user to PayPal approval URL
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
      res.json({ approvalUrl: approvalUrl.href });
    }
  });
});

// Success route
router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.status(500).send(error);
    } else {
      res.send('Payment completed successfully');
    }
  });
});

// Cancel route
router.get('/cancel', (req, res) => {
  res.send('Payment cancelled');
});

module.exports = router;
