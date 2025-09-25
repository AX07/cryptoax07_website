import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';

const quizQuestions: QuizQuestion[] = [
    {
        question: "What does 'NFT' stand for?",
        options: [
            { text: "Non-Fungible Token", isCorrect: true },
            { text: "New Financial Technology", isCorrect: false },
        ],
        explanation: "NFT stands for Non-Fungible Token. 'Non-fungible' means it's unique and can't be replaced with something else, unlike a dollar bill which is fungible."
    },
    {
        question: "What does 'minting' an NFT mean?",
        options: [
            { text: "Buying an NFT from a marketplace.", isCorrect: false },
            { text: "Publishing a unique token on the blockchain for the first time.", isCorrect: true },
        ],
        explanation: "Minting is the process of creating a new NFT by recording its data on the blockchain, making it a permanent and tamper-proof asset."
    },
    {
        question: "Besides digital art, what is another potential use case for NFTs?",
        options: [
            { text: "Event ticketing or proof of ownership for a physical item.", isCorrect: true },
            { text: "Sending anonymous messages.", isCorrect: false },
        ],
        explanation: "NFTs can be used for many things, including ticketing (where each ticket is unique), digital identity, and representing ownership of real-world assets."
    }
];

const NftSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [activeTab, setActiveTab] = useState<'learn' | 'mint' | 'market'>('learn');
    const [nft, setNft] = useState<{ title: string; desc: string; isMinted: boolean; isListed: boolean; price: string } | null>(null);
    const [mintTitle, setMintTitle] = useState('CryptoPunk #7804');
    const [mintDesc, setMintDesc] = useState('A cool pixelated alien smoking a pipe.');
    const [listPrice, setListPrice] = useState('4200');
    const [showQuiz, setShowQuiz] = useState(false);

    const handleMint = () => {
        setNft({ title: mintTitle, desc: mintDesc, isMinted: true, isListed: false, price: '' });
        setActiveTab('market');
    };

    const handleList = () => {
        if (nft) {
            setNft({ ...nft, isListed: true, price: listPrice });
        }
    };
    
    const renderLearnTab = () => (
        <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 text-center">What is an NFT?</h3>
            <p className="text-brand-text-secondary mb-6 text-center">An NFT is a unique digital certificate, stored on a blockchain, that represents ownership of an asset. This asset can be digital (like art or music) or physical. Because it's on a blockchain, ownership is transparent and can't be faked.</p>
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-brand-bg/50"><strong>Digital Art:</strong> The most famous use case, proving ownership of an image or animation.</Card>
                <Card className="p-4 bg-brand-bg/50"><strong>Gaming:</strong> In-game items like swords or skins can be NFTs that players truly own.</Card>
                <Card className="p-4 bg-brand-bg/50"><strong>Ticketing:</strong> An event ticket as an NFT prevents fraud and can become a collectible.</Card>
                <Card className="p-4 bg-brand-bg/50"><strong>Identity:</strong> A unique NFT could represent a diploma, a license, or even your identity online.</Card>
            </div>
        </div>
    );
    
    const renderMintTab = () => (
        <div className="animate-fade-in text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Mint Your Own NFT</h3>
            <div className="w-48 h-48 bg-gray-700 mx-auto rounded-lg flex items-center justify-center mb-4">
                <span className="text-brand-text-secondary">Mock Image</span>
            </div>
            <div className="space-y-4 text-left">
                <div>
                    <label className="block text-sm font-medium text-brand-text-secondary mb-1">Title</label>
                    <input type="text" value={mintTitle} onChange={e => setMintTitle(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-brand-text-secondary mb-1">Description</label>
                    <textarea value={mintDesc} onChange={e => setMintDesc(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 h-20"/>
                </div>
            </div>
            <Button onClick={handleMint} className="mt-6">Mint NFT</Button>
        </div>
    );
    
    const renderMarketTab = () => (
        <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 text-center">My Collection & Marketplace</h3>
            {!nft ? (
                <p className="text-center text-brand-text-secondary">You haven't minted any NFTs yet. Go to the 'Mint' tab to create one!</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* My NFT */}
                    <Card className="p-4 bg-brand-bg/50">
                        <h4 className="font-bold text-brand-primary mb-2">My NFT</h4>
                        <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-brand-text-secondary">Mock Image</span>
                        </div>
                        <h5 className="font-bold text-white">{nft.title}</h5>
                        <p className="text-sm text-brand-text-secondary mb-4">{nft.desc}</p>
                        {!nft.isListed && (
                            <div className="flex items-center gap-2">
                                <input type="number" value={listPrice} onChange={e => setListPrice(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2" placeholder="Price in ETH" />
                                <Button onClick={handleList}>List for Sale</Button>
                            </div>
                        )}
                    </Card>
                    {/* Marketplace */}
                    <Card className="p-4">
                        <h4 className="font-bold text-brand-primary mb-2">Marketplace Listing</h4>
                        {nft.isListed ? (
                            <div className="animate-fade-in">
                                <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                                     <span className="text-brand-text-secondary">Mock Image</span>
                                </div>
                                <h5 className="font-bold text-white">{nft.title}</h5>
                                <p className="text-lg font-bold text-brand-secondary mt-2">{nft.price} ETH</p>
                            </div>
                        ) : (
                            <p className="text-brand-text-secondary">Your NFT is not listed for sale yet.</p>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">NFTs Explained</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
                Explore the world of Non-Fungible Tokens. Learn what they are, mint your first mock NFT, and see how it would appear on a marketplace.
            </p>

            <div className="flex mb-6 border-b border-gray-700">
                <button onClick={() => setActiveTab('learn')} className={`px-4 py-2 font-semibold ${activeTab === 'learn' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>Learn</button>
                <button onClick={() => setActiveTab('mint')} className={`px-4 py-2 font-semibold ${activeTab === 'mint' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>Mint</button>
                <button onClick={() => setActiveTab('market')} className={`px-4 py-2 font-semibold ${activeTab === 'market' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>Marketplace</button>
            </div>
            
            {activeTab === 'learn' && renderLearnTab()}
            {activeTab === 'mint' && renderMintTab()}
            {activeTab === 'market' && renderMarketTab()}

            {!showQuiz && nft?.isListed && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">Take Quiz</Button>
                </div>
            )}

            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default NftSim;
