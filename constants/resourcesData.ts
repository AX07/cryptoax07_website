
// FIX: Import React to make the React namespace available for type definitions like React.FC.
import type React from 'react';
import { BanknotesIcon, CreditCardIcon, PuzzlePieceIcon, CurrencyDollarIcon, CubeIcon, NewspaperIcon, Squares2X2Icon, type IconProps, VideoCameraIcon } from '../components/icons/Icons';

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

export const GET_RESOURCES_DATA = (t: (key: string) => string): ResourceCategory[] => [
    {
        id: 'exchanges',
        title: 'Exchanges',
        headline: 'Get Started with Crypto Exchanges',
        Icon: BanknotesIcon,
        items: [
            { name: 'Coinbase', logoUrl: 'https://cdn.simpleicons.org/coinbase/0052FF', description: 'A user-friendly exchange, great for beginners to buy their first crypto.', link: 'https://www.coinbase.com/' },
            { name: 'Binance', logoUrl: 'https://cdn.simpleicons.org/binance/FCD535', description: 'The world\'s largest crypto exchange with a vast selection of tokens and advanced features.', link: 'https://www.binance.com/' },
            { name: 'Kraken', logoUrl: 'https://imgs.search.brave.com/sqDt3pmukWvunT8V3liRe8-7n7sa9uTUYqB3hRJrfV8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDIvS3Jha2VuLUxv/Z28tNzAweDM5NC5w/bmc', description: 'One of the oldest and most trusted crypto exchanges, known for its security.', link: 'https://www.kraken.com/' },
            { name: 'Crypto.com', logoUrl: 'https://imgs.search.brave.com/Fd1f4Swqp_gCMIYgkqLGIyZEKOU79vhlcc70jMwXb7w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ4LzEvY3J5cHRv/LWNvbS1sb2dvLXBu/Z19zZWVrbG9nby00/ODE1NTgucG5n', description: 'Major global exchange offering trading, a visa card, and an NFT marketplace.', link: 'https://crypto.com/' },
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
            { name: 'Phantom', logoUrl: 'https://imgs.search.brave.com/0X99s1kjgQVdyX9suxxIcmX5SSFwl9X5p0TBcOK1nzs/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuYml0ZGVncmVl/Lm9yZy9pbWFnZXMv/cGhhbnRvbS13YWxs/ZXQtcmV2aWV3LXNx/dWFyZS1sb2dvLXYx/LnBuZz90cj13LTI1/MA', description: 'The leading wallet for the Solana blockchain, enabling users to store, send, receive, and swap tokens.', link: 'https://phantom.app/' },
            { name: 'Exodus', logoUrl: 'https://imgs.search.brave.com/ZKaNWMpvTU61nES7-lA_NbmuPOquziuYE9DgJP5orTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly96ZW5n/by5jb20vd3AtY29u/dGVudC91cGxvYWRz/L0V4b2R1c18yMDB4/MjAwQHgyLTE1MHgx/NTBAMngucG5n', description: 'A multi-currency desktop and mobile wallet with a user-friendly interface and built-in exchange.', link: 'https://www.exodus.com/' },
        ],
    },
    {
        id: 'dapps',
        title: 'DeFi dApps',
        headline: 'Explore DeFi & Web3 Applications',
        Icon: PuzzlePieceIcon,
        items: [
            { name: 'Uniswap', logoUrl: 'https://imgs.search.brave.com/gBtaRoLyFQDofDUkC5wqTHQZg9RZAckvqKIH0cdUFvU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzgyL1VuaXN3YXBf/TG9nby5wbmc', description: 'A pioneering decentralized exchange (DEX) protocol on Ethereum for swapping tokens.', link: 'https://uniswap.org/' },
            { name: 'Aave', logoUrl: 'https://imgs.search.brave.com/zljQCxvc7B8mv7i40Ie-lu0LOs-mzpDlUTApg-aDvTE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvYWF2/ZS1jcmlwdG8tNDMy/NTM3My0zNTkxMDI0/LnBuZz9mPXdlYnA', description: 'A leading decentralized lending and borrowing protocol.', link: 'https://aave.com/' },
            { name: 'dYdX', logoUrl: 'https://imgs.search.brave.com/Jt-9vSTylgBEISZBZNaAHB4HqP2-oMf22KEML1mzTSU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbHRj/b2luc2JveC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDMvZnVsbC1keWR4/LWxvZ28tMzAweDMw/MC53ZWJw', description: 'A decentralized exchange for trading perpetual futures contracts with leverage.', link: 'https://dydx.exchange/' },
            { name: 'Morpho', logoUrl: 'https://imgs.search.brave.com/vspt9Dhau7NhDR1JnbLBUiU3uVPB4t2yJr2dt6TXpcI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcnlw/dG9hc3QuZnIvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDEv/bW9ycGhvLWxvZ28u/cG5n', description: 'A DeFi protocol that optimizes lending/borrowing rates by matching users peer-to-peer.', link: 'https://www.morpho.org/' },
            { name: 'Polymarket', logoUrl: 'https://imgs.search.brave.com/I4ykaVCvWXffp4qEXyi6JUKumcpvtBX9nis5A58unnQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdw/cm94eS5jcnlwdG9q/b2JzbGlzdC5jb20v/c2lnMHgyMy9xOjc1/L2RwcjoxLjIvd2lk/dGg6MjU2L3JzOmZp/bGwvZXg6MS9wbGFp/bi9nczovam9iLWxp/c3RpbmctbG9nb3Mv/ODg0OTYzOTItMjY4/My00MzliLWIwMDAt/NzNkMDFmZGU3Zjdm/LnBuZw', description: 'A decentralized platform where users can bet on the outcomes of real-world events.', link: 'https://polymarket.com/' },
            { name: 'ether.fi', logoUrl: 'https://imgs.search.brave.com/53pkCRatsh0Ou1na-cKenjH6NpArD86eHP6GNDsUmoU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDkvZXRoZXIu/ZmlfRVRIRklfTG9n/by0zMDAweDMwMDAu/cG5n', description: 'A decentralized liquid restaking protocol on Ethereum, allowing users to stake ETH while keeping assets liquid.', link: 'https://www.ether.fi/' },
            { name: 'Hyperliquid', logoUrl: 'https://imgs.search.brave.com/8iHSpZNeV4wdECieNomNjcKLwcMD9-ksi9HHI_QIDY8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9uZnRl/dmVuaW5nLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNS8w/My9oeXBlcmxpcXVp/ZC1sb2dvLnBuZw', description: 'A high-performance decentralized perpetuals exchange built on its own Layer 1 blockchain.', link: 'https://hyperliquid.xyz/' },
            { name: 'MakerDAO', logoUrl: 'https://imgs.search.brave.com/wLhsw_2r6UylgSLCVJWWLP4_H0yVif17xM1vNs2OWSo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9nbG9i/YWxjcnlwdG8udHYv/d3AtY29udGVudC91/cGxvYWRzLzIwMTkv/MDMvTWFrZXJEQU8t/bG9nby5wbmc', description: 'The decentralized autonomous organization (DAO) behind the DAI stablecoin.', link: 'https://makerdao.com/' },
            { name: 'Gnosis Pay', logoUrl: 'https://imgs.search.brave.com/VPrB2kTCV6cktLCrJNpx8c1w-YX6DSRfF812mBmLbhU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcnlw/dG9jdXJyZW5jeWpv/YnMuY28vc3RhcnR1/cHMvYXNzZXRzL2xv/Z29zL2dub3Npcy1w/YXkucG5n', description: 'A decentralized payment network connecting self-custodial wallets with a payment card.', link: 'https://www.gnosispay.com/' },
            { name: 'OpenSea', logoUrl: 'https://imgs.search.brave.com/RvkIIHxZSCKsGXWBrgfFr9bfaQimqeunJ4fIh-zsoHs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcnlw/dG9nb29kaWVzLnNo/b3Avd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDUvYnJhbmQt/b3BlbnNlYS1sb2dv/LnBuZw', description: 'The original and one of the largest peer-to-peer marketplaces for NFTs.', link: 'https://opensea.io/' },
            { name: 'Bungee', logoUrl: 'https://imgs.search.brave.com/Tas_n7y1s-Ls3mGYL3gArl1d1qVkDLLz7UoLCPdmefw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/Y3J5cHRvcmFuay5p/by9jb2lucy9idW5n/ZWUxNzE1NzkxOTYw/MzgzLnBuZw', description: 'A bridge aggregator that finds the cheapest and fastest routes to move assets between blockchains.', link: 'https://www.bungee.exchange/' },
            { name: 'deBridge', logoUrl: 'https://imgs.search.brave.com/9XEgdmbvuPcvdrxhD7CsKrvMaKkBq36DTMWHOLkFIrI/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jb2lu/bGF1bmNoLnNwYWNl/L21lZGlhL2ltYWdl/cy8zLzkvNC80LzM5/NDQuc2l4aTQyLjEx/NHgxMTQuanBn', description: 'A cross-chain interoperability protocol that allows for decentralized transfers of assets and data.', link: 'https://debridge.finance/' },
            { name: 'QiDao Protocol', logoUrl: 'https://imgs.search.brave.com/GsAYV3dLkFJHOBayJf8z22R7HjFu1r99LIbjw2NR6W4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kM3Qz/b3pmdG1kbWgzaS5j/bG91ZGZyb250Lm5l/dC9wcm9kdWN0aW9u/L3BvZGNhc3RfdXBs/b2FkZWRfbm9sb2dv/NDAwLzMxNjEzLzMx/NjEzLTE2MzA2MTU2/OTE1NjUtZWY3ZmQ2/ZmMwNzZiYS5qcGc', description: 'A self-sustaining, community-governed protocol that allows you to borrow stablecoins interest-free against your crypto assets.', link: 'https://www.qidao.community/' },
            { name: 'Aerodrome Finance', logoUrl: 'https://imgs.search.brave.com/7VPPN003XP8dTXl388CECP3SFg-JcvNDZBS9xldqDXo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9maWxl/cy5zd2lzc2Jvcmcu/Y29tL3Byb2R1Y3Qv/d2VhbHRoLWFwcC9h/c3NldHMvaWNfY3J5/cHRvX2Flcm9icWp3/LnBuZw', description: 'A next-generation AMM designed to serve as Base\'s central liquidity hub.', link: 'https://aerodrome.finance/' },
            { name: 'Odos', logoUrl: 'https://imgs.search.brave.com/bQM7NVrFOOL_wxyPctyeTlCuiFwXof9iI8vD4OY5VuY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YWxjaGVteS5jb20v/ZGFwcHMvX25leHQv/aW1hZ2U_dXJsPWh0/dHBzOi8vcmVzLmNs/b3VkaW5hcnkuY29t/L2FsY2hlbXktd2Vi/c2l0ZS9pbWFnZS91/cGxvYWQvdjE2OTQ2/NzU5NTYvZGFwcC1z/dG9yZS9kYXBwLWxv/Z29zL09kb3MuanBn/Jnc9NjQwJnE9NzU', description: 'A smart order routing (SOR) solution that finds the optimal path for token swaps, aggregating liquidity from multiple DEXs.', link: 'https://www.odos.xyz/' },
            { name: '1inch', logoUrl: 'https://imgs.search.brave.com/PZr8udCbI-GLF1Oj0tM1pxTsEUtATIH6wv7UhgCmqHo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcnlw/dG9nb29kaWVzLnNo/b3Avd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMTEva2lzcy1j/dXQtc3RpY2tlcnMt/M3gzLWRlZmF1bHQt/NjE5NDM4MmRlZGE5/OC5wbmc', description: 'A DEX aggregator that sources liquidity from various exchanges to provide the best swap rates.', link: 'https://1inch.io/' },
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
            { name: 'DeBank', logoUrl: 'https://imgs.search.brave.com/nPYmiiyS8SQ6h3UbyPc7TW2P4HoaUVJS9374AxhFPBo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQzLzEvZGViYW5r/LWxvZ28tcG5nX3Nl/ZWtsb2dvLTQzMjY3/MC5wbmc', description: 'A multi-chain portfolio tracker that shows all your assets and DeFi positions in one dashboard.', link: 'https://debank.com/' },
            { name: 'DefiLlama Swap', logoUrl: 'https://imgs.search.brave.com/do2pVi3XhqZSSW0jZCpy2aMD8p_mLXbEvVGs4ucOSf0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9sb2dv/c2FuZHR5cGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wMi9kZWZpbGxh/bWEuc3Zn', description: 'A DEX aggregator that finds the best swap rates across multiple decentralized exchanges.', link: 'https://swap.defillama.com/' },
            { name: 'CoinMarketCap', logoUrl: 'https://cdn.simpleicons.org/coinmarketcap/1A46FF', description: 'A leading crypto price-tracking website providing market cap rankings, charts, and analysis.', link: 'https://coinmarketcap.com/' },
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
            { name: 'Polygon', logoUrl: 'https://cdn.simpleicons.org/polygon/8247E5', description: 'A platform for Ethereum scaling and infrastructure development, offering a framework for building and connecting Ethereum-compatible blockchain networks.', link: 'https://polygon.technology/' },
        ],
    },
    {
        id: 'video-tutorials',
        title: 'Video Tutorials',
        headline: 'Learn from Top Crypto YouTubers',
        Icon: VideoCameraIcon,
        items: [
            { 
                name: 'Whiteboard Crypto', 
                logoUrl: 'https://unavatar.io/youtube/WhiteboardCrypto', 
                description: 'Explains complex crypto topics with simple animated videos and whiteboard explainers.', 
                link: 'https://www.youtube.com/@WhiteboardCrypto' 
            },
            { 
                name: 'Ivan on Tech', 
                logoUrl: 'https://unavatar.io/youtube/IvanOnTech', 
                description: 'Covers daily crypto news, interviews, and deep dives into blockchain programming.', 
                link: 'https://www.youtube.com/@IvanOnTech' 
            },
            { 
                name: 'Bob Loukas', 
                logoUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_n0t6MpSvjDBGC0qG-zlvOdg45On0gxHWUi645pcPox4ko=s176-c-k-c0x00ffffff-no-rj-mo', 
                description: 'Known for his work on Bitcoin\'s 4-year cycle and long-term market analysis.', 
                link: 'https://www.youtube.com/@BobLoukas' 
            },
            { 
                name: 'Big Cheds', 
                logoUrl: 'https://yt3.ggpht.com/7Go7PQAM8UC5I69jmwxBXe-xDCn9w0c5xEBJsko6CpujD2ys912-lUM32nG0hzxW8Jny-w2ZtrI=s176-c-k-c0x00ffffff-no-rj-mo', 
                description: 'Focuses on technical analysis and trading strategies. Good for learning charting.', 
                link: 'https://www.youtube.com/@BigCheds' 
            },
            {
                name: 'Anthony Pompliano',
                logoUrl: 'https://unavatar.io/youtube/AnthonyPompliano',
                description: 'An entrepreneur and investor who breaks down complex topics in business, finance, and Bitcoin.',
                link: 'https://www.youtube.com/@AnthonyPompliano'
            },
            {
                name: 'Swan Bitcoin',
                logoUrl: 'https://yt3.ggpht.com/JJMVxgo66Jp8VRwa8WW7IWfEi2LuUzPUlQjdwSkd7TcItg0k4efLCHjUTci1rCi8-vlj0VoBQQ=s176-c-k-c0x00ffffff-no-rj-mo',
                description: 'Provides educational content on Bitcoin, interviews with experts, and guides on buying and holding.',
                link: 'https://www.youtube.com/c/SwanBitcoin'
            }
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
