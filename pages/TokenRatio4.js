import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { limitActions } from "../components/store/limit-slice";

const TokenRatio = () => {
  const dispatch = useDispatch();
  const [tokenRatio, setTokenRatio] = useState({});
  const [pair, setPair] = useState("");
  const DAI = new Token(
    ChainId.MAINNET,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    18
  );

  useEffect(() => {
    const DAI = new Token(
      ChainId.MAINNET,
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      18
    );

    Fetcher.fetchPairData(DAI, WETH[DAI.chainId]).then((data) => setPair(data));
  }, []);

  useEffect(() => {
    if (pair == "") {
      return;
    } else {
      const route = new Route([pair], WETH[DAI.chainId]);

      const ratio0 = route.midPrice.toSignificant(6);
      const ratio1 = route.midPrice.invert().toSignificant(6);
      const newRatio = { token0: ratio0, token1: ratio1 };
      setTokenRatio([ratio0, ratio1]);
      console.log("newRatio");
      console.log(newRatio);
      dispatch(limitActions.updateRatio(newRatio));
    }
  }, [pair]);

  return (
    <div>
      <div>{tokenRatio[0]}</div>
      <div>{tokenRatio[1]}</div>
    </div>
  );
};

export default TokenRatio;
