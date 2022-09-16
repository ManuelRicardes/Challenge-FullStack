import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Balance = () => {
  const [userOperations, setUserOperations] = useState();
  const [resultado, setResultado] = useState();
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [egresosPercent, setEgresosPercent] = useState();
  const [ingresosPercent, setIngresosPercent] = useState();

  const getUser = async () => {
    let myToken = JSON.parse(localStorage.getItem("auth_token"));

    let headers = {
      Authorization: `Bearer ${myToken[0].token}`,
    };
    let json = await axios.get(
      `http://localhost:3333/operaciones/${myToken[1].id}`,
      {
        headers,
      }
    );
    const operations = json.data;
    setUserOperations(operations);

    return operations;
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    myBalance();
  }, [userOperations]);
  const myBalance = async () => {
    for (let i = 0; i < userOperations.length; i++) {
      if (userOperations[i].tipo === "ingreso") {
        let ingreso = userOperations[i].monto * 1;

        setIngresos(ingresos.unshift(ingreso));
      } else {
        let egreso = userOperations[i].monto * -1;

        setEgresos(egresos.unshift(egreso * -1));
      }
    }

    setIngresosPercent(() =>
      ingresos.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );

    setEgresosPercent(() =>
      egresos.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );
  };

  const data = {
    labels: ["Ingresos", "Egresos"],
    datasets: [
      {
        data: [ingresosPercent, egresosPercent],
        backgroundColor: ["#66C24B", "#F50D0D"],
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return (
    <div>
      <div className="d-flex justify-content-center ">
        <h2>Balance</h2>
      </div>
      <div className="d-flex justify-content-center  p-2">
        <div className="text-center w-50 mt-5">
          {ingresosPercent - egresosPercent < 0 ? (
            <h3 className="text-danger mt-5">
              {" "}
              ${ingresosPercent - egresosPercent}
            </h3>
          ) : (
            <h3 className="mt-5"> ${ingresosPercent - egresosPercent}</h3>
          )}
        </div>
        <div className="me-5 w-25 h-25">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Balance;
