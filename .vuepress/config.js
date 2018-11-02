module.exports = {
    title: 'Wall of Chain',
    description: 'Become a part of the blockchain hall of fame. Collect a star and let it shine. It will hang on our wall luminescent, bright and strong – there is your name on it.',
    dest: 'dist',
    head: [
        ['script', { src: 'assets/js/web3.min.js' }],
    ],
    blockchain: {
        tokenAddress: "0xB3c13400eEdB64E7935753474a4F83F17FdA0F5c",
        marketAddress: "0xfD9b4aF19dD5b8460df20cC56E21FfC5CAfDe750",
        web3Provider: "https://rinkeby.infura.io",
        etherscanLink: "https://rinkeby.etherscan.io",
        networkId: "4",
        networkName: "Rinkeby Test Network",
    }
};
