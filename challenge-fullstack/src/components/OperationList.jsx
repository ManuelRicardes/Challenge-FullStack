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

const newOperation = ()=>{
  

    <div>
      <tr>
    <input placeholder="aaaa"></input>
    </tr>
    </div>
     
}

const deleteOperation = async (id)=>{
  await axios.delete(`http://localhost:3333/operaciones/${id}`)
  window.location.reload()
  console.log("elemento eliminado")
}

  return (
    <div>
     
        <div className="d-flex justify-content-center ">
      <h2>lista de operaciones </h2>
      </div>
     
      <button className="d-flex flex-row-reverse btn btn-secondary m-1"
      onClick={newOperation}>+</button>
    
      
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
                  <button>
                    <Pencil />
                  </button>
                  </td>
                  <td>
                    <button
                    onClick={()=>deleteOperation(e.id)}
                    >
                    <Trash />
                    </button>
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
