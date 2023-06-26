const LiquidityPoolABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_liquidityProvider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_tokenPair',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_inAmount1',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_inAmount2',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'liquidityAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_liquidityProvider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_tokenPair',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_outAmount1',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_outAmount2',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'liquidityRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_poolCreator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_tokenPair',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'poolCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_tokenPair',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_inAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_outAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'swappedTokens',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token1',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_token2',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount2',
        type: 'uint256',
      },
    ],
    name: 'addLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'calculateSwappingAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'calculateTokenAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_token1',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_token2',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_balance1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_balance2',
        type: 'uint256',
      },
      {
        internalType: 'contract ERC20Token',
        name: '_LPT',
        type: 'address',
      },
    ],
    name: 'createPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'pool',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'token2',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'balance1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balance2',
        type: 'uint256',
      },
      {
        internalType: 'contract ERC20Token',
        name: 'LPT',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'LPTsupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minBalance1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minBalance2',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'providerDetails',
    outputs: [
      {
        internalType: 'uint256',
        name: 'providedBalance1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'providedBalance2',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimedBalance1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimedBalance2',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'LPTCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_LPTAmount',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'swapTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
module.exports = { LiquidityPoolABI };
