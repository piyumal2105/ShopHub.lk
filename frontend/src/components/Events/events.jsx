import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "./events.css"; // Import CSS file for custom styles
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import NavBar from "../Header/Header";
import Footer from "../Footer/Footer";
import backgroundImage from "../../assets/bg website.jpeg";

function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/event");
      const eventData = response.data.map((event) => ({
        id: event._id,
        title: event.eventTitle,
        start: new Date(event.startDate),
        end: new Date(event.endDate = event.startDate), // Use startDate as end date if endDate is not provided
        description: event.description,
      }));
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const localizer = momentLocalizer(moment);

  // Custom event component to render title and description
  const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <p>{event.description}</p>
    </div>
  );

  // Function to handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  // Function to close the popup box
  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Function to move to the previous month
  const moveToPreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  // Function to move to the next month
  const moveToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  return (
    
    <>
    
      <div
        style={{ backgroundColor: "#271066", height: "60px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <center>
          <h5 style={{ color: "white" }}>Sign Up and get 10% off. Sign Up </h5>
        </center>
      </div>
      <br />
      <br />
      <NavBar />
      <br />
      {/* <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style> */}
      <br/>
      <div>
      <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>Events that are Happening </h1>
      </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <center>
    <div className="admin-event-container" style={{ width: "1300px", height: "600px" }}>
      <div className="month-navigation">
        <FcPrevious onClick={moveToPreviousMonth} style={{ fontSize: "30px" }} />
        <span style={{ fontSize: '20px', padding: '20px', fontWeight:"bold", color:"#66c2ff"}}>{currentDate.format("MMMM YYYY")}</span>
        <FcNext onClick={moveToNextMonth} style={{ fontSize: "30px" }} />
      </div>
      
      <br />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="custom-calendar"
        eventPropGetter={() => ({ className: "custom-event" })}
        components={{
          event: EventComponent,
        }}
        onSelectEvent={handleEventSelect} // Handle event selection
        onView={() => { }} // Disable view change
        onNavigate={() => { }} // Disable navigation
        date={currentDate.toDate()} // Set current date
      />
      {selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
    </center>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Footer />
    </>
  );
}

export default AdminEvent;
