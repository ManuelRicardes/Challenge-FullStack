import React, { useEffect, useState } from "react";
import { Pencil, Trash, Check } from "react-bootstrap-icons";
import axios from "axios";

const OperationList = () => {
  const [editOperationFlag, setEditOperationFlag] = useState("false");
  const [editableOperation, setEditableOperation] = useState({
    fecha: null,
    concepto: null,
    monto: null,
  });
  const [userOperations, setUserOperations] = useState();
  const [createOperationFlag, setCreateOperationFlag] = useState("false");
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

  const addOperation = async ()=>{
    setCreateOperationFlag ("true")
  }

  const createOperation = async () => {
    let myToken = JSON.parse(localStorage.getItem("auth_token"));

    let headers = {
      Authorization: `Bearer ${myToken.token}`,
    };

    setNewOperation(() => ({
      fecha:
        
        document.getElementById("fecha").value,
      monto:
        
        document.getElementById("monto").value,
      concepto:
        document.getElementById("concepto").value,
      tipo:
        document.getElementById("tipo").value,
    }));
    try {
      let json = await axios.post(
        `http://localhost:3333/operaciones`,
        newOperation,
        { headers }
      );

      window.location.reload();
      return json;
    } catch (error) {
      console.log("error", newOperation);
    }
  };
  const deleteOperation = async (id) => {
    await axios.delete(`http://localhost:3333/operaciones/${id}`);
    window.location.reload();
    console.log("elemento eliminado");
  };

  const editOperation = async (e) => {
    
    setEditableOperation(()=>({
      fecha: e.fecha,
      monto:e.monto,
      concepto:e.concepto,
      tipo:e.tipo,
      id:e.id
    }))
    setEditOperationFlag ("true")

    
    // 
    // window.location.reload()
    console.log("aa",e.id);
  };
  const edit = async (id)=>{
    let myToken = JSON.parse(localStorage.getItem("auth_token"));

    let headers = {
      Authorization: `Bearer ${myToken.token}`,
    };

    setNewOperation (()=>({
      fecha:
        
      document.getElementById("editFecha").value,
    monto:
      
      document.getElementById("editMonto").value,
    concepto:
      document.getElementById("editConcepto").value,
    }))
    console.log("elemento editado antes del put", newOperation)

    let json = await axios.put(`http://localhost:3333/operaciones/${id}`, newOperation,{headers})
    console.log("elemento editado", newOperation)
    await window.location.reload()
return json
  }

  const minusEdit = ()=>{
    setEditOperationFlag ("false")
  }

  const minusCreate = ()=>{
    setCreateOperationFlag ("false")
  }

  return (
    <div>
      <div className="d-flex justify-content-center ">
        <h2>Lista de operaciones </h2>
      </div>
        <button className="btn btn-secondary" onClick={()=> addOperation()}>+</button>
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
          {
          
          userOperations?.map((e) => {
            
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
                      onClick={() => editOperation(e)}
                    >
                      <Pencil />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteOperation(e.id)}
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
{/* ------------------------------------------------------------------------------ */}
      {createOperationFlag==="true"? (
            
            <div>
              <h2>Nueva operación</h2>
              <button className="btn btn-danger" onClick={()=> minusCreate()}>X</button>
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
            <th>
              <input
                id="fecha"
                className="bg-dark form-control-plaintext text-white"
                type="date"
              />
            </th>
            <th>
              <input
                id="concepto"
                className="bg-dark form-control-plaintext text-white"
                type="text"
                placeholder="Concepto"
              />
            </th>
            <th>
              <select
                id="tipo"
                className="bg-dark form-control-plaintext text-white"
                type="text"
                placeholder="Tipo"
              >
                <option value={null}>Tipo</option>
                <option value={"ingreso"}>Ingreso</option>
                <option value={"egreso"}>Egreso</option>
              </select>
            </th>
            <th>
              <input
                id="monto"
                className="bg-dark form-control-plaintext text-white"
                type="number"
                placeholder="Monto"
              />
            </th>
            <th>
              <button
                className="btn btn-secondary"
                onClick={() => createOperation(this)}
              >
                <Check />
              </button>{" "}
            </th>
          </tr>
        </tbody>
      </table>

            </div>
            
            ):
            (
              <div>
  
              </div>
            )}
      

          {editOperationFlag==="true"? (
            
          <div>
            <h2 className="text-dark">Editar operación</h2>
            <button className="btn btn-danger" onClick={()=>minusEdit()}>X</button>
            <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Concepto</th>
            <th scope="col">Tipo</th>
            <th scope="col">Monto</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <input
                id="editFecha"
                className="bg-dark form-control-plaintext text-white"
                type="date"
                placeholder={editableOperation.fecha}
              />
            </th>
            <th>
              <input
                id="editConcepto"
                className="bg-dark form-control-plaintext text-white"
                type="text"
                placeholder={editableOperation.concepto}
              />
            </th>
            <th>
             {editableOperation.tipo}
            </th>
            <th>
              <input
                id="editMonto"
                className="bg-dark form-control-plaintext text-white"
                type="number"
                placeholder={editableOperation.monto}
              />
            </th>
            <th>
              <button
                className ="btn btn-secondary"
                onClick={() => edit(editableOperation.id)}
              >
                <Check />
              </button>{" "}
            </th>
          </tr>
        </tbody>
      </table>
          </div>
          
          ):
          (
            <div>

            </div>
          )}
    </div>
  );
};

export default OperationList;
