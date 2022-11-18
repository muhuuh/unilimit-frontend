import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import React, { useState, useEffect } from "react";

const TokenRatio = () => {
  const [tokenRatio, setTokenRatio] = useState({});
  const [pairfetched, setPairfetched] = useState();
  const DAI = new Token(
    ChainId.MAINNET,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    18
  );
  console.log("DAI");
  console.log(DAI.chainId);

  useEffect(() => {
    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option

    const pair = Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
    setPairfetched(pair);
  }, []);

  useEffect(() => {
    if (!pairfetched) {
      return;
    } else {
      const route = new Route([pairfetched], WETH[DAI.chainId]);

      console.log(route.midPrice.toSignificant(6)); // 201.306
      const ratio0 = route.midPrice.toSignificant(6);
      console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
      const ratio1 = route.midPrice.invert().toSignificant(6);

      setTokenRatio({ ratio0, ratio1 });
    }
  }, [pairfetched]);

  console.log(tokenRatio);

  return (
    <div>
      <div>ratio0</div>
    </div>
  );
};

export default TokenRatio;
