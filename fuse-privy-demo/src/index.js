import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrivyProvider } from "@privy-io/react-auth";
// import { fuse, polygon } from "viem/chains";
import { defineChain } from 'viem'

const fuse = defineChain({
  id: 122, // Replace this with your chain's ID
  name: 'Fuse Network',
  network: 'Fuse',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'Fuse Token',
    symbol: 'FUSE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.fuse.io'],
      webSocket: ['wss://explorer-node.fuse.io/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Fuse Explorer', url: 'https://explorer.fuse.io/' },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
      config={{
        // defaultChain: fuse,
        supportedChains: [fuse],
        loginMethods: ["email", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets", // or 'all-users'
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
