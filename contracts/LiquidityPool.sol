// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./LPToken.sol";

contract LiquidityPool {
    using SafeMath for uint;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Pool {
        IERC20 token1;
        IERC20 token2;
        uint balance1;
        uint balance2;
        ERC20Token LPT;
        uint LPTsupply;
        uint minBalance1;
        uint minBalance2;
    }
    struct Provider {
        uint providedBalance1;
        uint providedBalance2;
        uint claimedBalance1;
        uint claimedBalance2;
        uint LPTCount;
    }

    uint public poolCount = 0;
    mapping(uint => mapping(address => Provider)) public providerDetails;
    mapping(uint => Pool) public pool;
    mapping(uint => address[]) liquidityProviders;
    mapping(IERC20 => mapping(IERC20 => bool)) private tokenPairExists;
    mapping(ERC20Token => bool) private LPTokenExists;

    event poolCreated(address _poolCreator, string _tokenPair, uint timestamp);
    event liquidityAdded(
        address _liquidityProvider,
        string _tokenPair,
        uint _inAmount1,
        uint _inAmount2,
        uint timestamp
    );
    event liquidityRemoved(
        address _liquidityProvider,
        string _tokenPair,
        uint _outAmount1,
        uint _outAmount2,
        uint timestamp
    );
    event swappedTokens(
        address _user,
        string _tokenPair,
        uint _inAmount,
        uint _outAmount,
        uint timestamp
    );

    modifier checkValidTokenPair(
        uint _id,
        uint _amount,
        IERC20 _token
    ) {
        require(
            (_token == pool[_id].token1) || (_token == pool[_id].token2),
            "invalid pool id or token address"
        );
        _;
    }

    function createPool(
        IERC20 _token1,
        IERC20 _token2,
        uint _balance1,
        uint _balance2,
        ERC20Token _LPT
    ) public {
        require(msg.sender == owner, "Only Owner Allowed");
        require(
            !tokenPairExists[_token1][_token2] ||
                !tokenPairExists[_token2][_token1],
            "Token pair already exists"
        );
        require(!LPTokenExists[_LPT], "LPT exists already");
        Pool memory newPool = Pool({
            token1: _token1,
            token2: _token2,
            balance1: _balance1,
            balance2: _balance2,
            LPT: _LPT,
            LPTsupply: _LPT.totalSupply(),
            minBalance1: _balance1,
            minBalance2: _balance2
        });
        pool[poolCount] = newPool;
        newPool.token1.transferFrom(msg.sender, address(this), _balance1);
        newPool.token2.transferFrom(msg.sender, address(this), _balance2);
        liquidityProviders[poolCount].push(msg.sender);
        newPool.LPT.transfer(msg.sender, newPool.LPTsupply);
        Provider memory provider = providerDetails[poolCount][msg.sender];
        provider.providedBalance1 = provider.providedBalance1.add(_balance1);
        provider.providedBalance2 = provider.providedBalance2.add(_balance2);
        provider.LPTCount = provider.LPTCount.add(newPool.LPTsupply);
        providerDetails[poolCount][msg.sender] = provider;
        tokenPairExists[_token1][_token2] = true;
        tokenPairExists[_token2][_token1] = true;
        LPTokenExists[_LPT] = true;
        poolCount = poolCount + 1;
        emit poolCreated(owner, newPool.LPT.symbol(), block.timestamp);
    }

    function calculateTokenAmount(
        uint _id,
        uint _amount,
        IERC20 _token
    )
        public
        view
        checkValidTokenPair(_id, _amount, _token)
        returns (uint _tokenAmount)
    {
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        if (_token == pool[_id].token1) {
            return _tokenAmount = (_amount.mul(reserve2).div(reserve1));
        } else {
            return _tokenAmount = (_amount.mul(reserve1).div(reserve2));
        }
    }

    function calculateSwappingAmount(
        uint _id,
        uint _amount,
        IERC20 _token
    )
        public
        view
        checkValidTokenPair(_id, _amount, _token)
        returns (uint _tokenAmount, IERC20 _token2)
    {
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        if (_token == pool[_id].token1) {
            uint denominator = reserve1.add(_amount);
            _tokenAmount = (reserve1.mul(reserve2).div(denominator));
            require(
                _tokenAmount >= pool[_id].minBalance2,
                "Exceeds Min Balance"
            );
            _tokenAmount = reserve2.sub(_tokenAmount);
            return (_tokenAmount, pool[_id].token2);
        } else {
            uint denominator = reserve2.add(_amount);
            _tokenAmount = (reserve2.mul(reserve1).div(denominator));
            require(
                _tokenAmount >= pool[_id].minBalance1,
                "Exceeds Min Balance"
            );
            _tokenAmount = reserve1.sub(_tokenAmount);
            return (_tokenAmount, pool[_id].token1);
        }
    }

    function addLiquidity(
        uint _id,
        IERC20 _token1,
        IERC20 _token2,
        uint _amount1,
        uint _amount2
    ) external {
        require(
            tokenPairExists[_token1][_token2] ||
                tokenPairExists[_token2][_token1],
            "Invalid Token pair"
        );
        require(
            pool[_id].token1.balanceOf(msg.sender) >= _amount1 &&
                pool[_id].token2.balanceOf(msg.sender) >= _amount2,
            "Insufficient Balance"
        );

        require(
            _amount2 == calculateTokenAmount(_id, _amount1, _token1),
            "Invalid Ratio"
        );
        if (_token1 == pool[_id].token2) {
            uint temp = _amount1;
            _amount1 = _amount2;
            _amount2 = temp;
        }
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        pool[_id].balance1 = reserve1.add(_amount1);
        pool[_id].balance2 = reserve2.add(_amount2);
        ERC20Token lpToken = pool[_id].LPT;
        uint LPTAmount = pool[_id].LPTsupply;
        uint token1LPT = _amount1.mul(LPTAmount).div(reserve1);
        uint token2LPT = _amount2.mul(LPTAmount).div(reserve2);
        pool[_id].token1.transferFrom(msg.sender, address(this), _amount1);
        pool[_id].token2.transferFrom(msg.sender, address(this), _amount2);
        Provider memory provider = providerDetails[_id][msg.sender];
        provider.providedBalance1 = provider.providedBalance1.add(_amount1);
        provider.providedBalance2 = provider.providedBalance2.add(_amount2);
        if (token1LPT < token2LPT) {
            lpToken.mint(msg.sender, token1LPT);
            pool[_id].LPTsupply = LPTAmount.add(token1LPT);
            provider.LPTCount = provider.LPTCount.add(token1LPT);
        } else {
            lpToken.mint(msg.sender, token2LPT);
            pool[_id].LPTsupply = LPTAmount.add(token2LPT);
            provider.LPTCount = provider.LPTCount.add(token2LPT);
        }
        providerDetails[_id][msg.sender] = provider;
        liquidityProviders[_id].push(msg.sender);
        emit liquidityAdded(
            msg.sender,
            lpToken.symbol(),
            _amount1,
            _amount2,
            block.timestamp
        );
    }

    function removeLiquidity(uint _id, uint _LPTAmount) external {
        ERC20Token lpToken = pool[_id].LPT;
        require(
            _LPTAmount <= lpToken.balanceOf((msg.sender)),
            "Insufficient LPT"
        );
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        uint LPTsupply = pool[_id].LPTsupply;
        uint withdrawableToken1 = _LPTAmount.mul(reserve1).div(LPTsupply);
        uint withdrawableToken2 = _LPTAmount.mul(reserve2).div(LPTsupply);
        uint approvalAmount = lpToken.allowance(msg.sender, address(this));
        require(approvalAmount >= _LPTAmount, "Kindly Approve");
        lpToken.burn(msg.sender, _LPTAmount);
        Provider memory provider = providerDetails[_id][msg.sender];
        provider.claimedBalance1 = provider.claimedBalance1.add(
            withdrawableToken1
        );
        provider.claimedBalance2 = provider.claimedBalance2.add(
            withdrawableToken2
        );
        provider.LPTCount = provider.LPTCount.sub(_LPTAmount);
        providerDetails[_id][msg.sender] = provider;
        pool[_id].balance1 = reserve1.sub(withdrawableToken1);
        pool[_id].balance2 = reserve2.sub(withdrawableToken2);
        pool[_id].token1.transfer(msg.sender, withdrawableToken1);
        pool[_id].token2.transfer(msg.sender, withdrawableToken2);
        pool[_id].LPTsupply = LPTsupply.sub(_LPTAmount);
        emit liquidityRemoved(
            msg.sender,
            lpToken.symbol(),
            withdrawableToken1,
            withdrawableToken2,
            block.timestamp
        );
    }

    function distributeFee(uint _id, uint _feeAmount) internal {
        uint LPTAmount = pool[_id].LPTsupply;
        for (uint i = 0; i < liquidityProviders[_id].length; i++) {
            address provider = liquidityProviders[_id][i];
            Provider memory liquidityProvider = providerDetails[_id][provider];
            ERC20Token lpToken = pool[_id].LPT;
            uint _feePerProvider = _feeAmount
                .mul(liquidityProvider.LPTCount)
                .div(LPTAmount);
            lpToken.mint(provider, _feePerProvider);
            pool[_id].LPTsupply = pool[_id].LPTsupply.add(_feePerProvider);
            liquidityProvider.LPTCount = liquidityProvider.LPTCount.add(
                _feePerProvider
            );
            providerDetails[_id][provider] = liquidityProvider;
        }
    }

    function swapTokens(
        uint _id,
        uint _amount,
        IERC20 _token
    ) external checkValidTokenPair(_id, _amount, _token) {
        uint userTokenBalance = _token.balanceOf(msg.sender);
        require(userTokenBalance >= _amount, "Insufficient Balance");
        bool status;
        (
            uint transferableAmount,
            IERC20 _tokenToTransfer
        ) = calculateSwappingAmount(_id, _amount, _token);
        if (_token == pool[_id].token1) {
            pool[_id].balance1 = pool[_id].balance1.add(_amount);
            pool[_id].balance2 = pool[_id].balance2.sub(transferableAmount);
        } else {
            pool[_id].balance1 = pool[_id].balance1.sub(transferableAmount);
            pool[_id].balance2 = pool[_id].balance2.add(_amount);
        }
        require(
            _token.transferFrom(msg.sender, address(this), _amount),
            "Token Transfer Failed"
        );
        status = _tokenToTransfer.transfer(msg.sender, transferableAmount);
        uint feeAmount = _amount.mul(3).div(1000);
        if (status) {
            distributeFee(_id, feeAmount);
            emit swappedTokens(
                msg.sender,
                pool[_id].LPT.symbol(),
                _amount,
                transferableAmount,
                block.timestamp
            );
        } else {
            _token.transfer(msg.sender, _amount);
        }
    }
}
