
import React from 'react';
import axios from "axios";

const esewaverify = () => {

    //axios
    //.get("https://uat.esewa.com.np/epay/transrec" ,"oid" , "amt" , "refId")
    
    return (
        <form action="https://uat.esewa.com.np/epay/transrec" method="GET">
        <input value="100" name="amt" type="hidden"/>
        <input value="EPAYTEST" name="scd" type="hidden"/>
        <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden"/>
        <input value="5" name="rid" type="hidden"/>
        <input value="Submit" type="submit"/>
        </form>

    )
}

export default esewaverify;

