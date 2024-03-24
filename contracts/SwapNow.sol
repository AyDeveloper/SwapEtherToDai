//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract SwapNow {

     AggregatorV3Interface internal priceFeedForLink;
     AggregatorV3Interface internal priceFeedForMatic;

    event SwapEvent(uint _daiAmount, address _swapper);
    address matic = 0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0;
    address link = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    IERC20 maticContract = IERC20(matic);
    IERC20 linkContract = IERC20(link);

    constructor() {
         priceFeedForLink = AggregatorV3Interface(0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c);
         priceFeedForMatic = AggregatorV3Interface(0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676);
    }

     function getLatestPrice1() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeedForLink.latestRoundData();
        return uint256(price * 1e10);
    }

    function getLatestPrice2() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeedForMatic.latestRoundData();
        return uint256(price * 1e10);
    }


    function swapLinkToDai(uint _amount) public {
        // use custom error
        // the msg.sender approves the contract;
        require(linkContract.transferFrom(msg.sender, address(this), _amount));
        // get amount of dai to transfer
        uint daiQuantity = getDaiQty(_amount);
        // the contract must have enough dai;
        maticContract.transfer(msg.sender, daiQuantity); 
    }

    // bring aave to collect dai
    function getDaiQty(uint _amount) public view returns(uint) {
        // get the eQuivalent of ether 
        (uint256 linkPrice) = getLatestPrice1();
        (uint256 maticPrice) = getLatestPrice2();
        uint usdValue = (_amount * linkPrice) / 1e18; //
        return (usdValue / (maticPrice/1e18));
    }
    



}
