import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./components/styles.css";
import DateSelector from "./components/DatePicker";
import "./App.css";
import BookingConsult from "./components/BookingConsult";
import AboutUs from "./components/AboutUs";
import EraseConsult from "./components/EraseConsult";

function App() {
  return (
    <div className="general">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datePicker" element={<DateSelector />} />
          <Route
            path="/booking/:_id/:fecha/:hora"
            element={<BookingConsult />}
          />
          <Route path="/eraseConsult" element={<EraseConsult />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
