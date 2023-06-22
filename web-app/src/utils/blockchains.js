import {
    mainnet,
    sepolia,
    polygon,
    polygonMumbai,
  } from '@wagmi/core/chains';
import {polygonSvg, ethLogo} from '../images/images';

  export const blockchains = [
    {
      ...mainnet,
      name: 'Mainnet',
      logo: ethLogo,
    },
    {
      ...sepolia,
      name: 'Sepolia',
      logo: ethLogo,
    },
    {
      ...polygon,
      name: 'Polygon',
      logo: polygonSvg,
    },
    {
      ...polygonMumbai,
      name: 'Mumbai',
      logo: polygonSvg,
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