import {
    mainnet,
    goerli,
    sepolia,
    polygon,
    polygonMumbai,
  } from '@wagmi/core/chains';

  export const blockchains = [
    {
      ...mainnet,
      name: 'Mainnet',
    //   logo: EthereumLogo,
    },
    {
      ...goerli,
      name: 'Goerli',
    //   logo: EthereumLogo,
    },
    {
      ...sepolia,
      name: 'Sepolia',
    //   logo: EthereumLogo,
    },
    {
      ...polygon,
      name: 'Polygon',
    //   logo: PolygonLogo,
    },
    {
      ...polygonMumbai,
      name: 'Mumbai',
    //   logo: PolygonLogo,
    },
    // {
    //   ...bsc,
    //   name: 'BSC',
    //   logo: BscLogo,
    // },
    // {
    //   ...bscTestnet,
    //   name: 'Bsc Testnet',
    //   logo: BscLogo,
    // },
  ];