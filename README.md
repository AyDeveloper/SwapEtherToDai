# Swap Ether to Dai

This project allows users to swap ether for dai using the chainlink pricefeed. For each ether value sent in, they get the equivalent value in dai. 

The project comes with a swap contract, a test for that contract, a sample script that deploys that contract, and interect with the swap contract.

Try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat node --fork ethereum mainnet rpc url
npx hardhat run scripts/swap.ts
```
