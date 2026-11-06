import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useSimText } from './useSimText';

const COPY = {
  en: {
    title: 'Wallet Connection Simulation',
    intro: "Here, you'll practice connecting a wallet to a Decentralized App (DApp). You will walk through the connection and approval steps from a mock wallet. This is a vital security lesson, teaching you what permissions you grant and how to interact with the decentralized web safely.",
    dapp: 'Simulated DApp: UniSwap',
    connected: 'Connected',
    notConnected: 'Not Connected',
    wantsConnect: 'This DApp wants to connect to your wallet. This allows it to view your address and suggest transactions.',
    connect: 'Connect Wallet',
    opening: 'Opening your wallet extension... Please review the connection request.',
    requestTitle: 'Connection Request',
    wantsAccount: 'UniSwap wants to connect with your account:',
    allow: 'This will allow UniSwap to:',
    allow1: 'View your wallet balance and activity',
    allow2: 'Request approval for transactions',
    cannot: 'It can NOT move your funds without a separate transaction you sign.',
    reject: 'Reject',
    approve: 'Approve',
    successTitle: 'Connection Successful!',
    successBody: "Your wallet is now connected to UniSwap. You can now use the DApp's features.",
    successNote: 'In a real DApp, you can disconnect from the wallet extension at any time.',
  },
  es: {
    title: 'Simulación de Conexión de Wallet',
    intro: 'Aquí practicarás cómo conectar una wallet a una aplicación descentralizada (DApp). Recorrerás los pasos de conexión y aprobación desde una wallet simulada. Es una lección de seguridad vital: aprenderás qué permisos otorgas y cómo interactuar con la web descentralizada de forma segura.',
    dapp: 'DApp simulada: UniSwap',
    connected: 'Conectada',
    notConnected: 'No conectada',
    wantsConnect: 'Esta DApp quiere conectarse a tu wallet. Esto le permite ver tu dirección y sugerir transacciones.',
    connect: 'Conectar Wallet',
    opening: 'Abriendo la extensión de tu wallet... Revisa la solicitud de conexión.',
    requestTitle: 'Solicitud de Conexión',
    wantsAccount: 'UniSwap quiere conectarse con tu cuenta:',
    allow: 'Esto permitirá a UniSwap:',
    allow1: 'Ver el saldo y la actividad de tu wallet',
    allow2: 'Solicitar aprobación para transacciones',
    cannot: 'NO puede mover tus fondos sin una transacción aparte que tú firmes.',
    reject: 'Rechazar',
    approve: 'Aprobar',
    successTitle: '¡Conexión Exitosa!',
    successBody: 'Tu wallet ahora está conectada a UniSwap. Ya puedes usar las funciones de la DApp.',
    successNote: 'En una DApp real, puedes desconectarte desde la extensión de tu wallet en cualquier momento.',
  },
};

const WalletConnectionSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [step, setStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(id => window.clearTimeout(id)), []);

  const fakeAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

  const connectWallet = () => {
    setStep(2);
    timers.current.push(window.setTimeout(() => setStep(3), 1500));
  };

  const approveConnection = () => {
    setStep(4);
    setIsConnected(true);
    timers.current.push(window.setTimeout(() => onComplete(), 2000));
  };

  const rejectConnection = () => {
    setStep(1);
    setIsConnected(false);
  };

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">{c.intro}</p>

      <div className="bg-brand-bg/50 p-6 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">{c.dapp}</h3>
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConnected ? c.connected : c.notConnected}
          </span>
        </div>

        {step === 1 && (
          <div className="text-center">
            <p className="mb-4 text-brand-text-secondary">{c.wantsConnect}</p>
            <Button onClick={connectWallet}>{c.connect}</Button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <p className="mb-4 text-brand-text-secondary">{c.opening}</p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in">
            <h4 className="text-lg font-bold text-brand-primary mb-2">{c.requestTitle}</h4>
            <p className="mb-1 text-brand-text-secondary">{c.wantsAccount}</p>
            <p className="font-mono text-sm bg-brand-bg px-2 py-1 rounded-md inline-block mb-4 break-all">{fakeAddress}</p>
            <p className="text-xs text-brand-text-secondary mb-4">{c.allow}<br />- {c.allow1}<br />- {c.allow2}<br /><span className="text-brand-secondary">{c.cannot}</span></p>
            <div className="flex justify-center gap-4">
              <Button onClick={rejectConnection} variant="accent" className="bg-red-600 hover:bg-red-500">{c.reject}</Button>
              <Button onClick={approveConnection} variant="primary">{c.approve}</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center animate-fade-in">
            <h4 className="text-lg font-bold text-brand-secondary mb-2">{c.successTitle}</h4>
            <p className="mb-4 text-brand-text-secondary">{c.successBody}</p>
            <p className="text-xs text-brand-text-secondary">{c.successNote}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WalletConnectionSim;
