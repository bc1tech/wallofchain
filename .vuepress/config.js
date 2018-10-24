module.exports = {
    title: 'Wall of Chain',
    description: 'Become a part of the blockchain hall of fame. Collect a star and let it shine. It will hang on our wall luminescent, bright and strong – there is your name on it.',
    dest: 'dist',
    head: [
        ['script', { src: 'assets/js/web3.min.js' }],
    ],
    blockchain: {
        tokenAddress: "0x0758c759432F02597BFd083d917aF5282aE00D3F",
        marketAddress: "0x3a1A57E264C512E5c97Cc47456d449737a163632",
        web3Provider: "https://rinkeby.infura.io",
        etherscanLink: "https://rinkeby.etherscan.io",
        networkId: "4",
        networkName: "Rinkeby Test Network",
    }
};
