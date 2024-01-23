import React, { useState, useEffect } from "react";
import { connect, WalletConnection } from "near-api-js";

export const NearWalletContext = React.createContext();

export const NearWalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Initialize NEAR connection
        const near = await connect({
          networkId: "testnet",
          nodeUrl: "https://rpc.testnet.near.org",
          walletUrl: "https://wallet.testnet.near.org",
        });
        console.log(near);

        const walletConnection = new WalletConnection(near, "subin123.testnet");
        console.log(walletConnection);

        if (walletConnection.isSignedIn()) {
          setWallet(walletConnection);
        }
      } catch (error) {
        console.error("Error connecting to NEAR Wallet:", error);
      }
    };

    connectWallet();
  }, []);

  const handleSignIn = async () => {
    try {
      if (!wallet) {
        console.error("Wallet object is empty:", wallet);
        return;
      }

      await wallet.requestSignIn("subin123.testnet");
      setWallet(wallet);
    } catch (error) {
      console.error("Invalid credentials:", error);
    }
  };

  const handleSignOut = () => {
    wallet.signOut();
    setWallet(null);
  };

  return (
    <NearWalletContext.Provider value={{ wallet, handleSignIn, handleSignOut }}>
      {children}
    </NearWalletContext.Provider>
  );
};
