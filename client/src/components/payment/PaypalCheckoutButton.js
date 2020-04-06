import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';


const PaypalCheckoutButton = ({ order, pcnl }) => {
  const paypalConf = {
    currency: 'USD',
    env: 'sandbox',
    client: {
      sandbox: "AVV1zidI1RtZvVlvzDASYSBFUPcLxOjUXw7WwZyZlvLyodbuFmELZ_e55GDO9F1j-9dBM-oycPld-Bap",
      production: '--',
    },
    style: {
      label: 'pay',
      size: 'medium', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      color: 'gold',  // gold | blue | silver | black
    },
  };

  const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: 'product description',
          custom: order.customer || '',
          item_list: {
            items: order.items
          },
        },
      ],
      note_to_payer: 'testing mood note',
    };

    // console.log(payment);
    return actions.payment.create({
      payment,
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment.execute()
      .then(response => {
        console.log(response);
        alert(`alert, ID: ${response.id}`)
      })
      .catch(error => {
        console.log(error);
	      alert('alert error!');
      });
  };

  const onError = (error) => {
    alert ('an error occured and payment declined!' );
  };

  const onCancel = (data, actions) => {
    alert( 'Payment canceled!' );
  };


  return (
    <PayPalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onAuthorize={(data, actions) => onAuthorize(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={(error) => onError(error)}
      style={paypalConf.style}
      commit
      locale="en_US"
    />

  );
}

export default PaypalCheckoutButton;
