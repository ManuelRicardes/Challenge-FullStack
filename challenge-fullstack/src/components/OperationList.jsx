import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import axios from "axios";

const OperationList = () => {
  const [userOperations, setUserOperations] = useState();
  //----------------------------------------------------------------------
  //traigo el token

  const getUser = async () => {
    let myToken = JSON.parse(localStorage.getItem("auth_token"));

    let headers = {
      Authorization: `Bearer ${myToken.token}`,
    };
    let json = await axios.get(`http://localhost:3333/operaciones/1`, {
      headers,
    });
    const operations = json.data;
    setUserOperations(operations);

    console.log("hola", operations[0].fecha.slice(0, 10));
    return operations;
  };

  //----------------------------------------------------------------------
  // useEfect
  useEffect(() => {
    getUser();
  }, []);
  //----------------------------------------------------------------------

  return (
    <div>
      <h2>lista de operaciones</h2>
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Concepto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Monto</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          {userOperations?.map((e) => {
            return (
              <tbody key={e.id}>
                <tr>
                  <td>{e.fecha.slice(0, 10)}</td>
                  <td>{e.concepto}</td>
                  <td>{e.tipo}</td>
                  <td>{e.monto}</td>
                  <td>
                    <Pencil />
                  </td>
                  <td>
                    <Trash />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default OperationList;
