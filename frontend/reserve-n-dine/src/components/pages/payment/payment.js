import React from "react";
import { isAuthenticated } from "../auth/helper";

const LocalPayment = ({ products }) => {



    // Esewa
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
        amt: getAllPrice(),
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: getAllPrice(),
        pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
        scd: "epay_payment",
        su: "http://merchant.com.np/page/esewa_payment_success?q=su",
        fu: "http://merchant.com.np/page/esewa_payment_failed?q=fue"
    }

    const post = (path, params) => {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }


    const handleEsewa = () => {
        post(path, params);
    }





    return ( <
        div > {
            (isAuthenticated() && products !== undefined && products.length !== 0) &&
            <
            >
            <
            h3 className = "my-3" > Your Bill is NPR { getAllPrice() } < /h3> <
            button className = "my-3 mx-3 ml-3 btn btn-lg btn-success"
            onClick = { handleEsewa } > Pay with esewa < /button> <
            />
        } <
        /div>
    )
}

export default LocalPayment;