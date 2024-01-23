import React, { useContext } from "react";
import { NearWalletContext } from "./NearWalletContextProvider";

const NearWalletConnector = () => {
  const { wallet, handleSignIn, handleSignOut } = useContext(NearWalletContext);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      {!wallet ? (
        <div>
          <h4>Login to -NEAR- Account</h4>
          <button onClick={handleSignIn}>Connect to NEAR Wallet</button>
        </div>
      ) : (
        <div>
          <p>Connected to NEAR Wallet: {wallet.getAccountId()}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default NearWalletConnector;
