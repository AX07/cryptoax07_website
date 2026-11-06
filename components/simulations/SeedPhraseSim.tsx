import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ExclamationTriangleIcon } from '../icons/Icons';
import { useSimText } from './useSimText';

// Real BIP-39 words (the standard list has 2048). This sim always uses 12 distinct words.
const wordList = [
    'abandon', 'ability', 'access', 'actor', 'anchor', 'april', 'arctic', 'artist',
    'basket', 'beauty', 'bridge', 'cabin', 'candy', 'castle', 'cheese', 'circle',
    'coconut', 'crater', 'daring', 'diamond', 'eagle', 'engine', 'fabric', 'falcon',
    'galaxy', 'garden', 'harvest', 'helmet', 'island', 'jungle', 'kitten', 'ladder',
    'magnet', 'marble', 'nephew', 'ocean', 'orange', 'pencil', 'pilot', 'quantum',
    'rabbit', 'rocket', 'saddle', 'silver', 'tiger', 'turtle', 'umbrella', 'velvet',
    'walnut', 'winter', 'yellow', 'zebra'
];

const shuffle = <T,>(array: T[]): T[] =>
    array.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);

const generateWords = () => shuffle([...wordList]).slice(0, 12);

const COPY = {
    en: {
        title: 'Seed Phrase Simulation',
        intro: "In this simulation, you'll learn about one of the most important concepts in cryptocurrency: the seed phrase. You will generate a unique 12-word phrase, practice backing it up securely, and then verify it. Mastering this process is crucial because your seed phrase is the ultimate backup to your wallet. If you ever lose access to your device, this phrase is the only way to recover your funds.",
        step1Title: 'Step 1: Write Down Your Seed Phrase',
        step1Desc: 'This is the only time you will see your phrase. Write it down in order on paper and store it somewhere safe and offline.',
        rulesTitle: 'Golden rules',
        rules: [
            'Never take a screenshot or photo of it.',
            'Never store it in the cloud, notes, email or a password manager.',
            'Never type it into a website. Nobody legitimate will ever ask for it.',
            'Anyone who has these words has all your funds.',
        ],
        backedUp: "I've Backed It Up",
        step2Title: 'Step 2: Verify Your Backup',
        step2Desc: 'Select the words in the correct order to confirm your backup.',
        verify: 'Verify Phrase',
        correct: "Correct! Well done. You've securely backed up your phrase.",
        incorrect: "Incorrect order. In a real scenario, you'd need to re-check your backup.",
        restart: 'Restart Simulation',
    },
    es: {
        title: 'Simulación de Frase Semilla',
        intro: 'En esta simulación aprenderás uno de los conceptos más importantes de las criptomonedas: la frase semilla. Generarás una frase única de 12 palabras, practicarás cómo respaldarla de forma segura y luego la verificarás. Dominar este proceso es crucial porque tu frase semilla es el respaldo definitivo de tu wallet. Si alguna vez pierdes el acceso a tu dispositivo, esta frase es la única forma de recuperar tus fondos.',
        step1Title: 'Paso 1: Anota tu Frase Semilla',
        step1Desc: 'Esta es la única vez que verás tu frase. Anótala en orden en papel y guárdala en un lugar seguro y sin conexión.',
        rulesTitle: 'Reglas de oro',
        rules: [
            'Nunca le tomes captura de pantalla ni foto.',
            'Nunca la guardes en la nube, notas, correo ni en un gestor de contraseñas.',
            'Nunca la escribas en un sitio web. Nadie legítimo te la pedirá jamás.',
            'Quien tenga estas palabras tiene todos tus fondos.',
        ],
        backedUp: 'Ya la Respaldé',
        step2Title: 'Paso 2: Verifica tu Respaldo',
        step2Desc: 'Selecciona las palabras en el orden correcto para confirmar tu respaldo.',
        verify: 'Verificar Frase',
        correct: '¡Correcto! Muy bien. Has respaldado tu frase de forma segura.',
        incorrect: 'Orden incorrecto. En un caso real, tendrías que revisar tu respaldo.',
        restart: 'Reiniciar Simulación',
    },
};

const SeedPhraseSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const c = useSimText(COPY);
    const [step, setStep] = useState(1);
    const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [userSelection, setUserSelection] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const timer = useRef<number | undefined>();
    useEffect(() => () => window.clearTimeout(timer.current), []);

    const start = useCallback(() => {
        const newWords = generateWords();
        setSeedPhrase(newWords);
        setShuffledOptions(shuffle([...newWords]));
        setUserSelection([]);
        setIsCorrect(null);
        setStep(1);
    }, []);

    useEffect(() => { start(); }, [start]);

    const handleVerify = () => {
        const correct = JSON.stringify(userSelection) === JSON.stringify(seedPhrase);
        setIsCorrect(correct);
        if (correct) timer.current = window.setTimeout(onComplete, 2000);
    };

    const handleWordSelect = (word: string) => setUserSelection(sel => [...sel, word]);
    const handleWordRemove = (index: number) => setUserSelection(sel => sel.filter((_, i) => i !== index));

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

            {step === 1 && (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.step1Title}</h3>
                    <p className="mb-6 text-brand-text-secondary">{c.step1Desc}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-brand-bg/50 p-6 rounded-lg border border-gray-700 mb-6">
                        {seedPhrase.map((word, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-brand-text-secondary mr-2 w-6">{index + 1}.</span>
                                <span className="font-mono text-white text-lg">{word}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-left max-w-xl mx-auto mb-6 p-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10">
                        <p className="flex items-center gap-2 font-bold text-yellow-400 mb-2"><ExclamationTriangleIcon className="h-5 w-5" />{c.rulesTitle}</p>
                        <ul className="space-y-1 text-sm text-brand-text-secondary list-disc pl-5">
                            {c.rules.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    </div>
                    <Button onClick={() => setStep(2)}>{c.backedUp}</Button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{c.step2Title}</h3>
                    <p className="mb-6 text-center text-brand-text-secondary">{c.step2Desc}</p>

                    <div className="min-h-[10rem] bg-brand-bg/50 p-4 rounded-lg border border-gray-700 mb-6 flex flex-wrap gap-2 items-start">
                        {userSelection.map((word, index) => (
                            <button key={index} onClick={() => handleWordRemove(index)} className="bg-brand-primary text-brand-bg font-mono px-3 py-1 rounded-md text-sm hover:bg-red-500">
                                {word} &times;
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {shuffledOptions.map(word => (
                            <button
                                key={word}
                                onClick={() => handleWordSelect(word)}
                                disabled={userSelection.includes(word)}
                                className="bg-brand-surface font-mono px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {word}
                            </button>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button onClick={handleVerify} disabled={userSelection.length !== 12}>{c.verify}</Button>
                        {isCorrect === true && <p className="text-brand-secondary mt-4 font-bold">{c.correct}</p>}
                        {isCorrect === false && <p className="text-red-500 mt-4 font-bold">{c.incorrect}</p>}
                    </div>

                    <div className="text-center mt-4">
                        <button onClick={start} className="text-brand-text-secondary hover:text-brand-primary text-sm">{c.restart}</button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default SeedPhraseSim;
