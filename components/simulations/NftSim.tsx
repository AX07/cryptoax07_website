import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useSimText } from './useSimText';

const COPY = {
    en: {
        title: 'NFTs Explained',
        intro: 'Explore the world of Non-Fungible Tokens. Learn what they are, mint your first mock NFT, and see how it would appear on a marketplace.',
        tabs: { learn: 'Learn', mint: 'Mint', market: 'Marketplace' },
        whatTitle: 'What is an NFT?',
        whatBody: "An NFT is a unique digital certificate, stored on a blockchain, that represents ownership of an asset. This asset can be digital (like art or music) or physical. Because it's on a blockchain, ownership is transparent and can't be faked.",
        uses: [
            ['Digital Art:', 'The most famous use case, proving ownership of an image or animation.'],
            ['Gaming:', 'In-game items like swords or skins can be NFTs that players truly own.'],
            ['Ticketing:', 'An event ticket as an NFT prevents fraud and can become a collectible.'],
            ['Identity:', 'A unique NFT could represent a diploma, a license, or even your identity online.'],
        ],
        mintTitleH: 'Mint Your Own NFT',
        mockImage: 'Mock Image',
        title_: 'Title',
        desc: 'Description',
        mintBtn: 'Mint NFT',
        defaultTitle: 'CryptoPunk #7804',
        defaultDesc: 'A cool pixelated alien smoking a pipe.',
        collection: 'My Collection & Marketplace',
        none: "You haven't minted any NFTs yet. Go to the 'Mint' tab to create one!",
        myNft: 'My NFT',
        pricePh: 'Price in ETH',
        list: 'List for Sale',
        listing: 'Marketplace Listing',
        notListed: 'Your NFT is not listed for sale yet.',
        takeQuiz: 'Take Quiz',
        quiz: [
            { question: "What does 'NFT' stand for?", options: [{ text: 'Non-Fungible Token', isCorrect: true }, { text: 'New Financial Technology', isCorrect: false }], explanation: "NFT stands for Non-Fungible Token. 'Non-fungible' means it's unique and can't be replaced with something else, unlike a dollar bill which is fungible." },
            { question: "What does 'minting' an NFT mean?", options: [{ text: 'Buying an NFT from a marketplace.', isCorrect: false }, { text: 'Publishing a unique token on the blockchain for the first time.', isCorrect: true }], explanation: 'Minting is the process of creating a new NFT by recording its data on the blockchain, making it a permanent and tamper-proof asset.' },
            { question: 'Besides digital art, what is another potential use case for NFTs?', options: [{ text: 'Event ticketing or proof of ownership for a physical item.', isCorrect: true }, { text: 'Sending anonymous messages.', isCorrect: false }], explanation: 'NFTs can be used for many things, including ticketing (where each ticket is unique), digital identity, and representing ownership of real-world assets.' },
        ] as QuizQuestion[],
    },
    es: {
        title: 'NFTs Explicados',
        intro: 'Explora el mundo de los Tokens No Fungibles. Aprende qué son, crea (mint) tu primer NFT de prueba y mira cómo aparecería en un marketplace.',
        tabs: { learn: 'Aprender', mint: 'Crear', market: 'Marketplace' },
        whatTitle: '¿Qué es un NFT?',
        whatBody: 'Un NFT es un certificado digital único, guardado en una blockchain, que representa la propiedad de un activo. Ese activo puede ser digital (como arte o música) o físico. Como está en una blockchain, la propiedad es transparente y no se puede falsificar.',
        uses: [
            ['Arte digital:', 'El caso de uso más famoso: demostrar la propiedad de una imagen o animación.'],
            ['Videojuegos:', 'Objetos del juego como espadas o skins pueden ser NFTs que los jugadores realmente poseen.'],
            ['Boletos:', 'Un boleto de evento como NFT evita fraudes y puede convertirse en un coleccionable.'],
            ['Identidad:', 'Un NFT único podría representar un diploma, una licencia o incluso tu identidad en línea.'],
        ],
        mintTitleH: 'Crea tu Propio NFT',
        mockImage: 'Imagen de Ejemplo',
        title_: 'Título',
        desc: 'Descripción',
        mintBtn: 'Crear NFT',
        defaultTitle: 'CryptoPunk #7804',
        defaultDesc: 'Un alienígena pixelado muy cool fumando una pipa.',
        collection: 'Mi Colección y Marketplace',
        none: 'Aún no has creado ningún NFT. ¡Ve a la pestaña "Crear" para hacer uno!',
        myNft: 'Mi NFT',
        pricePh: 'Precio en ETH',
        list: 'Poner a la Venta',
        listing: 'Publicación en el Marketplace',
        notListed: 'Tu NFT aún no está a la venta.',
        takeQuiz: 'Hacer el Quiz',
        quiz: [
            { question: "¿Qué significa 'NFT'?", options: [{ text: 'Token No Fungible', isCorrect: true }, { text: 'Nueva Tecnología Financiera', isCorrect: false }], explanation: "NFT significa Non-Fungible Token (Token No Fungible). 'No fungible' quiere decir que es único y no puede reemplazarse por otra cosa, a diferencia de un billete de dólar, que sí es fungible." },
            { question: "¿Qué significa 'mintear' un NFT?", options: [{ text: 'Comprar un NFT en un marketplace.', isCorrect: false }, { text: 'Publicar por primera vez un token único en la blockchain.', isCorrect: true }], explanation: 'Mintear es el proceso de crear un NFT nuevo registrando sus datos en la blockchain, lo que lo convierte en un activo permanente e inalterable.' },
            { question: 'Además del arte digital, ¿cuál es otro posible uso de los NFTs?', options: [{ text: 'Boletos de eventos o prueba de propiedad de un objeto físico.', isCorrect: true }, { text: 'Enviar mensajes anónimos.', isCorrect: false }], explanation: 'Los NFTs sirven para muchas cosas: boletos (donde cada boleto es único), identidad digital y representar la propiedad de activos del mundo real.' },
        ] as QuizQuestion[],
    },
};

