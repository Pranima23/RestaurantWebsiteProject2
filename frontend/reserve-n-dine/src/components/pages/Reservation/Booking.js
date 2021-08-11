import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./booking.css";
import { Button } from "../../Button";
import { AiFillPropertySafety } from "react-icons/ai";

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
    const availableSeats = findAvailableSeatPlans(
      seatPlans,
      reservations,
      partySize,
      checkIn,
      tables,
      approxCheckOut
    );
    setReservationDetails({
      ...reservationDetails,
      availableSeatPlans: availableSeats,
    });

    // window.alert(
    //   `If no available tables are shown, select other date and time`
    // );
  };

  const handleSelectSeatPlan = (seatPlan) => {
    console.log(seatPlan.id);
    
    if (seatPlan.table[1]) {
      alert(
        `Your booking has been confirmed for ${partySize} people at ${new Date(
          checkIn
        ).toLocaleDateString()}. You will be placed at table(s) ${
          seatPlan.table[0]
        }${seatPlan.table[1] && ` and ${seatPlan.table[1]} combined`}`
      );
    } else {
      alert(
        `Your booking has been confirmed for ${partySize} people at ${new Date(
          checkIn
        ).toLocaleDateString()}. You will be placed at table(s) ${
          seatPlan.table[0]
        }`
      );
    }
    axios
      .post(
        "api/reservations/",
        {
          check_in_date: checkIn,
          party_size: partySize,
          seat_plan: seatPlan.id,
          customer: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        localStorage.setItem("reservationId", res.data.id);
        setReservationDetails({
          ...reservationDetails,
          availableSeatPlans: [],
        });
      })
      .catch((err) => console.log(err));
  };

  //api calls
  useEffect(() => {
    axios
      .get("api/seatplans/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setSeatPlans(res.data))
      .catch((err) => console.log(err));

    axios
      .get("api/reservations/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setReservations(res.data))
      .catch((err) => console.log(err));

    axios
      .get("api/tables/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => setTables(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("Seat Plans", seatPlans);
  console.log("Reservations", reservations);
  console.log("Tables", tables);

  const { partySize, checkIn, approxCheckOut, availableSeatPlans } =
    reservationDetails;

  console.log("Checkin", checkIn);
  //   console.log("Checkout", approxCheckOut);

  console.log("Party Size", partySize);
  console.log("AVAILABLE SEAT PLANS", availableSeatPlans);
  const myStyle = {
    color: "black",
    backgroundColor: "#78bd",
    padding: "8px",
    fontFamily: "Arial",
  };
  return (
    <div className="reservation-form-container">
      <h2>Make a Reservation</h2>
      <hr />
      <p>
        For parties of six or more, we recommend making reservations at least
        two weeks in advance. For walk-ins, we only seat parties on a first
        come, first served basis.
      </p>
      <form
        className="reservation-form"
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
        <div className="reservation-form-inputs">
          <div className="check-in">
            <label>Check-in</label>
            <DatePicker
              required
              selected={checkIn}
              minDate={new Date()}
              onChange={handleChangeCheckIn}
              placeholderText=" Enter Valid date and time "
              showTimeSelect
              showYearDropdown
              dateFormat="Pp"
              filterTime={filterPassedTime}
            />
          </div>
          {/* <p>{checkOut}</p> */}
          <div className="party-size">
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
          </div>
        </div>
        <button className="find-table-btn">Find a Table</button>

        {/* {checkIn && new Date(checkIn).getTime()} */}
        {/* {availableSeatPlansList && availableSeatPlansList[0].id} */}
      </form>
      {/* <p className="tablemessagedisplay">
        {" "}
        Here, you need to pass the value for showing the table availability!
      </p> */}
      <div className="available-seat-plans-container">
        {availableSeatPlans.length !== 0 && (
          <div>Please select from the following available tables:</div>
        )}
        {availableSeatPlans.length === 0 && (
          <div>
            Please submit date, time and party size to view available tables. If
            no tables are shown, please alter the date and time.
          </div>
        )}
        {/* {availableSeatPlans.length === 0 && partySize && checkIn && (
          <div>No tables available</div>
        )} */}
        <div className="available-seat-plans">
          {availableSeatPlans &&
            availableSeatPlans.map((seatPlan, index) => (
              // console.log(seatPlan.id)
              <button
                onClick={() => handleSelectSeatPlan(seatPlan)}
                key={index}
                className="seat-btn"
              >
                {/* {console.log(seatPlan.table)} */}
                {"Table(s) "}
                {seatPlan.table[0]}
                {seatPlan.table[1] && ` and ${seatPlan.table[1]} combined`}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

// const SeatPlan = (key) => {
//   return <button>hi {seatPlan.table.map((t, tindex) => (
//     <p key={tindex}>{t.table_no}</p>
//   ))} and </button>;
// };

const OpeningHourInfo = () => {
  return (
    <div className="opening-hour-info-container">
      <div className="opening-hour-info-content">
        <div className="dashed-border-container">
          <h3>Open Timing</h3>
          <hr />
          <h5>Sunday - Friday</h5>
          <p>7 am - 10 pm</p>
          <h5>Saturday</h5>
          <p>8 am - 11 pm</p>
        </div>
      </div>
    </div>
  );
};

const ReservationContent = (props) => {
  return <div className="reservation-content">{props.children}</div>;
};

const Reservation = () => {
  return (
    <ReservationContent>
      <OpeningHourInfo />
      <ReservationForm />
    </ReservationContent>
  );
};

export default Reservation;

//# sourceMappingURL=/path/to/Booking.js.map
