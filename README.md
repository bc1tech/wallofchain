# WallOfChain

[![Build Status](https://travis-ci.org/paneedesign/wallofchain.svg?branch=master)](https://travis-ci.org/paneedesign/wallofchain)
[![Coverage Status](https://coveralls.io/repos/github/paneedesign/wallofchain/badge.svg?branch=master)](https://coveralls.io/github/paneedesign/wallofchain?branch=master)

Become a part of the Blockchain hall of fame. Collect a star and let it shine.

WallOfChain is a ERC721 Collectible Token on Ethereum Blockchain.

It is made by the same technologies currently used by the Ethereum technology.

When you acquire a star, it is uniquely owned by you. It carries your name, and cannot be replicated. You can let it shine brighter and let it grow while using our platform.

## DAPP Source

View it live at [wallofchain.com](https://wallofchain.com/).

Discover DApp source [here](https://github.com/paneedesign/wallofchain/tree/site).  

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
truffle-flattener contracts/WallOfChainToken.sol >> dist/WallOfChainToken.dist.sol
truffle-flattener contracts/WallOfChainMarket.sol >> dist/WallOfChainMarket.dist.sol
```

## License

Code released under the [MIT License](https://github.com/paneedesign/wallofchain/blob/master/LICENSE).
