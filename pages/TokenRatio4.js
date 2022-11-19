import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { limitActions } from "../components/store/limit-slice";
import { tokens } from "../constants";

//https://nextjs.org/docs/basic-features/data-fetching/client-side
//https://nextjs.org/docs/basic-features/data-fetching/overview
//https://beta.nextjs.org/docs/data-fetching/fetching

const TokenRatio = () => {
  const dispatch = useDispatch();
  const limitStore = useSelector((state) => state.limit);
  const [tokenRatio, setTokenRatio] = useState({});
  const [pair, setPair] = useState("");

  //get the current pair of token
  const currentPair = [limitStore.token0Ticker, limitStore.token1Ticker];
  console.log("currentPair");
  console.log(currentPair);
  const totalTokens = tokens;
  console.log("totalTokens pair 0");
  console.log(totalTokens[currentPair[0]]);
  console.log("totalTokens pair 1");
  console.log(totalTokens[currentPair[1]]);

  const uniToken0 = new Token(ChainId.MAINNET, totalTokens[currentPair[0]], 18);
  const uniToken1 = new Token(ChainId.MAINNET, totalTokens[currentPair[1]], 6);
  //TODO make sure we fetch the price correctly for different unisawp token pairs

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

  /*
  useEffect(() => {
    const uniToken0 = new Token(
      ChainId.MAINNET,
      totalTokens[currentPair[0]],
      18
    );
    const uniToken1 = new Token(
      ChainId.MAINNET,
      totalTokens[currentPair[1]],
      6
    );

    Fetcher.fetchPairData(uniToken1, WETH[uniToken1.chainId]).then((data) =>
      setPair(data)
    );
  }, []);

  */
  useEffect(() => {
    if (pair == "") {
      return;
    } else {
      const route = new Route([pair], WETH[DAI.chainId]);
      //const route = new Route([pair], WETH[uniToken1.chainId]);

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
