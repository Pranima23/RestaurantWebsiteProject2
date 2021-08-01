import React, { useState, useEffect } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Reservation = () => {
    const [seatPlans, setSeatPlans] = useState()
  const [checkIn, setcheckIn] = useState(null);
  const [approxCheckOut, setApproxCheckout] = useState(null);
  const serviceTimeInHour = 1;
  const [partySize, setPartySize] = useState();

  useEffect(() => {
    axios
      .get("api/seatplans/")
      .then((res) => setSeatPlans(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(seatPlans)

  //to filter out time in past
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChangeCheckIn = (date) => {
    setcheckIn(date);
    setApproxCheckout(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date.getTime() + serviceTimeInHour * 60 * 60 * 1000)
    );
  };

  const handleChangePartySize = (e) => {
    e.preventDefault();
    setPartySize(e.target.value);
  };

  // let availSeatPlans = [];
  
  // seatPlans.forEach(seatPlan => {
  //     if (!checkAvailabilityOfSeatPlan(seatPlan, checkIn)){
  //         continue
  //     } else if (checkAvailabilityOfSeatPlanByTable(seatPlan, checkIn)) {
  //           availSeatPlans.join(seatPlan)
  //     }
  // });
  // if (availSeatPlans.length>0) {
  //     seatPlan = availSeatPlans[0]
  // }

  const reservationRequest = {
    party_size: 4,
    checkin: new Date(),
  };

  return (
    <>
      <label>Check-in</label>
      <DatePicker
        required
        selected={checkIn}
        minDate={new Date()}
        onChange={handleChangeCheckIn}
        showTimeSelect
        showYearDropdown
        dateFormat="Pp"
        filterTime={filterPassedTime}
      />
      <p>{approxCheckOut}</p>
      <label>Party Size</label>
      <select value={partySize} onChange={handleChangePartySize} required>
        <option value="" disabled selected hidden>Select no. of people</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
      </select>
      {partySize}
    </>
  );
};

export default Reservation;
