
import React from 'react';
import axios from "axios";

const esewaverify = (props) => {
    const {calculateOrderTotal,orderItems} = props;
    
    const currentOrderFromLocalStorage = JSON.parse(
        localStorage.getItem("currentorder") || "[]" );

    axios
    .get("https://uat.esewa.com.np/epay/transrec" ,"oid" , "amt" , "refId")
    
    return (
        <form action="https://uat.esewa.com.np/epay/transrec" method="GET">
        <input value={calculateOrderTotal()}  name="amt" type="hidden"/>
        <input value="EPAYTEST" name="scd" type="hidden"/>
        <input value= {currentOrderFromLocalStorage}  name="pid" type="hidden"/>
        <input value="5" name="rid" type="hidden"/>
        <input value="Submit" type="submit"/>
        </form>

    )
}

export default esewaverify;

