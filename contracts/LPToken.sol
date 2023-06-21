// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    address public liquidityPoolContractAddress;

    constructor(
        address _liquidityPoolContractAddress
    ) ERC20("TestLPTMYT-DFI", "MYT-DFI") {
        liquidityPoolContractAddress = _liquidityPoolContractAddress;
        _mint(liquidityPoolContractAddress, 1000 * (10 ** 18));
    }

    modifier onlyLiquidityPool() {
        require(
            msg.sender == liquidityPoolContractAddress,
            "Only pool contract allowed"
        );
        _;
    }

    function mint(address _to, uint _amount) external onlyLiquidityPool {
        _mint(_to, _amount);
    }

    function burn(
        address _account,
        uint256 _amount
    ) external onlyLiquidityPool {
        _burn(_account, _amount);
    }
}
