import Web3 from 'web3';
import config from '../../config';

import TokenArtifact from '../../abi/WallOfChainToken.json';
import MarketArtifact from '../../abi/WallOfChainMarket.json';

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
            contracts: {
                token: null,
                market: null,
            },
            instances: {
                token: null,
                market: null,
            },
        };
    },
    computed: {},
    methods: {
        async initDapp () {
            this.initWeb3(true);
            await this.initContracts();
        },
        initWeb3 (checkWeb3) {
            if (checkWeb3 && typeof web3 !== 'undefined') {
                console.log('injected web3');
                this.web3Provider = web3.currentProvider;
                this.web3 = new Web3(this.web3Provider);
                this.metamask.installed = true;
                this.web3.version.getNetwork((err, netId) => {
                    this.metamask.netId = netId;
                    if (netId !== config.blockchain.networkId) {
                        this.initWeb3(false);
                    }
                });
            } else {
                console.log('provided web3');
                // set the provider you want from Web3.providers
                this.web3Provider = new Web3.providers.HttpProvider(config.blockchain.web3Provider);
                this.web3 = new Web3(this.web3Provider);
            }
        },
        async initContracts () {
            this.contracts.token = this.web3.eth.contract(TokenArtifact.abi);
            this.contracts.token.setProvider(this.web3Provider);
            this.instances.token = await this.contracts.token.at(config.blockchain.tokenAddress);

            this.contracts.market = this.web3.eth.contract(MarketArtifact.abi);
            this.contracts.market.setProvider(this.web3Provider);
            this.instances.market = await this.contracts.market.at(config.blockchain.marketAddress);
        },
    },
};
