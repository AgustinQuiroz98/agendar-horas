import React, { useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import axios from "axios";
import Navbar from "./NavBar";

const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [datos, setDatos] = useState([]);
  const [id, setId] = useState("");

  const MyContainer = ({ className, children }) => {
    return (
      //style={{ padding: "16px", background: "#216ba5", color: "#fff" }}
      <div>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0", padding: "1rem" }}>
            Que dia le gustaria tomar su hora
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const finDeSemana = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const generarFecha = (fechaCompleta) => {
    let fecha =
      fechaCompleta.getDate() +
      "-" +
      (fechaCompleta.getMonth() + 1) +
      "-" +
      fechaCompleta.getFullYear();
    return fecha;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/traerHoras/${generarFecha(startDate)}`)
      .then((res) => {
        setDatos(res.data.listaHoras);
        setId(res.data._id);
      })
      .catch((err) => console.error(err));
  }, [startDate]);

  return (
    <>
      <Navbar />
      <div className="reservaDeHorario">
        <h1>Reserva de Hora</h1>
        <DatePicker
          className="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          calendarContainer={MyContainer}
          isClearable
          placeholderText="Click Aqui Para Elejir Fecha"
          dateFormat="dd/MM/yyyy"
          // dateFormat="MM/dd/yyyy  EE hh:mm a"
          // showTimeSelect
          minDate={new Date()}
          withPortal
          filterDate={finDeSemana}
        />
      </div>
      <h2>Horas disponibles:</h2>

      <ul>
        {datos
          .filter((obj) => obj.libre === true)
          .map((obj, i) => (
            <li className="listaHoras" key={i}>
              {obj.hora}
              <Link
                to={`/booking/${id}/${generarFecha(startDate)}/${obj.hora}`}
              >
                Reservar Hora
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default DateSelector;
