import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";

const BookingConsult = () => {
  const { _id, hora, fecha } = useParams();
  const [datos, setDatos] = useState({});
  const [nombre, setNombre] = useState("");
  const [motivo, setMotivo] = useState("");

  useEffect(
    () =>
      axios
        .get(`http://localhost:8000/api/traer/${_id}/${hora}`)
        .then((res) => {
          setDatos(res.data);
          console.log(res.data);
        })
        .catch((err) => console.error(err)),
    [_id, hora]
  );
  const submit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/agregar", {
        fecha: fecha,
        hora: datos.hora,
        nombre: nombre,
        motivo: motivo,
        libre: false,
      })
      .then(() => console.log("formulario enviado"))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Navbar />
      <h1>
        Para reservar su hora a las {hora} del dia {fecha}, favor rellenar
        formulario
      </h1>
      <form className="bookingForm" onSubmit={submit}>
        <label htmlFor="nombre">Nombre Paciente:</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="motivo">Motivo Visita:</label>
        <input
          type="text"
          name="motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <button>Reservar Hora</button>
      </form>
    </div>
  );
};

export default BookingConsult;
