import { configureChains, createConfig} from 'wagmi';
import {publicProvider}  from "wagmi/providers/public"
import {mainnet, goerli, sepolia, polygonMumbai, polygon, bsc, bscTestnet} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet, goerli, sepolia, polygonMumbai, polygon, bsc, bscTestnet],
  [publicProvider()]);

export const config = createConfig({
    autoConnect:true,
    chains,
    connectors: [
      new MetaMaskConnector({chains}),
      new WalletConnectConnector({ chains }),
      new CoinbaseWalletConnector({chains}),
      new InjectedConnector({chains, options:{name:"Injected"}})
    ],
    publicClient,
    webSocketPublicClient,
})