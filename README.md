# WallOfChain

[![Build Status](https://travis-ci.org/paneedesign/wallofchain.svg?branch=master)](https://travis-ci.org/paneedesign/wallofchain)
[![Coverage Status](https://coveralls.io/repos/github/paneedesign/wallofchain/badge.svg?branch=master)](https://coveralls.io/github/paneedesign/wallofchain?branch=master)
 

Became a star into the Blockchain.

Buy a spot in the Wall of Chain.

Website: [wallofchain.com](https://wallofchain.com/)


## Installation


Install truffle.

```bash
npm install -g truffle      // Version 4.1.14+ required.
```



## Install dependencies


```bash
npm install
```



## Linter


Use Solium

```bash
npm run lint:sol
```

Use ESLint

```bash
npm run lint:js
```

Use both and fix

```bash
npm run lint:fix
```



## Compile and test the contracts.
 

Open the Truffle console

```bash
truffle develop
```

Compile 

```bash
compile 
```

Test

```bash
test
```



## Run server


Run the `liteserver` development server.

```bash
npm run dev
```



## Optional


Install the [truffle-flattener](https://github.com/alcuadrado/truffle-flattener)

```bash
npm install -g truffle-flattener
```
 
 
Usage 

```bash
truffle-flattener contracts/Migrations.sol >> dist/Migrations.sol
```
 


## DAPP
 
[DAPP Source](https://github.com/paneedesign/wallofchain/tree/site)
 

 
## Links

Solidity [Doc](https://solidity.readthedocs.io) [Github](https://solidity.readthedocs.io)

OpenZeppelin [Doc](https://openzeppelin.org/api/docs/open-zeppelin.html) [Github](https://github.com/OpenZeppelin)

Truffle [Doc](http://truffleframework.com/docs) [Github](https://github.com/trufflesuite/truffle)

Web3.js [Doc 0.20.6](https://github.com/ethereum/wiki/wiki/JavaScript-API) [Doc 1.0](http://web3js.readthedocs.io/en/1.0) [Github](https://github.com/ethereum/web3.js)
