  
import React from 'react';
import axios from 'axios';
import './Esewa.css';

const Esewa = (props) => {
  const { calculateOrderTotal, orderItems } = props;

  const currentOrderFromLocalStorage = JSON.parse(
    localStorage.getItem('currentorder') || '[]'
  );
  const handlePayment = (e) => {
    e.preventDefault();
    axios
      .post("api/paymentmethods/", {
        payment_method_name: "eSewa",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    };
  return (<>
  
      <div className="esewacontain"><h3>You will be redirected to esewa page</h3>
      <button className="esewa "onClick={handlePayment}>Are you sure want to pay?</button> </div>
      <form action="https://uat.esewa.com.np/epay/main" method="POST">
       
        <input value={calculateOrderTotal()} name="tAmt" type="hidden" />
        <input value={calculateOrderTotal()} name="amt" type="hidden" />
        <input value="0" name="txAmt" type="hidden" />
        <input value="0" name="psc" type="hidden" />
        <input value="0" name="pdc" type="hidden" />
        <input value="EPAYTEST" name="scd" type="hidden" />
        <input value={currentOrderFromLocalStorage} name="pid" type="hidden" />
        <input
          value="http://merchant.com.np/page/esewa_payment_success?q=su"
          type="hidden"
          name="su"
        />
        <input value="http://merchant.com.np/page/esewa_payment_failed?q=fu" type="hidden" name="fu"></input>
        <div className="submit-alignment"><input value="Click here " type="submit" class="submit"></input></div>
     
      </form>
    </>
  );
};
export default Esewa;