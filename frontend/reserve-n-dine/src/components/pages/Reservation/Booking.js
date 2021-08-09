import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Service time
const serviceTimeInHour = 1;

//calculate checkout
const calculateCheckOut = (checkIn) => {
  return new Date(checkIn.getTime() + serviceTimeInHour * 60 * 60 * 1000);
};

function findAvailableSeatPlans(
  seatPlans,
  reservations,
  partySize,
  checkIn,
  tables,
  approxCheckOut
) {
  if (seatPlans && reservations && tables) {
    //extracting seat plans for input party size
    let seatPlansList = seatPlans.filter(
      (seatplan) => seatplan.party_size_capacity == partySize
    );
    console.log(`Seat plans for party size=${partySize}`, seatPlansList);

    //function modules to check availability for different cases
    function checkAvailabilityOfSeatPlan(seatPlan, checkIn, checkOut) {
      console.log(
        `======================================CHECKING AVAILABILITY OF SEAT PLAN ${seatPlan.id}====================================`
      );
      let bookingList = reservations.filter(
        (reservation) => reservation.seat_plan == seatPlan.id
      );
      console.log(
        `All reservations with seat plan ${seatPlan.id}`,
        bookingList
      );
      let available = true;

      bookingList.forEach((reservation) => {
        console.log(`Checking time overlap with reservation`, reservation);
        let reservationCheckIn = new Date(reservation.check_in_date);
        let reservationCheckOut = calculateCheckOut(reservationCheckIn);
        console.log("Reservation checkin", reservationCheckIn);
        console.log("Reservation checkout", reservationCheckOut);
        if (checkIn > reservationCheckOut || checkOut < reservationCheckIn) {
          available = true;
        } else {
          available = false;
        }
      });
      return available;
    }

    function checkAvailabilityOfTable(table_no, checkIn, checkOut) {
      console.log(`checking abailability of table ${table_no}..........`);
      let table = tables.filter((table) => table.table_no == table_no);
      console.log(table);
      let seatPlansWithTable = seatPlans.filter((seatPlan) =>
        seatPlan.table.includes(table_no)
      );
      console.log(`Seat plans with table ${table_no}`, seatPlansWithTable);
      let reservedSeatPlans = [];
      let reservedList = [];

      reservations.forEach((reservation) => {
        reservedSeatPlans = seatPlansWithTable.filter(
          (seatPlan) => seatPlan.id == reservation.seat_plan
        );
        console.log(reservedSeatPlans);
        reservedList.push(...reservedSeatPlans);
      });
      console.log(reservedList);

      let availList = [];
      let avail = true;
      reservedList.forEach((seatPlan) => {
        avail = checkAvailabilityOfSeatPlan(seatPlan, checkIn, checkOut);
        console.log(
          `Availability of seat plan ${seatPlan.id} containing table ${table_no}`,
          avail
        );
        availList.push(avail);
      });
      console.log(availList);
      if (availList.includes(false)) {
        return false;
      } else {
        return true;
      }
    }

    function checkAvailabilityOfSeatPlanByTable(seatPlan, checkIn, checkOut) {
      let tablesInSeatPlan = seatPlan.table;
      console.log(`Tables in seat plan ${seatPlan.id}:`, tablesInSeatPlan);
      let avail = true;
      let availableTableList = [];
      tablesInSeatPlan.forEach((table) => {
        avail = checkAvailabilityOfTable(table, checkIn, checkOut);
        availableTableList.push(avail);
      });
      console.log(availableTableList);
      if (availableTableList.includes(false)) {
        return false;
      } else {
        return true;
      }
    }

    let availableSeatPlans = [];
    seatPlansList.forEach((seatPlan) => {
      console.log(
        `Seat plan ${seatPlan.id} free = `,
        checkAvailabilityOfSeatPlan(seatPlan, checkIn, approxCheckOut)
      );
      if (!checkAvailabilityOfSeatPlan(seatPlan, checkIn, approxCheckOut)) {
        return;
      } else {
        console.log("further checking availability.......");
        if (
          checkAvailabilityOfSeatPlanByTable(seatPlan, checkIn, approxCheckOut)
        ) {
          console.log(`Seat plan ${seatPlan.id} IS AVAILABLE`);
          availableSeatPlans.push(seatPlan);
        } else {
          console.log(`Seat plan ${seatPlan.id} IS NOT AVAILABLE`);
        }
      }
    });
    console.log("available seat plans are", availableSeatPlans);
    return availableSeatPlans;
    // setAvailableSeatPlansList(availableSeatPlans);
  }
}

const ReservationForm = () => {
  //states
  const [reservationDetails, setReservationDetails] = useState({
    partySize: 0,
    checkIn: null,
    approxCheckOut: null,
    availableSeatPlans: [],
  });

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });

//   const [availableSeatPlansList, setAvailableSeatPlansList] = useState([]);

  const [seatPlans, setSeatPlans] = useState();
  const [reservations, setReservations] = useState();
  const [tables, setTables] = useState();

  //to filter out time in past in date-time picker
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  //event handlers
  const handleChangeCheckIn = (date) => {
    const checkIn = date;
    const checkOut = calculateCheckOut(date);
    setReservationDetails({
      ...reservationDetails,
      checkIn: checkIn,
      approxCheckOut: checkOut,
    });
  };

  const handleChangePartySize = (e) => {
    e.preventDefault();
    setReservationDetails({ ...reservationDetails, partySize: e.target.value });
  };
  const handleReservationFormSubmit = (
    e,
    seatPlans,
    reservations,
    partySize,
    checkIn,
    tables,
    approxCheckOut
  ) => {
    e.preventDefault();
    const availableSeatPlans = findAvailableSeatPlans(
      seatPlans,
      reservations,
      partySize,
      checkIn,
      tables,
      approxCheckOut
    );
    setReservationDetails({...reservationDetails, availableSeatPlans: availableSeatPlans})
  };

  //api calls
  useEffect(() => {
    axios
      .get("api/seatplans/")
      .then((res) => setSeatPlans(res.data))
      .catch((err) => console.log(err));

    axios
      .get("api/reservations/")
      .then((res) => setReservations(res.data))
      .catch((err) => console.log(err));

    axios
      .get("api/tables/")
      .then((res) => setTables(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("Seat Plans", seatPlans);
  console.log("Reservations", reservations);
  console.log("Tables", tables);

  const { partySize, checkIn, approxCheckOut, availableSeatPlans } = reservationDetails;

  console.log("Checkin", checkIn);
  //   console.log("Checkout", approxCheckOut);
  
  console.log("Party Size", partySize);
  console.log("AVAILABLE SEAT PLANS", availableSeatPlans);
  return (
    <form
      onSubmit={(e) =>
        handleReservationFormSubmit(
          e,
          seatPlans,
          reservations,
          partySize,
          checkIn,
          tables,
          approxCheckOut
        )
      }
    >
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
      {/* <p>{checkOut}</p> */}
      <label>Party Size</label>
      <select value={partySize} onChange={handleChangePartySize} required>
        <option value="" selected hidden>
          Select no. of people
        </option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
      </select>
      <input type="submit" value="Find a table" />
      {partySize}
      {/* {checkIn && new Date(checkIn).getTime()} */}
      {/* {availableSeatPlansList && availableSeatPlansList[0].id} */}
    </form>
  );
};

export default ReservationForm;
