module.exports = {
    title: 'Wall of Chain',
    description: 'Become a part of the Blockchain hall of fame. Collect a star and let it shine. It will hang on our wall luminescent, bright and strong – there is your name on it.',
    dest: 'dist',
    ga: 'UA-128758422-1',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://wallofchain.com' }],
        ['meta', { property: 'og:image', content: 'https://wallofchain.com/assets/images/wallofchain-og.png' }],
        ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { property: 'twitter:image', content: 'https://wallofchain.com/assets/images/wallofchain-og.png' }],
        ['meta', { property: 'twitter:title', content: 'Wall of Chain' }],
        ['script', { src: 'assets/js/web3.min.js' }],
    ],
    chainWebpack: (config) => {
        const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

        config.plugin('injections').tap(pluginArgs => pluginArgs.map(definitions => ({
            ...definitions,
            '__TOKEN_ADDRESS__': JSON.stringify(isProd ? '0xB3c13400eEdB64E7935753474a4F83F17FdA0F5c' : '0xB3c13400eEdB64E7935753474a4F83F17FdA0F5c'),
            '__MARKET_ADDRESS__': JSON.stringify(isProd ? '0xfD9b4aF19dD5b8460df20cC56E21FfC5CAfDe750' : '0xfD9b4aF19dD5b8460df20cC56E21FfC5CAfDe750'),
            '__WEB3_PROVIDER__': JSON.stringify(isProd ? 'https://rinkeby.infura.io' : 'https://rinkeby.infura.io'),
            '__ETHERSCAN_LINK__': JSON.stringify(isProd ? 'https://rinkeby.etherscan.io' : 'https://rinkeby.etherscan.io'),
            '__NETWORK_ID__': JSON.stringify(isProd ? '4' : '4'),
            '__NETWORK_NAME__': JSON.stringify(isProd ? 'Rinkeby Test Network' : 'Rinkeby Test Network'),
        })));
    },
};
