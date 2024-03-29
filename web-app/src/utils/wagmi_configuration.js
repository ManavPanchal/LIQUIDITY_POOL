import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  mainnet,
  goerli,
  sepolia,
  polygonMumbai,
  polygon,
  bsc,
  bscTestnet,
} from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia, polygonMumbai, polygon, bsc, bscTestnet],
  [publicProvider()],
);

export const config = createConfig({
  autoConnect: true,
  chains,
  connectors: [
    new MetaMaskConnector({
      options: {
        shimDisconnect: false,
      },
    }),
    new WalletConnectConnector({
      options: {
        projectId: process.env.REACT_APP_PROJECT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

console.log(config);

export const Providers = {
  publicProvider,
};
