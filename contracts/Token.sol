// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TestToken is ERC20 {
    address owner;

    constructor() ERC20("TestDFI", "DFI") {
        _mint(msg.sender, 1000 * (10 ** 18));
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner allowed");
        _;
    }

    function mint(address _to, uint _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}
