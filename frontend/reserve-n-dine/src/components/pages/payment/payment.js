import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Esewa.css';
const Payment = () => {
    const handlePaymentCash = (e) => {
        e.preventDefault();
        axios
          .post("api/payments/", {
            invoice: localStorage.getItem("currentinvoice"),
            payment_method: 1,
            customer: localStorage.getItem("currentuser"),
          }, {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
        };

   
    return (
        <div className="checkout"> 
            <h3>Your bill has been saved </h3> 
             <button class="cash" onClick={handlePaymentCash}>
                 <Link to ="/"  style={{ textDecoration: "none", color:"inherit"}} className="exit">Checkout</Link></button> 
        </div>
    )
}

export default Payment