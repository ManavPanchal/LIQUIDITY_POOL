// import React, { useRef, useState} from "react";
// import {SwapWidget} from "@uniswap/widgets"
// import { useAccount, useChainId } from "wagmi";
// import {watchNetwork } from "@wagmi/core";


// const SwapUI = () => {
//   const {isConnected} = useAccount();

//   const [currentChain, setCurrentChain] = useState(null);
//   const defaultChainId = useRef();

//   watchNetwork((network) => {
//     console.log(network);
//     setCurrentChain(network.chain)
//   });

//   const JSON_RPC_URL = 'https://cloudflare-eth.com'

//   defaultChainId.current = useChainId() || "1";

//   const connect = () => { console.log("connecting wallet...")}

//   return (
//     <>
//       <div className="flex mt-56 justify-center items-center w-screen">
//       {(isConnected)
//         &&
//           <SwapWidget
//             provider={window?.ethereum}
//             onConnectWalletClick={()=>{connect()}}
//             jsonRpcUrlMap={JSON_RPC_URL}
//             defaultChainId={defaultChainId.current}
//             onSwitchChain={currentChain}
//             permit2={true}/>
//       }
//       </div>
//     </>
//   );
// };

// export default SwapUI;

// // {
// //   "id": 11155111,
// //   "network": "sepolia",
// //   "name": "Sepolia",
// //   "nativeCurrency": {
// //       "name": "Sepolia Ether",
// //       "symbol": "SEP",
// //       "decimals": 18
// //   },
// //   "rpcUrls": {
// //       "alchemy": {
// //           "http": [
// //               "https://eth-sepolia.g.alchemy.com/v2"
// //           ],
// //           "webSocket": [
// //               "wss://eth-sepolia.g.alchemy.com/v2"
// //           ]
// //       },
// //       "infura": {
// //           "http": [
// //               "https://sepolia.infura.io/v3"
// //           ],
// //           "webSocket": [
// //               "wss://sepolia.infura.io/ws/v3"
// //           ]
// //       },
// //       "default": {
// //           "http": [
// //               "https://rpc.sepolia.org"
// //           ]
// //       },
// //       "public": {
// //           "http": [
// //               "https://rpc.sepolia.org"
// //           ]
// //       }
// //   },
// //   "blockExplorers": {
// //       "etherscan": {
// //           "name": "Etherscan",
// //           "url": "https://sepolia.etherscan.io"
// //       },
// //       "default": {
// //           "name": "Etherscan",
// //           "url": "https://sepolia.etherscan.io"
// //       }
// //   },
// //   "contracts": {
// //       "multicall3": {
// //           "address": "0xca11bde05977b3631167028862be2a173976ca11",
// //           "blockCreated": 6507670
// //       }
// //   },
// //   "testnet": true,
// //   "unsupported": true
// // }

// // {
// //   "id": 80001,
// //   "name": "Polygon Mumbai",
// //   "network": "maticmum",
// //   "nativeCurrency": {
// //       "name": "MATIC",
// //       "symbol": "MATIC",
// //       "decimals": 18
// //   },
// //   "rpcUrls": {
// //       "alchemy": {
// //           "http": [
// //               "https://polygon-mumbai.g.alchemy.com/v2"
// //           ],
// //           "webSocket": [
// //               "wss://polygon-mumbai.g.alchemy.com/v2"
// //           ]
// //       },
// //       "infura": {
// //           "http": [
// //               "https://polygon-mumbai.infura.io/v3"
// //           ],
// //           "webSocket": [
// //               "wss://polygon-mumbai.infura.io/ws/v3"
// //           ]
// //       },
// //       "default": {
// //           "http": [
// //               "https://matic-mumbai.chainstacklabs.com"
// //           ]
// //       },
// //       "public": {
// //           "http": [
// //               "https://matic-mumbai.chainstacklabs.com"
// //           ]
// //       }
// //   },
// //   "blockExplorers": {
// //       "etherscan": {
// //           "name": "PolygonScan",
// //           "url": "https://mumbai.polygonscan.com"
// //       },
// //       "default": {
// //           "name": "PolygonScan",
// //           "url": "https://mumbai.polygonscan.com"
// //       }
// //   },
// //   "contracts": {
// //       "multicall3": {
// //           "address": "0xca11bde05977b3631167028862be2a173976ca11",
// //           "blockCreated": 25770160
// //       }
// //   },
// //   "testnet": true,
// //   "unsupported": true
// // }