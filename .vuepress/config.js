module.exports = {
    title: 'Wall of Chain',
    description: 'Become a part of the Blockchain hall of fame. Collect a star and let it shine. It will hang on our wall luminescent, bright and strong – there is your name on it.',
    dest: 'dist',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'google-site-verification', content: 'YsQAVRv3F4R_QM9YNQhkbQrYg2sLKh56ZxHxNbRJVkU' }],
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
            '__GOOGLE_ANALYTICS__': isProd ? JSON.stringify('UA-128758422-1') : false,
            '__TOKEN_ADDRESS__': JSON.stringify(isProd ? '0xF9D9702D031407F425a4412682fDc56b07d05262' : '0xB3c13400eEdB64E7935753474a4F83F17FdA0F5c'),
            '__MARKET_ADDRESS__': JSON.stringify(isProd ? '0x0A780c376B881048D59a4F5dCcEb1f01F1DffbaB' : '0xfD9b4aF19dD5b8460df20cC56E21FfC5CAfDe750'),
            '__WEB3_PROVIDER__': JSON.stringify((isProd ? 'https://mainnet.infura.io/' : 'https://rinkeby.infura.io/') + 'v3/59263af365b24e47a8b1b02d12cfc539'),
            '__ETHERSCAN_LINK__': JSON.stringify(isProd ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io'),
            '__NETWORK_ID__': JSON.stringify(isProd ? '1' : '4'),
            '__NETWORK_NAME__': JSON.stringify(isProd ? 'Main Ethereum Network' : 'Rinkeby Test Network'),
        })));
    },
};
