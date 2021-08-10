import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Payment = () => {
    const handlePaymentCash = (e) => {
        e.preventDefault();
        axios
          .post("api/paymentmethods/", {
            payment_method_name: "Cash on arrival",
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
        };

   
    return (
        <div>
            <h3>Your bill has been saved </h3> 
             <button classname="buttoncash" onClick={handlePaymentCash}><Link to ="/">Exit</Link></button> 
        </div>
    )
}

export default Payment