type Tab = 'learn' | 'mint' | 'market';

const NftSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const c = useSimText(COPY);
    const [activeTab, setActiveTab] = useState<Tab>('learn');
    const [nft, setNft] = useState<{ title: string; desc: string; isListed: boolean; price: string } | null>(null);
    const [mintTitle, setMintTitle] = useState(c.defaultTitle);
    const [mintDesc, setMintDesc] = useState(c.defaultDesc);
    const [listPrice, setListPrice] = useState('4200');
    const [showQuiz, setShowQuiz] = useState(false);

    const handleMint = () => {
        setNft({ title: mintTitle, desc: mintDesc, isListed: false, price: '' });
        setActiveTab('market');
    };
    const handleList = () => { if (nft) setNft({ ...nft, isListed: true, price: listPrice }); };

    const mockImg = (h: string) => <div className={`w-full ${h} bg-gray-700 rounded-lg flex items-center justify-center mb-4`}><span className="text-brand-text-secondary">{c.mockImage}</span></div>;

    const renderLearnTab = () => (
        <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{c.whatTitle}</h3>
            <p className="text-brand-text-secondary mb-6 text-center">{c.whatBody}</p>
            <div className="grid md:grid-cols-2 gap-4">
                {c.uses.map(([h, d]) => <Card key={h} className="p-4 bg-brand-bg/50"><strong>{h}</strong> {d}</Card>)}
            </div>
        </div>
    );

    const renderMintTab = () => (
        <div className="animate-fade-in text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">{c.mintTitleH}</h3>
            <div className="w-48 h-48 bg-gray-700 mx-auto rounded-lg flex items-center justify-center mb-4"><span className="text-brand-text-secondary">{c.mockImage}</span></div>
            <div className="space-y-4 text-left">
                <div>
                    <label className="block text-sm font-medium text-brand-text-secondary mb-1">{c.title_}</label>
                    <input type="text" value={mintTitle} onChange={e => setMintTitle(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-brand-text-secondary mb-1">{c.desc}</label>
                    <textarea value={mintDesc} onChange={e => setMintDesc(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 h-20" />
                </div>
            </div>
            <Button onClick={handleMint} className="mt-6">{c.mintBtn}</Button>
        </div>
    );

    const renderMarketTab = () => (
        <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{c.collection}</h3>
            {!nft ? (
                <p className="text-center text-brand-text-secondary">{c.none}</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-4 bg-brand-bg/50">
                        <h4 className="font-bold text-brand-primary mb-2">{c.myNft}</h4>
                        {mockImg('h-48')}
                        <h5 className="font-bold text-white">{nft.title}</h5>
                        <p className="text-sm text-brand-text-secondary mb-4">{nft.desc}</p>
                        {!nft.isListed && (
                            <div className="flex items-center gap-2">
                                <input type="number" value={listPrice} onChange={e => setListPrice(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2" placeholder={c.pricePh} />
                                <Button onClick={handleList}>{c.list}</Button>
                            </div>
                        )}
                    </Card>
                    <Card className="p-4">
                        <h4 className="font-bold text-brand-primary mb-2">{c.listing}</h4>
                        {nft.isListed ? (
                            <div className="animate-fade-in">
                                {mockImg('h-48')}
                                <h5 className="font-bold text-white">{nft.title}</h5>
                                <p className="text-lg font-bold text-brand-secondary mt-2">{nft.price} ETH</p>
                            </div>
                        ) : (
                            <p className="text-brand-text-secondary">{c.notListed}</p>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

            <div className="flex mb-6 border-b border-gray-700">
                {(['learn', 'mint', 'market'] as Tab[]).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 font-semibold ${activeTab === tab ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>{c.tabs[tab]}</button>
                ))}
            </div>

            {activeTab === 'learn' && renderLearnTab()}
            {activeTab === 'mint' && renderMintTab()}
            {activeTab === 'market' && renderMarketTab()}

            {!showQuiz && nft?.isListed && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">{c.takeQuiz}</Button>
                </div>
            )}

            {showQuiz && <Quiz questions={c.quiz} onComplete={onComplete} />}
        </Card>
    );
};

export default NftSim;
