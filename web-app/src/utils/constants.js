import { ethLogo } from '../images/images';

export const LiquidityPoolABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_liquidityProvider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_tokenPair",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_inAmount1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_inAmount2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "liquidityAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_liquidityProvider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_tokenPair",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_outAmount1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_outAmount2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "liquidityRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_poolCreator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_tokenPair",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "poolCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_tokenPair",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_inAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_outAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "swappedTokens",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token1",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount2",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "calculateSwappingAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token2",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "calculateTokenAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_token1",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_balance1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_balance2",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20Token",
				"name": "_LPT",
				"type": "address"
			}
		],
		"name": "createPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pool",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "token1",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "token2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balance2",
				"type": "uint256"
			},
			{
				"internalType": "contract ERC20Token",
				"name": "LPT",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "LPTsupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minBalance1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minBalance2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "providerDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "providedBalance1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "providedBalance2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "claimedBalance1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "claimedBalance2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LPTCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_LPTAmount",
				"type": "uint256"
			}
		],
		"name": "removeLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "swapTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const LPTABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_liquidityPoolContractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
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
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidityPoolContractAddress',
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
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
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
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const tokenABI = [
  {
    inputs: [
      { internalType: 'string', name: 'tokenName', type: 'string' },
      { internalType: 'string', name: 'tokenSymbol', type: 'string' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const Tokens = [
  {
    tokenImage: ethLogo,
    tokenName: 'DAI',
    tokenAddress: '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d',
    tokenSymbol: 'DAI',
  },
  {
    tokenImage: ethLogo,
    tokenName: 'USDT',
    tokenSymbol: 'USDT',
    tokenAddress: '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c',
  },
  {
    tokenImage: ethLogo,
    tokenName: 'MYT',
    tokenSymbol: 'MYT',
    tokenAddress: '0x24e303D9c1A6032463524EFc070649f0AF7f016e',
  },
  {
    tokenImage: ethLogo,
    tokenName: 'DFI',
    tokenSymbol: 'DFI',
    tokenAddress: '0x5d9a020d55eF31Bc391c9629471e4B63A3A80aA8',
  },
];

export const pools = [
  {
    id: 0,
    token1Address: '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d',
    token2Address: '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c',
    LPTAddress: '0xF3FA7ce2B99aef2F0D13A2C9773d2a6a6417BA45',
    tokenPair: 'DAI-USDT',
  },
  {
    id: 1,
    token1Address: '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d',
    token2Address: '0x24e303D9c1A6032463524EFc070649f0AF7f016e',
    LPTAddress: '0x37380695F71B693a6464A1B6C9fdE70AF55D7484',
    tokenPair: 'DAI-MYT',
  },
  {
    id: 2,
    token1Address: '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d',
    token2Address: '0x5d9a020d55eF31Bc391c9629471e4B63A3A80aA8',
    LPTAddress: '0x6527a532166C9f32C06e834017C9220A2897853b',
    tokenPair: 'DAI-DFI',
  },
  {
    id: 3,
    token1Address: '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c',
    token2Address: '0x24e303D9c1A6032463524EFc070649f0AF7f016e',
    LPTAddress: '0x2DFB5624Ef56da66EE12e5D62ed88c8C6E598C74',
    tokenPair: 'USDT-MYT',
  },
  {
    id: 4,
    token1Address: '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c',
    token2Address: '0x5d9a020d55eF31Bc391c9629471e4B63A3A80aA8',
    LPTAddress: '0x2c989cE5951bf975ad62c8862419Ee5A0c7682F6',
    tokenPair: 'USDT-DFI',
  },
  {
    id: 5,
    token1Address: '0x24e303D9c1A6032463524EFc070649f0AF7f016e',
    token2Address: '0x5d9a020d55eF31Bc391c9629471e4B63A3A80aA8',
    LPTAddress: '0xa3E87080c8f02B6EDd3E0C30C8e83bc45587Dd56',
    tokenPair: 'MYT-DFI',
  },
];
