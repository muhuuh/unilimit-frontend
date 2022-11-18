import React from "react";
import OrderBox from "./Ordering/OrderBox";
import SelectTokens from "./Tokens/SelectToken1";

const Connected = () => {
  //Look into getting all transaction from wallet based on indexed events and display them
  return (
    <div className="">
      <div>You are connected</div>
      <div className="flex  justify-center">
        <OrderBox />
      </div>
      <div className="mt-12"></div>
    </div>
  );
};

export default Connected;
