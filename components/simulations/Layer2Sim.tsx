import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useSimText } from './useSimText';

const COPY = {
    en: {
        title: 'Layer 2 Scaling Solutions',
        intro: 'Ethereum can be slow and expensive. Layer 2 (L2) solutions are separate blockchains built on top of Ethereum to make transactions faster and cheaper. This simulation compares a transaction on Layer 1 (mainnet) vs. a Layer 2 network.',
        l1: 'Layer 1 (Ethereum Mainnet)',
        l2: 'Layer 2 (e.g., Optimism)',
        gas: 'Gas Fee:',
        time: 'Time:',
        status: 'Status:',
        l1Time: '~13 seconds',
        l2Time: '~1 second',
        confirmed: 'Confirmed',
        awaiting: 'Awaiting Tx',
        sendL1: 'Send 0.01 ETH on L1',
        sendL2: 'Send 0.01 ETH on L2',
        takeQuiz: 'Take Quiz',
        quiz: [
            { question: 'What is the primary purpose of a Layer 2 scaling solution?', options: [
                { text: 'To increase the security of the main blockchain (Layer 1).', isCorrect: false },
                { text: 'To make transactions faster and cheaper by processing them off the main chain.', isCorrect: true } ],
              explanation: "Layer 2 solutions are built 'on top of' Layer 1 to handle transactions more efficiently, reducing congestion and fees on the main network." },
            { question: 'How do Layer 2 solutions (like Optimistic Rollups) typically work?', options: [
                { text: 'They bundle many transactions together off-chain and post a compressed summary to Layer 1.', isCorrect: true },
                { text: 'They use more powerful computers to mine blocks faster.', isCorrect: false } ],
              explanation: "Rollups 'roll up' multiple transactions into a single batch, which is processed off-chain. Only a small piece of data is then submitted to the main chain, saving a lot of space and cost." },
            { question: 'Based on the simulation, what is the main benefit for a user when using a Layer 2 network?', options: [
                { text: 'Higher transaction fees but better security.', isCorrect: false },
                { text: 'Significantly lower transaction fees and faster confirmation times.', isCorrect: true } ],
              explanation: 'The simulation demonstrates that Layer 2 networks offer a much better user experience with drastically reduced gas fees and near-instant transactions.' },
        ] as QuizQuestion[],
    },
    es: {
        title: 'Soluciones de Escalabilidad Layer 2',
        intro: 'Ethereum puede ser lento y caro. Las soluciones Layer 2 (L2) son blockchains separadas construidas sobre Ethereum para hacer las transacciones más rápidas y baratas. Esta simulación compara una transacción en Layer 1 (mainnet) con una en una red Layer 2.',
        l1: 'Layer 1 (Ethereum Mainnet)',
        l2: 'Layer 2 (p. ej., Optimism)',
        gas: 'Comisión de gas:',
        time: 'Tiempo:',
        status: 'Estado:',
        l1Time: '~13 segundos',
        l2Time: '~1 segundo',
        confirmed: 'Confirmada',
        awaiting: 'Esperando Tx',
        sendL1: 'Enviar 0.01 ETH en L1',
        sendL2: 'Enviar 0.01 ETH en L2',
        takeQuiz: 'Hacer el Quiz',
        quiz: [
            { question: '¿Cuál es el propósito principal de una solución de escalabilidad Layer 2?', options: [
                { text: 'Aumentar la seguridad de la blockchain principal (Layer 1).', isCorrect: false },
                { text: 'Hacer las transacciones más rápidas y baratas procesándolas fuera de la cadena principal.', isCorrect: true } ],
              explanation: "Las soluciones Layer 2 se construyen 'sobre' la Layer 1 para manejar las transacciones de forma más eficiente, reduciendo la congestión y las comisiones de la red principal." },
            { question: '¿Cómo funcionan normalmente las soluciones Layer 2 (como los Optimistic Rollups)?', options: [
                { text: 'Agrupan muchas transacciones fuera de la cadena y publican un resumen comprimido en la Layer 1.', isCorrect: true },
                { text: 'Usan computadoras más potentes para minar bloques más rápido.', isCorrect: false } ],
              explanation: "Los rollups 'enrollan' varias transacciones en un solo lote que se procesa fuera de la cadena. Solo un pequeño dato se envía a la cadena principal, ahorrando mucho espacio y costo." },
            { question: 'Según la simulación, ¿cuál es el principal beneficio para un usuario al usar una red Layer 2?', options: [
                { text: 'Comisiones más altas pero mejor seguridad.', isCorrect: false },
                { text: 'Comisiones mucho más bajas y confirmaciones más rápidas.', isCorrect: true } ],
              explanation: 'La simulación demuestra que las redes Layer 2 ofrecen una experiencia mucho mejor, con comisiones de gas drásticamente menores y transacciones casi instantáneas.' },
        ] as QuizQuestion[],
    },
};

type Status = 'idle' | 'pending' | 'confirmed';

const Layer2Sim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const c = useSimText(COPY);
    const [l1Status, setL1Status] = useState<Status>('idle');
    const [l2Status, setL2Status] = useState<Status>('idle');
    const [showQuiz, setShowQuiz] = useState(false);
    const timers = useRef<number[]>([]);
    useEffect(() => () => timers.current.forEach(id => window.clearTimeout(id)), []);

    const handleTransaction = (layer: 'l1' | 'l2') => {
        if (layer === 'l1') {
            setL1Status('pending');
            timers.current.push(window.setTimeout(() => setL1Status('confirmed'), 4000)); // L1 is slow
        } else {
            setL2Status('pending');
            timers.current.push(window.setTimeout(() => setL2Status('confirmed'), 500)); // L2 is fast
        }
    };

    const renderStatus = (status: Status) => {
        if (status === 'pending') return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>;
        if (status === 'confirmed') return <span className="font-bold text-brand-secondary">{c.confirmed}</span>;
        return <span className="text-brand-text-secondary">{c.awaiting}</span>;
    };

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 bg-brand-bg/50 border-red-500/50">
                    <h3 className="text-xl font-bold text-white mb-2">{c.l1}</h3>
                    <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between"><span>{c.gas}</span><span className="font-mono text-white">$25.50</span></div>
                        <div className="flex justify-between"><span>{c.time}</span><span className="font-mono text-white">{c.l1Time}</span></div>
                        <div className="flex justify-between"><span>{c.status}</span>{renderStatus(l1Status)}</div>
                    </div>
                    <Button onClick={() => handleTransaction('l1')} disabled={l1Status !== 'idle'} className="w-full" variant="accent">{c.sendL1}</Button>
                </Card>

                <Card className="p-6 bg-brand-bg/50 border-brand-secondary/50">
                    <h3 className="text-xl font-bold text-white mb-2">{c.l2}</h3>
                    <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between"><span>{c.gas}</span><span className="font-mono text-white">$0.05</span></div>
                        <div className="flex justify-between"><span>{c.time}</span><span className="font-mono text-white">{c.l2Time}</span></div>
                        <div className="flex justify-between"><span>{c.status}</span>{renderStatus(l2Status)}</div>
                    </div>
                    <Button onClick={() => handleTransaction('l2')} disabled={l2Status !== 'idle'} className="w-full" variant="secondary">{c.sendL2}</Button>
                </Card>
            </div>

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">{c.takeQuiz}</Button>
                </div>
            )}

            {showQuiz && <Quiz questions={c.quiz} onComplete={onComplete} />}
        </Card>
    );
};

export default Layer2Sim;
