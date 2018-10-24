import config from '../config';

import TokenArtifact from '../abi/WallOfChainToken.json';
import MarketArtifact from '../abi/WallOfChainMarket.json';

export default {
    data() {
        return {
            legacy: false,
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
                expectedId: config.blockchain.networkId,
                expectedName: config.blockchain.networkName,
            },
            waitTimeout: 0,
        };
    },
    async mounted () {
        await this.initWeb3(true);
        this.initContracts();
        this.web3Ready();
    },
    beforeDestroy() {
        clearTimeout(this.waitTimeout);
    },
    methods: {
        initWeb3 (checkWeb3) {
            return new Promise((resolve) => {
                if (checkWeb3 && (typeof ethereum !== 'undefined' || typeof web3 !== 'undefined')) {
                    if (ethereum) {
                        console.log('injected web3');
                        this.web3Provider = ethereum;
                    } else {
                        console.log('injected web3 (legacy)');
                        this.web3Provider = web3.currentProvider;
                        this.legacy = true;
                    }

                    this.web3 = new Web3(this.web3Provider);
                    this.metamask.installed = true;
                    this.web3.version.getNetwork(async (err, netId) => {
                        if (err) {
                            console.log(err);
                        }
                        this.metamask.netId = netId;
                        if (netId !== config.blockchain.networkId) {
                            await this.initWeb3(false);
                        }
                        resolve();
                    });
                } else {
                    console.log('provided web3');
                    this.web3Provider = new Web3.providers.HttpProvider(config.blockchain.web3Provider);
                    this.web3 = new Web3(this.web3Provider);

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
