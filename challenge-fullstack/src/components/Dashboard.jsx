import React from "react";
import Balance from "./Balance";

import OperationList from "./OperationList";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Balance />
      </div>
      <div>
        <OperationList />
      </div>
    </div>
  );
};

export default Dashboard;
