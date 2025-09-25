import { BanknotesIcon, CreditCardIcon, PuzzlePieceIcon, CurrencyDollarIcon, CubeIcon, NewspaperIcon, Squares2X2Icon, type IconProps } from '../components/icons/Icons';

export interface ResourceItem {
  name: string;
  logoUrl: string;
  description: string;
  link: string;
}

export interface ResourceCategory {
    id: string;
    title: string;
    headline: string;
    Icon: React.FC<IconProps>;
    items: ResourceItem[];
}

export const RESOURCES_DATA: ResourceCategory[] = [
    {
        id: 'exchanges',
        title: 'Exchanges',
        headline: 'Get Started with Crypto Exchanges',
        Icon: BanknotesIcon,
        items: [
            { name: 'Coinbase', logoUrl: 'https://static.wixstatic.com/media/4a78c1_4a11681223254b42af336a5c1b69352e~mv2.png', description: 'A user-friendly exchange, great for beginners to buy their first crypto.', link: 'https://www.coinbase.com/' },
            { name: 'Binance', logoUrl: 'https://static.wixstatic.com/media/4a78c1_d30a4e7a78aa44c481977259169f9116~mv2.png', description: 'The world\'s largest crypto exchange with a vast selection of tokens and advanced features.', link: 'https://www.binance.com/' },
            { name: 'Revolut', logoUrl: 'https://static.wixstatic.com/media/4a78c1_57e62a15c32448a3a027958b37651a02~mv2.png', description: 'A digital banking app that offers an easy way to buy, sell, and hold crypto alongside fiat.', link: 'https://www.revolut.com/' },
            { name: 'MoonPay', logoUrl: 'https://static.wixstatic.com/media/4a78c1_b429188d447f46cea5616f734005e839~mv2.png', description: 'A simple service to buy crypto directly with a credit card, often integrated into wallets.', link: 'https://www.moonpay.com/' },
        ],
    },
    {
        id: 'wallets',
        title: 'Wallets',
        headline: 'Secure Your Digital Assets',
        Icon: CreditCardIcon,
        items: [
            { name: 'MetaMask', logoUrl: 'https://static.wixstatic.com/media/4a78c1_447306214251430097f4874c93a3848b~mv2.png', description: 'The most popular browser wallet for interacting with Ethereum and EVM-compatible chains.', link: 'https://metamask.io/' },
            { name: 'Rabby', logoUrl: 'https://static.wixstatic.com/media/4a78c1_00a747ed777a44a6964a3504889508c2~mv2.png', description: 'A multi-chain wallet that provides clear transaction previews to protect against scams.', link: 'https://rabby.io/' },
            { name: 'Ledger', logoUrl: 'https://static.wixstatic.com/media/4a78c1_8625992ac49e414c859d28c68f1e5695~mv2.png', description: 'A leading hardware wallet (cold storage) for maximum security of your assets.', link: 'https://www.ledger.com/' },
            { name: 'Trezor', logoUrl: 'https://static.wixstatic.com/media/4a78c1_6002f5a044d04115b137f6d2b67f185d~mv2.png', description: 'An open-source hardware wallet, another top choice for secure cold storage.', link: 'https://trezor.io/' },
            { name: 'Exodus', logoUrl: 'https://static.wixstatic.com/media/4a78c1_8f294e112d7d4323b5f90351f33e70b3~mv2.png', description: 'A multi-currency desktop and mobile wallet with a user-friendly interface.', link: 'https://www.exodus.com/' },
            { name: 'Trust Wallet', logoUrl: 'https://static.wixstatic.com/media/4a78c1_1443657b9bbd4179a5234979a40592b2~mv2.png', description: 'A popular mobile-first wallet that supports a wide range of blockchains and tokens.', link: 'https://trustwallet.com/' },
        ],
    },
    {
        id: 'dapps',
        title: 'DeFi dApps',
        headline: 'Explore DeFi & Web3 Applications',
        Icon: PuzzlePieceIcon,
        items: [
            { name: 'DefiLlama Swap', logoUrl: 'https://static.wixstatic.com/media/4a78c1_57e55b40d6d542a1976077873b88b2f9~mv2.png', description: 'A DEX aggregator that finds the best swap rates across multiple decentralized exchanges.', link: 'https://swap.defillama.com/' },
            { name: 'Aave', logoUrl: 'https://static.wixstatic.com/media/4a78c1_a6279f655183405fa038ac2a507812c7~mv2.png', description: 'A leading decentralized lending and borrowing protocol.', link: 'https://aave.com/' },
            { name: 'dYdX', logoUrl: 'https://static.wixstatic.com/media/4a78c1_c08b6528d9a244b79b9087e594b295c5~mv2.png', description: 'A decentralized exchange for trading perpetual futures contracts with leverage.', link: 'https://dydx.exchange/' },
            { name: 'OpenSea', logoUrl: 'https://static.wixstatic.com/media/4a78c1_98d79b631f4f4f7895e692a188f6af2d~mv2.png', description: 'One of the largest marketplaces for buying, selling, and discovering NFTs.', link: 'https://opensea.io/' },
        ],
    },
    {
        id: 'tools',
        title: 'Tools',
        headline: 'Boost Your Crypto Productivity',
        Icon: CurrencyDollarIcon,
        items: [
            { name: 'LastPass', logoUrl: 'https://static.wixstatic.com/media/4a78c1_9c22e4307c8745d199981a257c7247a8~mv2.png', description: 'A password manager to securely store unique, strong passwords for all your accounts.', link: 'https://www.lastpass.com/' },
            { name: 'Authy', logoUrl: 'https://static.wixstatic.com/media/4a78c1_4a87a2d67562479e8e918f6f58204b40~mv2.png', description: 'An app for Two-Factor Authentication (2FA) to add a crucial security layer.', link: 'https://authy.com/' },
            { name: 'TradingView', logoUrl: 'https://static.wixstatic.com/media/4a78c1_4d7d9178e6da48819ab9273c5d50694e~mv2.png', description: 'Advanced charting tools for technical analysis of crypto and traditional markets.', link: 'https://www.tradingview.com/' },
            { name: 'CoinMarketCap', logoUrl: 'https://static.wixstatic.com/media/4a78c1_f3263b610537452d9197d13d7063c19b~mv2.png', description: 'A comprehensive site for tracking prices, market caps, and data for all cryptocurrencies.', link: 'https://coinmarketcap.com/' },
            { name: 'DeBank', logoUrl: 'https://static.wixstatic.com/media/4a78c1_b4b321c1f5dd4a22b7a86f9f38da64ef~mv2.png', description: 'A multi-chain portfolio tracker that shows all your assets and DeFi positions in one dashboard.', link: 'https://debank.com/' },
        ],
    },
    {
        id: 'blockchains',
        title: 'Blockchains',
        headline: 'Learn About Different Blockchains',
        Icon: CubeIcon,
        items: [
            { name: 'Bitcoin', logoUrl: 'https://static.wixstatic.com/media/4a78c1_e2a04921a97d4c2e811342b47d3bf62c~mv2.png', description: 'The original cryptocurrency, a decentralized store of value secured by Proof-of-Work.', link: 'https://bitcoin.org/' },
            { name: 'Ethereum', logoUrl: 'https://static.wixstatic.com/media/4a78c1_3f42646d543e41419a4e21a437f1a8e1~mv2.png', description: 'The leading smart contract platform, enabling DeFi, NFTs, and decentralized applications.', link: 'https://ethereum.org/' },
            { name: 'Solana', logoUrl: 'https://static.wixstatic.com/media/4a78c1_8f99e3f169724a7390956b82069b2d83~mv2.png', description: 'A high-performance blockchain known for its fast transaction speeds and low fees.', link: 'https://solana.com/' },
            { name: 'Base', logoUrl: 'https://static.wixstatic.com/media/4a78c1_070624869406437397b97a29e4e3a479~mv2.png', description: 'A Layer 2 scaling solution for Ethereum, incubated by Coinbase for faster, cheaper transactions.', link: 'https://www.base.org/' },
            { name: 'BNB Chain', logoUrl: 'https://static.wixstatic.com/media/4a78c1_54b0362f79024f02932338b25c3459c5~mv2.png', description: 'A blockchain ecosystem developed by Binance, offering high-speed and low-cost dApps.', link: 'https://www.bnbchain.org/' },
        ],
    },
     {
        id: 'blog',
        title: 'Blog & Articles',
        headline: 'Learn From Our Blog',
        Icon: NewspaperIcon,
        items: [], // This will be handled differently in the component
    },
    {
        id: 'tracker',
        title: 'Expense & Assets Tracker',
        headline: 'Track Your Expenses and Assets',
        Icon: Squares2X2Icon,
        items: [], // This will be handled differently in the component
    },
];