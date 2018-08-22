import config from '../config';

import TokenArtifact from '../abi/WallOfChainToken.json';
import MarketArtifact from '../abi/WallOfChainMarket.json';

// Needs to be async since a dependency of it (Buffer) needs the global `global` variable
// and webpack isn't providing it – I don't know why and I'm suppose to be on vacation.
const Web3 = () => {
    // Don't try this at home, kids!
    // Little hacky fix for Buffer's error.
    window.global = window;

    return import('web3');
};


export default {
    data() {
        return {
            web3: null,
            web3Provider: null,
            etherscanLink: config.blockchain.etherscanLink,
            metamask: {
                installed: false,
                netId: null,
            },
            instances: {
                token: null,
                market: null,
            },
            network: {
                expectedId: null,
                expectedName: '',
            },
            waitTimeout: 0,
        };
    },
    mounted () {
        Web3().then(() => {
            this.waitTimeout = setTimeout(async () => {
                await this.initWeb3(true);

                this.network = {
                    expectedId: config.blockchain.networkId,
                    expectedName: config.blockchain.networkName,
                };

                this.initContracts();

                this.web3Ready();
            }, 500);
        });
    },
    beforeDestroy() {
        clearTimeout(this.waitTimeout);
    },
    methods: {
        initWeb3 (checkWeb3) {
            return new Promise((resolve) => {
                if (checkWeb3 && typeof web3 !== 'undefined') {
                    console.log('injected web3');
                    this.web3Provider = web3.currentProvider;
                    this.web3 = new window.Web3(this.web3Provider);
                    this.metamask.installed = true;
                    this.web3.version.getNetwork((err, netId) => {
                        this.metamask.netId = netId;

                        if (netId !== config.blockchain.networkId) {
                            this.initWeb3(false).then(resolve);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    console.log('provided web3');
                    // set the provider you want from Web3.providers
                    this.web3Provider = new window.Web3.providers.HttpProvider(config.blockchain.web3Provider);
                    this.web3 = new window.Web3(this.web3Provider);

                    resolve();
                }
            });
        },
        initContracts () {
            this.instances.token = this.web3.eth.contract(TokenArtifact.abi).at(config.blockchain.tokenAddress);
            this.instances.market = this.web3.eth.contract(MarketArtifact.abi).at(config.blockchain.marketAddress);
        },
        web3Ready() {
            // Placeholder function.
            // Create one like this on your component if you want to do fun stuff with web3!
        },
    },
};
