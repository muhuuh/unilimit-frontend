import React, { useState } from "react";
import useInput from "../../../hooks/use-input";
import useModal from "../../../hooks/use-modal";
import SelectToken1 from "../Tokens/SelectToken1";
import SelectToken0 from "../Tokens/SelectToken0";
import { contractAddresses, abi } from "../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";

const OrderBox = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex).toString();
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [tokenTicker0, setTokenTicker0] = useState("");
  const [tokenTicker1, setTokenTicker1] = useState("");

  console.log("chainId");
  console.log(chainId);

  //Modal
  const {
    isVisible: isVisibleToken0,
    onCloseHandler: onCloseHandlerToken0,
    onVisibleHandler: onVisibleHandlerToken0,
  } = useModal();
  const {
    isVisible: isVisibleToken1,
    onCloseHandler: onCloseHandlerToken1,
    onVisibleHandler: onVisibleHandlerToken1,
  } = useModal();

  //Select Token
  const onSelectHandler0 = (tokenTicker) => {
    setTokenTicker0(tokenTicker);
  };
  const onSelectHandler1 = (tokenTicker) => {
    setTokenTicker1(tokenTicker);
  };

  //prepare the input fields/checks, etc
  const checkValidity = (input) => {
    return input.trim() !== "";
  };
  const amount0Input = useInput(checkValidity);
  const maxLimInput = useInput(checkValidity);
  const minLimInput = useInput(checkValidity);
  const amount1Input = useInput(checkValidity);

  const amount0InputClasses = amount0Input.hasError
    ? "form-control invalid"
    : "form-control";
  const amount1InputClasses = amount1Input.hasError
    ? "form-control invalid"
    : "form-control";
  const minLimInputClasses = minLimInput.hasError
    ? "form-control invalid"
    : "form-control";
  const maxLimInputClasses = maxLimInput.hasError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (
    amount0Input.enteredInputisValid &&
    minLimInput.enteredInputisValid &&
    amount1Input.enteredInputisValid &&
    maxLimInput.enteredInputisValid &&
    tokenTicker0 != "" &&
    tokenTicker1 != ""
  ) {
    formIsValid = true;
  }

  //interact with SC
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: 1000,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const onHandleSuccess = async (tx) => {
    await tx.wait(1);
    onHandleNotification(tx);
    updateUI();
  };

  const onHandleNotification = () => {
    dispatch({
      type: "info",
      message: "transaction completed",
      title: "Tx notification",
      position: "topR",
      icon: "bell",
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userLimitInput = {
      token0: {
        ticker0: tokenTicker0,
        amount0: amount0Input.enteredInput,
      },
      token1: {
        ticker1: tokenTicker1,
        amount1: amount1Input.enteredInput,
      },
      maxLimit: maxLimInput.enteredInput,
      minLimit: minLimInput.enteredInput,
      wallet: "",
    };

    //TODO update store (display users last session transaction? )
    //TODO call SC functions with enteredInput

    const createOrderArgs = {
      side: "",
      tickLower: 0,
      tickUpper: 0,
      quantity: 0,
    };

    const outputFee = (await getEntranceFee()).toString();
    console.log("outputFee");
    console.log(outputFee);

    //for state changing tx
    /*
    await enterRaffle({
      onSuccess: onHandleSuccess,
      onError: (error) => {
        console.log(error);
      },
    });
    */

    amount0Input.resetInput();
    minLimInput.resetInput();
    maxLimInput.resetInput();
    amount1Input.resetInput();
  };

  return (
    <div className="">
      <form
        onSubmit={onSubmitHandler}
        className="mt-10 mx-24 border-2 rounded-xl shadow-md px-14 py-10"
      >
        <div className="text-center font-bold text-lg mb-14">Limit Orders</div>
        <div className="flex flex-col">
          <div
            className={`${amount0InputClasses} flex flex-row justify-between gap-x-12 `}
          >
            <button onClick={onVisibleHandlerToken0}>
              {tokenTicker0 != "" ? tokenTicker0 : "Select Token"}
            </button>
            {isVisibleToken0 && (
              <SelectToken0
                onClose={onCloseHandlerToken0}
                onSelect={onSelectHandler0}
              />
            )}
            <input
              type="text"
              onChange={amount0Input.inputChangeHandler}
              onBlur={amount0Input.inputBlurHandler}
              value={amount0Input.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${amount1InputClasses} flex flex-row justify-between  gap-x-12`}
          >
            <button onClick={onVisibleHandlerToken1}>
              {tokenTicker1 != "" ? tokenTicker1 : "Select Token"}
            </button>
            {isVisibleToken1 && (
              <SelectToken1
                onClose={onCloseHandlerToken1}
                onSelect={onSelectHandler1}
              />
            )}
            <input
              type="text"
              onChange={amount1Input.inputChangeHandler}
              onBlur={amount1Input.inputBlurHandler}
              value={amount1Input.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${minLimInputClasses} flex flex-row justify-between gap-x-12`}
          >
            <label className="">Min limit bid</label>
            <input
              type="text"
              onChange={minLimInput.inputChangeHandler}
              onBlur={minLimInput.inputBlurHandler}
              value={minLimInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${maxLimInputClasses} flex flex-row justify-between gap-x-12`}
          >
            <label className="">Max limit bid</label>
            <input
              type="text"
              onChange={maxLimInput.inputChangeHandler}
              onBlur={maxLimInput.inputBlurHandler}
              value={maxLimInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
        </div>
        <div className="flex justify-around mt-8">
          <button
            type="submit"
            disabled={!formIsValid}
            className={` bg-teal-500 text-white ${
              !formIsValid
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-brownRed hover:font-bold hover:scale-110"
            } border-2 rounded-lg border-white  py-1 px-4 `}
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderBox;
