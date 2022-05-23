import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <div className="navBar">
      <ul className="listaNavBar">
        <li>
          <Link className="link" to={"/"}>
            Consulta Dra. Quiroz
          </Link>
        </li>
        <li>
          <Link className="link" to={"/datePicker"}>
            Reserva tu Hora
          </Link>
        </li>
        <li>
          <Link className="link" to={"/eraseConsult"}>
            Eliminar Reserva
          </Link>
        </li>
        <li>
          <Link className="link" to={"/aboutUS"}>
            Donde Encontrarnos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
