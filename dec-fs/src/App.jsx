import React from "react";
import { NearWalletContextProvider } from "./components/NearWalletContextProvider";
import NearWalletConnector from "./components/NearWalletConnector";

function App() {
  return (
    <NearWalletContextProvider>
      <NearWalletConnector />
    </NearWalletContextProvider>
  );
}

export default App;
