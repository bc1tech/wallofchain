/* global __ETHERSCAN_LINK__, __NETWORK_ID__, __NETWORK_NAME__, __WEB3_PROVIDER__, __TOKEN_ADDRESS__, __MARKET_ADDRESS__, ethereum */

import TokenArtifact from '../abi/WallOfChainToken.json';
import MarketArtifact from '../abi/WallOfChainMarket.json';

export default {
    data() {
        return {
            legacy: false,
            web3: null,
            web3Provider: null,
            etherscanLink: __ETHERSCAN_LINK__,
            metamask: {
                installed: false,
                netId: null,
            },
            instances: {
                token: null,
                market: null,
            },
            network: {
                expectedId: __NETWORK_ID__,
                expectedName: __NETWORK_NAME__,
            },
            waitTimeout: 0,
        };
    },
    beforeDestroy() {
        clearTimeout(this.waitTimeout);
    },
    methods: {
        async start (checkWeb3) {
            await this.initWeb3(checkWeb3);
            this.initContracts();
            this.web3Ready();
        },
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
                        if (netId !== this.network.expectedId) {
                            await this.initWeb3(false);
                        }
                        resolve();
                    });
                } else {
                    console.log('provided web3');
                    this.web3Provider = new Web3.providers.HttpProvider(__WEB3_PROVIDER__);
                    this.web3 = new Web3(this.web3Provider);

                    resolve();
                }
            });
        },
        initContracts () {
            this.instances.token = this.web3.eth.contract(TokenArtifact.abi).at(__TOKEN_ADDRESS__);
            this.instances.market = this.web3.eth.contract(MarketArtifact.abi).at(__MARKET_ADDRESS__);
        },
        web3Ready() {
            // Placeholder function.
            // Create one like this on your component if you want to do fun stuff with web3!
        },
    },
};
