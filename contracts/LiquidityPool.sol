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
        ERC20Token token1;
        ERC20Token token2;
        uint balance1;
        uint balance2;
        ERC20Token LPT;
        uint LPTsupply;
        uint minBalance1;
        uint minBalance2;
    }
    struct Provider {
        uint currentBalance1;
        uint currentBalance2;
        uint claimedBalance1;
        uint claimedBalance2;
    }

    uint public poolCount = 0;
    mapping(uint => mapping(address => Provider)) public providerDetails;
    mapping(uint => Pool) public pool;
    mapping(uint => address[]) liquidityProviders;
    mapping(ERC20Token => mapping(ERC20Token => bool)) private tokenPairExists;
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

    function createPool(
        ERC20Token _token1,
        ERC20Token _token2,
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
        Provider storage provider = providerDetails[poolCount][msg.sender];
        provider.currentBalance1 = provider.currentBalance1.add(_balance1);
        provider.currentBalance2 = provider.currentBalance2.add(_balance2);
        providerDetails[poolCount][msg.sender] = provider;
        tokenPairExists[_token1][_token2] = true;
        tokenPairExists[_token2][_token1] = true;
        LPTokenExists[_LPT] = true;
        poolCount = poolCount + 1;
        emit poolCreated(
            owner,
            string.concat(
                newPool.token1.symbol(),
                "/",
                newPool.token2.symbol()
            ),
            block.timestamp
        );
    }

    function calculateTokenAmount(
        uint _id,
        uint _amount,
        IERC20 _token
    ) external view returns (uint _tokenAmount) {
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        if (_token == pool[_id].token1) {
            return _tokenAmount = (_amount.mul(reserve2).div(reserve1));
        } else {
            return _tokenAmount = (_amount.mul(reserve1).div(reserve2));
        }
    }

    function addLiquidity(uint _id, uint _amount1, uint _amount2) external {
        require(
            pool[_id].token1.balanceOf(msg.sender) >= _amount1 &&
                pool[_id].token2.balanceOf(msg.sender) >= _amount2,
            "Insufficient Balance"
        );
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
        Provider storage provider = providerDetails[_id][msg.sender];
        provider.currentBalance1 = provider.currentBalance1.add(_amount1);
        provider.currentBalance2 = provider.currentBalance2.add(_amount2);
        providerDetails[_id][msg.sender] = provider;
        if (token1LPT < token2LPT) {
            lpToken.mint(msg.sender, token1LPT);
            pool[_id].LPTsupply = LPTAmount.add(token1LPT);
        } else {
            lpToken.mint(msg.sender, token2LPT);
            pool[_id].LPTsupply = LPTAmount.add(token2LPT);
        }
        liquidityProviders[_id].push(msg.sender);
        emit liquidityAdded(
            msg.sender,
            string.concat(
                pool[_id].token1.symbol(),
                "/",
                pool[_id].token2.symbol()
            ),
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
        lpToken.burn(msg.sender, _LPTAmount);
        pool[_id].balance1 = reserve1.sub(withdrawableToken1);
        pool[_id].balance2 = reserve2.sub(withdrawableToken2);
        pool[_id].token1.transfer(msg.sender, withdrawableToken1);
        pool[_id].token2.transfer(msg.sender, withdrawableToken2);
        Provider storage provider = providerDetails[_id][msg.sender];
        provider.currentBalance1 = provider.currentBalance1.sub(
            withdrawableToken1
        );
        provider.currentBalance2 = provider.currentBalance2.sub(
            withdrawableToken2
        );
        provider.claimedBalance1 = provider.claimedBalance1.add(
            withdrawableToken1
        );
        provider.claimedBalance2 = provider.claimedBalance2.add(
            withdrawableToken2
        );
        providerDetails[_id][msg.sender] = provider;
        pool[_id].LPTsupply = LPTsupply.sub(_LPTAmount);
        emit liquidityRemoved(
            msg.sender,
            string.concat(
                pool[_id].token1.symbol(),
                "/",
                pool[_id].token2.symbol()
            ),
            withdrawableToken1,
            withdrawableToken2,
            block.timestamp
        );
    }

    function distributeFee(uint _id, uint _feePerProvider) internal {
        for (uint i = 0; i < liquidityProviders[_id].length; i++) {
            address provider = liquidityProviders[_id][i];
            ERC20Token lpToken = pool[_id].LPT;
            lpToken.mint(provider, _feePerProvider);
            pool[_id].LPTsupply = pool[_id].LPTsupply.add(_feePerProvider);
        }
    }

    function swapTokens(uint _id, uint _amount, ERC20Token _token) external {
        uint userTokenBalance = _token.balanceOf(msg.sender);
        require(userTokenBalance >= _amount, "Insufficient Balance");
        uint reserve1 = pool[_id].balance1;
        uint reserve2 = pool[_id].balance2;
        uint outAmount;
        bool status;
        if (_token == pool[_id].token1) {
            uint denominator = reserve1.add(_amount);
            uint _tokenAmount = reserve1.mul(reserve2).div(denominator);
            require(
                _tokenAmount >= pool[_id].minBalance2,
                "Exceeds Min Balance"
            );
            pool[_id].balance1 = reserve1.add(_amount);
            pool[_id].balance2 = _tokenAmount;
            pool[_id].token1.transferFrom(msg.sender, address(this), _amount);
            outAmount = reserve2.sub(_tokenAmount);
            status = pool[_id].token2.transfer(msg.sender, outAmount);
        } else {
            uint denominator = reserve2.add(_amount);
            uint _tokenAmount = reserve1.mul(reserve2).div(denominator);
            require(
                _tokenAmount >= pool[_id].minBalance1,
                "Exceeds Min Balance"
            );
            pool[_id].balance1 = _tokenAmount;
            pool[_id].balance2 = reserve2.add(_amount);
            pool[_id].token2.transferFrom(msg.sender, address(this), _amount);
            outAmount = reserve1.sub(_tokenAmount);
            status = pool[_id].token1.transfer(msg.sender, outAmount);
        }
        uint feeAmount = _amount.mul(3).div(1000);
        if (status) {
            uint feePerProvider = feeAmount.div(liquidityProviders[_id].length);
            distributeFee(_id, feePerProvider);
        }
        emit swappedTokens(
            msg.sender,
            string.concat(
                pool[_id].token1.symbol(),
                "/",
                pool[_id].token2.symbol()
            ),
            _amount,
            outAmount,
            block.timestamp
        );
    }
}
