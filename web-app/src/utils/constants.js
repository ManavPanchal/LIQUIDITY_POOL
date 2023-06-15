import {ethLogo} from '../images/images';

export const LiquidityPoolABI = [
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
          internalType: 'contract ERC20Token',
          name: '_token1',
          type: 'address',
        },
        {
          internalType: 'contract ERC20Token',
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
          internalType: 'contract ERC20Token',
          name: 'token1',
          type: 'address',
        },
        {
          internalType: 'contract ERC20Token',
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
      name: 'providersLPT',
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
          internalType: 'contract ERC20Token',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'swapTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokensInPool',
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
  ];

export const LPTABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_liquidityPoolContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"internalType": "address",
				"name": "_account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const Tokens = [
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  },
  {
    tokenImage: ethLogo,
    tokenName:"Ether",
    tokenSymbol:"ETH"
  }
]