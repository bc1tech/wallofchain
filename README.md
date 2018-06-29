# WallOfChain

[![Build Status](https://travis-ci.org/paneedesign/wallofchain.svg?branch=master)](https://travis-ci.org/paneedesign/wallofchain)
[![Coverage Status](https://coveralls.io/repos/github/paneedesign/wallofchain/badge.svg?branch=master)](https://coveralls.io/github/paneedesign/wallofchain?branch=master)
 
 
## Installation


Install truffle, compiler and linter.

```bash
npm install -g truffle      // Version 4.1.13+ required.
npm install -g solium       // Version 1.1.7+ required.
```



## Install dependencies


```bash
npm install
```



## Linter


Use Solium

```bash
solium -d contracts
```

Lint and fix all

```bash
npm run lint:all:fix
```



## Compile, migrate and test the contracts.
 

Open the Truffle console

```bash
truffle develop
```

Compile 

```bash
compile 
```

Migrate

```bash
migrate
```

Test

```bash
test
```



## Run server


Run the `liteserver` development server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.

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
 


## TODO
 
DAPP is coming...
 

 
## Links

Solidity [Doc](https://solidity.readthedocs.io) [Github](https://solidity.readthedocs.io)

OpenZeppelin [Doc](https://openzeppelin.org/api/docs/open-zeppelin.html) [Github](https://github.com/OpenZeppelin)

Truffle [Doc](http://truffleframework.com/docs) [Github](https://github.com/trufflesuite/truffle)

Web3.js [Doc 0.20.4](https://github.com/ethereum/wiki/wiki/JavaScript-API) [Doc 1.0](http://web3js.readthedocs.io/en/1.0) [Github](https://github.com/ethereum/web3.js)
