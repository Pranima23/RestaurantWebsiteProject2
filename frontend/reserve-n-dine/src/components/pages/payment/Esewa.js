import axios from "axios";
import React, { useEffect } from "react";

const Esewa = (props) => {
    const { calculateOrderTotal, orderItems } = props;

    const currentOrderFromLocalStorage = JSON.parse(
        localStorage.getItem("currentorder") || "[]"
    );

    return ( <
        >
        <
        form action = "https://uat.esewa.com.np/epay/main"
        method = "POST" >
        <
        input value = { calculateOrderTotal() }
        name = "tAmt"
        type = "text" / >
        <
        input value = { calculateOrderTotal() }
        name = "amt"
        type = "text" / >
        <
        input value = "0"
        name = "txAmt"
        type = "text" / >
        <
        input value = "0"
        name = "psc"
        type = "text" / >
        <
        input value = "0"
        name = "pdc"
        type = "text" / >
        <
        input value = "EPAYTEST"
        name = "scd"
        type = "text" / >
        <
        input value = { currentOrderFromLocalStorage }
        name = "pid"
        type = "text" / >
        <
        input value = "http://merchant.com.np/page/esewa_payment_success?q=su"
        type = "text"
        name = "su" /
        >
        <
        input value = "http://merchant.com.np/page/esewa_payment_failed?q=fu"
        type = "text"
        name = "fu" >
        { " " } <
        /input>{" "} <
        input value = "Submit"
        type = "submit" > { " " } <
        /input>{" "} <
        /form>{" "} <
        />
    );
};
export default Esewa;