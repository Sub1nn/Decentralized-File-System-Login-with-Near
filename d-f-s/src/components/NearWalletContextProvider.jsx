import React, { useState, useEffect } from "react";
import getConfig from "../config.js";
import * as nearAPI from "near-api-js";

export const NearWalletContext = React.createContext();

export const NearWalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState("dev-1641682453576-30872819216475");

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Initialize NEAR connection
        const nearConfig = getConfig("testnet");
        const near = await nearAPI.connect({
          deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
          },
          ...nearConfig,
        });

        const walletConnection = new nearAPI.WalletConnection(near);

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
