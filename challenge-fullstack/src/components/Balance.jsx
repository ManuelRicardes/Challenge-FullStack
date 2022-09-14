import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Chart as ChartJS , ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const Balance = () => {

  const [userOperations, setUserOperations] = useState();
  const [resultado, setResultado] = useState()
  const [ingresos, setIngresos] = useState([])
  const [egresos, setEgresos] = useState([])
  const [egresosPercent, setEgresosPercent] = useState()
  const [ingresosPercent, setIngresosPercent] = useState()


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

  useEffect(() => {
    getUser();
   
  }, []);

  useEffect(() => {
   myBalance();
  }, [userOperations])
const myBalance = async ()=> {
  let cuenta = []

  for(let i=0 ;i<userOperations.length;i++){
    if(userOperations[i].tipo==="ingreso"){
      let ingreso = userOperations[i].monto * 1
   
      setIngresos(ingresos.unshift(ingreso))
      console.log("ingresos ",ingresos)
      
    }else{
      let egreso = userOperations[i].monto * - 1
     
      setEgresos(egresos.unshift(egreso *-1))
      console.log("egresos ",egresos)
    }
  }
    
  setIngresosPercent(()=>( ingresos.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  )))
 console.log("cansado", ingresosPercent)

 setEgresosPercent(()=>( egresos.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  0
)))
}




const data ={
  labels:["Ingrosos", "Egresos"],
  datasets:[{
    data:[ingresosPercent, egresosPercent],
    backgroundColor:['#66C24B','#F50D0D']
  }]
}
const options={
  responsive:true
}


  return (
    <div>
       <div className="d-flex justify-content-center ">
    <h2>Balance</h2>
    {/* <button onClick={()=> myBalance()}>carga de datos</button> */}
    
    </div>
    {/* <p>Tu Balance es {resultado}</p> */}
    <p>Tu Balance es {ingresosPercent-egresosPercent}</p>
    {/* {console.log("prueba ingresos" , ingresosPercent)} */}
    <div className='w-25 h-25'>
    <Pie data={data} options={options}  className="" />
    </div>
    </div>
  )
}

export default Balance