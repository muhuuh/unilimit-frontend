import React from "react";
import OrderBox from "./Ordering/OrderBox";
//import PriceChart from "./PriceCharts/PriceChart";

const Connected = () => {
  //Look into getting all transaction from wallet based on indexed events and display them
  return (
    <div className="">
      <div className="flex  justify-center">
        <OrderBox />
      </div>
      <div className="mt-12"></div>
    </div>
  );
};

export default Connected;
