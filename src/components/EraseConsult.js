import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "./styles.css";

const EraseConsult = () => {
  const [id, setId] = useState("");
  const [hora, setHora] = useState(0);
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState({});
  const [mostrar, setMostrar] = useState(false);
  const navigate = useNavigate();

  const enviarId = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/traer/${id}/${hora}`)
      .then((res) => {
        setDatos(res.data);
        console.log(res);
      })
      .catch((err) => console.error(err));

    setMostrar(true);
  };

  const eliminar = () => {
    axios
      .put("http://localhost:8000/api/agregar", {
        fecha: fecha,
        hora: hora,
        nombre: "",
        motivo: "",
        libre: true,
      })
      .then(() => console.log("formulario enviado"))
      .catch((err) => console.error(err));
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="erase">
        <h1>Favor ingresar su ID de consulta</h1>
        <h2>
          (Puede encontrar estos datos en el mail que recibió al momento de
          angendar su consulta)
        </h2>
        <form className="eraseForm" onSubmit={enviarId}>
          <label htmlFor="idDeConsulta">ID de Consulta: </label>
          <input
            type="text"
            name="idDeConsulta"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="horaDeConsulta">Hora de Consulta: </label>
          <input
            type="number"
            name="horaDeConsulta"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <label htmlFor="fechaDeConsulta">Fecha de Consulta: </label>
          <input
            type="text"
            name="fechaDeConsulta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <button>Enviar ID</button>
        </form>
        {mostrar && (
          <>
            <p>
              Señor/a <b>{datos.nombre}</b>, si desea eliminar su Hora de
              Consulta de {datos.fecha} a las {datos.hora} haga Click en el
              siguiente boton
            </p>
            <button onClick={eliminar}>Eliminar Consulta</button>
          </>
        )}
      </div>
    </>
  );
};

export default EraseConsult;
