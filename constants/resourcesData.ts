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
            { name: 'Coinbase', logoUrl: 'https://cdn.simpleicons.org/coinbase/0052FF', description: 'A user-friendly exchange, great for beginners to buy their first crypto.', link: 'https://www.coinbase.com/' },
            { name: 'Binance', logoUrl: 'https://cdn.simpleicons.org/binance/FCD535', description: 'The world\'s largest crypto exchange with a vast selection of tokens and advanced features.', link: 'https://www.binance.com/' },
            { name: 'Revolut', logoUrl: 'https://cdn.simpleicons.org/revolut/000000', description: 'A digital banking app that offers an easy way to buy, sell, and hold crypto alongside fiat.', link: 'https://www.revolut.com/' },
            { name: 'MoonPay', logoUrl: 'https://imgs.search.brave.com/16s3TEL6un0CLIlWgdDoD_fejgggEdBixCcfD522s6g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQyLzEvbW9vbnBh/eS1sb2dvLXBuZ19z/ZWVrbG9nby00Mjcx/MjMucG5n', description: 'A simple service to buy crypto directly with a credit card, often integrated into wallets.', link: 'https://www.moonpay.com/' },
        ],
    },
    {
        id: 'wallets',
        title: 'Wallets',
        headline: 'Secure Your Digital Assets',
        Icon: CreditCardIcon,
        items: [
            { name: 'MetaMask', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', description: 'The most popular browser wallet for interacting with Ethereum and EVM-compatible chains.', link: 'https://metamask.io/' },
            { name: 'Rabby', logoUrl: 'https://imgs.search.brave.com/4_csTp4LEHCtdCJAWYh55nXRv_wyeZcawyOaZUKzyYk/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL2JQ/YndRcjU4WlUyekQ3/UldiaWRnd19yOGsw/N1MzdUFMZXJsa2xv/NmppSzNqOG92Z1M4/NGlTY2oxaTdJY3lX/QXpBOFhxX3lneVhm/YjB0TlZMangtTzNf/WHNLN3c9czEyOC1y/ai1zYzB4MDBmZmZm/ZmY', description: 'A multi-chain wallet that provides clear transaction previews to protect against scams.', link: 'https://rabby.io/' },
            { name: 'Ledger', logoUrl: 'https://imgs.search.brave.com/HKHTCg5lMudyl4H7DS0aLYsmxHErKlGcfb8kU7IyNeU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMyLzEvbGVkZ2Vy/LXdhbGxldC1sb2dv/LXBuZ19zZWVrbG9n/by0zMjExMzMucG5n', description: 'A leading hardware wallet (cold storage) for maximum security of your assets.', link: 'https://www.ledger.com/' },
            { name: 'Trezor', logoUrl: 'https://imgs.search.brave.com/xkJBPiLea96KDdAQopG9Iec-3HHGyZru-tROnbAsSmw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI5LzEvdHJlem9y/LXdhbGxldC1sb2dv/LXBuZ19zZWVrbG9n/by0yOTA0MTcucG5n', description: 'An open-source hardware wallet, another top choice for secure cold storage.', link: 'https://trezor.io/' },
            { name: 'Exodus', logoUrl: 'https://www.exodus.com/brand/img/logo.svg', description: 'A multi-currency desktop and mobile wallet with a user-friendly interface.', link: 'https://www.exodus.com/' },
            { name: 'Trust Wallet', logoUrl: 'https://imgs.search.brave.com/FFscj1DjCO85npeESHRWp5dzkgIx0-j8AuVo0pCpzKA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQyLzEvdHJ1c3Qt/d2FsbGV0LWxvZ28t/cG5nX3NlZWtsb2dv/LTQyNDc2Ny5wbmc', description: 'A popular mobile-first wallet that supports a wide range of blockchains and tokens.', link: 'https://trustwallet.com/' },
        ],
    },
    {
        id: 'dapps',
        title: 'DeFi dApps',
        headline: 'Explore DeFi & Web3 Applications',
        Icon: PuzzlePieceIcon,
        items: [
            { name: 'DefiLlama Swap', logoUrl: 'https://imgs.search.brave.com/do2pVi3XhqZSSW0jZCpy2aMD8p_mLXbEvVGs4ucOSf0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9sb2dv/c2FuZHR5cGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wMi9kZWZpbGxh/bWEuc3Zn', description: 'A DEX aggregator that finds the best swap rates across multiple decentralized exchanges.', link: 'https://swap.defillama.com/' },
            { name: 'Aave', logoUrl: 'https://imgs.search.brave.com/zljQCxvc7B8mv7i40Ie-lu0LOs-mzpDlUTApg-aDvTE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvYWF2/ZS1jcmlwdG8tNDMy/NTM3My0zNTkxMDI0/LnBuZz9mPXdlYnA', description: 'A leading decentralized lending and borrowing protocol.', link: 'https://aave.com/' },
            { name: 'dYdX', logoUrl: 'https://imgs.search.brave.com/Jt-9vSTylgBEISZBZNaAHB4HqP2-oMf22KEML1mzTSU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbHRj/b2luc2JveC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDMvZnVsbC1keWR4/LWxvZ28tMzAweDMw/MC53ZWJw', description: 'A decentralized exchange for trading perpetual futures contracts with leverage.', link: 'https://dydx.exchange/' },
            { name: 'OpenSea', logoUrl: 'https://cdn.simpleicons.org/opensea/2081E2', description: 'One of the largest marketplaces for buying, selling, and discovering NFTs.', link: 'https://opensea.io/' },
        ],
    },
    {
        id: 'tools',
        title: 'Tools',
        headline: 'Boost Your Crypto Productivity',
        Icon: CurrencyDollarIcon,
        items: [
            { name: 'LastPass', logoUrl: 'https://cdn.simpleicons.org/lastpass/D42D2A', description: 'A password manager to securely store unique, strong passwords for all your accounts.', link: 'https://www.lastpass.com/' },
            { name: 'Authy', logoUrl: 'https://cdn.simpleicons.org/authy/EC1C24', description: 'An app for Two-Factor Authentication (2FA) to add a crucial security layer.', link: 'https://authy.com/' },
            { name: 'TradingView', logoUrl: 'https://cdn.simpleicons.org/tradingview/2962FF', description: 'Advanced charting tools for technical analysis of crypto and traditional markets.', link: 'https://www.tradingview.com/' },
            { name: 'CoinMarketCap', logoUrl: 'https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_1.svg', description: 'A comprehensive site for tracking prices, market caps, and data for all cryptocurrencies.', link: 'https://coinmarketcap.com/' },
            { name: 'DeBank', logoUrl: 'https://imgs.search.brave.com/nPYmiiyS8SQ6h3UbyPc7TW2P4HoaUVJS9374AxhFPBo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQzLzEvZGViYW5r/LWxvZ28tcG5nX3Nl/ZWtsb2dvLTQzMjY3/MC5wbmc', description: 'A multi-chain portfolio tracker that shows all your assets and DeFi positions in one dashboard.', link: 'https://debank.com/' },
        ],
    },
    {
        id: 'blockchains',
        title: 'Blockchains',
        headline: 'Learn About Different Blockchains',
        Icon: CubeIcon,
        items: [
            { name: 'Bitcoin', logoUrl: 'https://cdn.simpleicons.org/bitcoin/F7931A', description: 'The original cryptocurrency, a decentralized store of value secured by Proof-of-Work.', link: 'https://bitcoin.org/' },
            { name: 'Ethereum', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/330px-Eth-diamond-rainbow.png', description: 'The leading smart contract platform, enabling DeFi, NFTs, and decentralized applications.', link: 'https://ethereum.org/' },
            { name: 'Solana', logoUrl: 'https://cdn.simpleicons.org/solana/9945FF', description: 'A high-performance blockchain known for its fast transaction speeds and low fees.', link: 'https://solana.com/' },
            { name: 'Base', logoUrl: 'https://imgs.search.brave.com/7auI0oW9U6yPCC957oqSM34jgbbStDWZMc8wM-iTixI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbHRj/b2luc2JveC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDIvYmFzZS1sb2dv/LWluLWJsdWUtMzAw/eDMwMC53ZWJw', description: 'A Layer 2 scaling solution for Ethereum, incubated by Coinbase for faster, cheaper transactions.', link: 'https://www.base.org/' },
            { name: 'BNB Chain', logoUrl: 'https://cdn.simpleicons.org/binance/FCD535', description: 'A blockchain ecosystem developed by Binance, offering high-speed and low-cost dApps.', link: 'https://www.bnbchain.org/' },
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