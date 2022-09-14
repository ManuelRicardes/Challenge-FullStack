import React, { useEffect, useState } from "react";
import { Pencil, Trash, Check } from "react-bootstrap-icons";
import axios from "axios";

const OperationList = () => {

  let newOperationFlag = false
  const [userOperations, setUserOperations] = useState();
  const [newOperation, setNewOperation] = useState({
    fecha: null,
    concepto: null,
    monto: null,
    tipo: null,
   
  });

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

    
    return operations;
  };

  //----------------------------------------------------------------------
  // useEfect
  useEffect(() => {
    getUser();
  }, []);
  //----------------------------------------------------------------------

const createOperation = async ()=>{
  let myToken = JSON.parse(localStorage.getItem("auth_token"));

  let headers = {
    Authorization: `Bearer ${myToken.token}`,
  }

  setNewOperation(() => ({
    fecha:
      // document.getElementById("fecha").value === "null"
      //   ? null :
         document.getElementById("fecha").value,
    monto:
      // document.getElementById("monto").value === "null"
      //   ? null :
         document.getElementById("monto").value,
    concepto:
      // document.getElementById("concepto").value === "null"
      //   ? null :
         document.getElementById("concepto").value,
    tipo:
      // document.getElementById("tipo").value === "null"
      //   ? null :
         document.getElementById("tipo").value,
  }))
try {
  let json = await axios.post(`http://localhost:3333/operaciones`, newOperation, {headers})
  
  window.location.reload()
  return json
} catch (error){
  console.log("error", newOperation)
}
}
const deleteOperation = async (id)=>{
  await axios.delete(`http://localhost:3333/operaciones/${id}`)
  window.location.reload()
  console.log("elemento eliminado")
}

const editOperation = async (id)=>{

  
  // await axios.put(`http://localhost:3333/operaciones/${id}`)
  // window.location.reload()
  console.log(id)
}


  return (
    <div>
     
        <div className="d-flex justify-content-center ">
      <h2>lista de operaciones </h2>
      </div>
     
      <button className="d-flex flex-row-reverse btn btn-secondary m-1"
      onClick={()=>newOperation()}>+</button>
    
      
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
                  <button 
                  className="btn btn-secondary"
                   onClick={()=>editOperation(e.id)}
                  >
                    <Pencil />
                  </button>
                  </td>
                  <td>
                    <button
                    className="btn btn-secondary"
                    onClick={()=>deleteOperation(e.id)}
                    >
                    <Trash />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
          {newOperationFlag===true? ()=>{
          return(
            <tbody>
           <tr>
                <th><input className="bg-dark form-control-plaintext text-white" type="date"/></th>
                <th><input className="bg-dark form-control-plaintext text-white" type="text" placeholder="Concepto"/></th>
                <th><select className="bg-dark form-control-plaintext text-white" type="text" placeholder="Tipo">
                <option  value={null}>Tipo</option>
                  <option value={"ingreso"}>Ingreso</option>
                  <option value={"egreso"}>Egreso</option>
                  
                  </select></th>
                <th><input  className="bg-dark form-control-plaintext text-white" type="text"placeholder="Monto" /></th>
                <th><button className="btn btn-secondary"><Check/></button> </th>
              </tr>
          </tbody>
            )}
          :
            <div>

            </div>
          }
        </table>
      </div>
      <h2>Nueva operacion</h2>
      <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Concepto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Monto</th>
              <th scope="col">Crear</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <th><input id="fecha" className="bg-dark form-control-plaintext text-white" type="date"/></th>
                <th><input id="concepto" className="bg-dark form-control-plaintext text-white" type="text" placeholder="Concepto"/></th>
                <th><select id="tipo" className="bg-dark form-control-plaintext text-white" type="text" placeholder="Tipo">
                <option  value={null}>Tipo</option>
                  <option value={"ingreso"}>Ingreso</option>
                  <option value={"egreso"}>Egreso</option>
                  
                  </select></th>
                <th><input id="monto" className="bg-dark form-control-plaintext text-white" type="number"placeholder="Monto" /></th>
                <th><button className="btn btn-secondary" onClick={()=>createOperation(this)}><Check/></button> </th>
              </tr>
            </tbody>
          </table>


    </div>
  );
};

export default OperationList;
