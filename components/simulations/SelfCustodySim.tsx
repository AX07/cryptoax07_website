import React from 'react';
import Card from '../ui/Card';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { FireIcon, CpuChipIcon, CheckCircleIcon, XMarkIcon } from '../icons/Icons';
import { useSimText } from './useSimText';

const COPY = {
  en: {
    title: 'Self-Custody: Hot vs. Cold Wallets',
    intro: '"Not your keys, not your coins." Self-custody means you are in full control of your private keys and your crypto. This simulation explains the two main types of self-custody wallets.',
    hot: 'Hot Wallets',
    hotDesc: 'Software wallets that are connected to the internet (e.g., browser extensions, mobile apps).',
    cold: 'Cold Wallets',
    coldDesc: 'Physical hardware devices that store your private keys completely offline.',
    pros: 'Pros:',
    cons: 'Cons:',
    bestFor: 'Best for:',
    hotPros: [['Convenient:', 'Quick and easy to use for daily transactions, swapping, and interacting with DApps.'], ['Accessible:', 'Can be used on multiple devices like phones and computers.']],
    hotCons: [['Vulnerable:', 'Because they are always online, they are more susceptible to hacking, malware, and phishing attacks.']],
    hotBest: 'Small amounts of crypto for frequent use, like a spending wallet.',
    coldPros: [['Maximum Security:', 'Keys are never exposed to the internet, offering the best protection against online threats.'], ['Peace of Mind:', 'Ideal for long-term holding ("HODLing") of significant amounts.']],
    coldCons: [['Less Convenient:', 'Requires physical access to the device to sign and approve transactions.']],
    coldBest: 'The majority of your crypto assets, acting as a secure savings vault.',
    quiz: [
      { question: 'Which type of wallet is considered more vulnerable to online attacks like hacking and malware?', options: [{ text: 'Hot Wallet', isCorrect: true }, { text: 'Cold Wallet', isCorrect: false }], explanation: 'Hot wallets are connected to the internet, which makes them more accessible but also more vulnerable to online threats.' },
      { question: 'What is the primary advantage of a cold wallet?', options: [{ text: 'Convenience for daily transactions', isCorrect: false }, { text: "Maximum security because it's offline", isCorrect: true }], explanation: 'Cold wallets store your private keys offline, providing the best protection against hacking and online theft.' },
      { question: 'For storing a large amount of crypto long-term (HODLing), which wallet is generally recommended?', options: [{ text: 'Hot Wallet', isCorrect: false }, { text: 'Cold Wallet', isCorrect: true }], explanation: "A cold wallet is like a vault, ideal for securing large amounts of crypto that you don't need to access frequently." },
      { question: "'Not your keys, not your coins' is a phrase that emphasizes the importance of...", options: [{ text: 'Using a centralized exchange for storage', isCorrect: false }, { text: 'Self-custody, where you control your private keys', isCorrect: true }], explanation: "This phrase is a reminder that if you don't control your private keys, you don't truly own your cryptocurrency." },
    ] as QuizQuestion[],
  },
  es: {
    title: 'Autocustodia: Wallets Calientes vs. Frías',
    intro: '"Si no son tus llaves, no son tus monedas". Autocustodia significa que tienes el control total de tus llaves privadas y de tus criptomonedas. Esta simulación explica los dos tipos principales de wallets de autocustodia.',
    hot: 'Wallets Calientes',
    hotDesc: 'Wallets de software conectadas a internet (p. ej., extensiones de navegador, apps móviles).',
    cold: 'Wallets Frías',
    coldDesc: 'Dispositivos físicos que guardan tus llaves privadas completamente sin conexión.',
    pros: 'Ventajas:',
    cons: 'Desventajas:',
    bestFor: 'Ideal para:',
    hotPros: [['Cómodas:', 'Rápidas y fáciles de usar para transacciones diarias, intercambios e interacción con DApps.'], ['Accesibles:', 'Se pueden usar en varios dispositivos, como teléfonos y computadoras.']],
    hotCons: [['Vulnerables:', 'Al estar siempre en línea, son más susceptibles a hackeos, malware y ataques de phishing.']],
    hotBest: 'Pequeñas cantidades de cripto de uso frecuente, como una wallet para gastos.',
    coldPros: [['Máxima seguridad:', 'Las llaves nunca se exponen a internet, lo que ofrece la mejor protección contra amenazas en línea.'], ['Tranquilidad:', 'Ideal para conservar a largo plazo ("HODLing") cantidades importantes.']],
    coldCons: [['Menos cómodas:', 'Requieren acceso físico al dispositivo para firmar y aprobar transacciones.']],
    coldBest: 'La mayor parte de tus activos cripto, como una bóveda de ahorro segura.',
    quiz: [
      { question: '¿Qué tipo de wallet se considera más vulnerable a ataques en línea como hackeos y malware?', options: [{ text: 'Wallet caliente', isCorrect: true }, { text: 'Wallet fría', isCorrect: false }], explanation: 'Las wallets calientes están conectadas a internet, lo que las hace más accesibles pero también más vulnerables a amenazas en línea.' },
      { question: '¿Cuál es la principal ventaja de una wallet fría?', options: [{ text: 'Comodidad para transacciones diarias', isCorrect: false }, { text: 'Máxima seguridad porque está sin conexión', isCorrect: true }], explanation: 'Las wallets frías guardan tus llaves privadas sin conexión, lo que da la mejor protección contra hackeos y robos en línea.' },
      { question: 'Para guardar una gran cantidad de cripto a largo plazo (HODLing), ¿qué wallet se recomienda normalmente?', options: [{ text: 'Wallet caliente', isCorrect: false }, { text: 'Wallet fría', isCorrect: true }], explanation: 'Una wallet fría es como una bóveda, ideal para proteger grandes cantidades de cripto a las que no necesitas acceder con frecuencia.' },
      { question: "'Si no son tus llaves, no son tus monedas' es una frase que resalta la importancia de...", options: [{ text: 'Usar un exchange centralizado para guardar tus fondos', isCorrect: false }, { text: 'La autocustodia, donde tú controlas tus llaves privadas', isCorrect: true }], explanation: 'La frase recuerda que si no controlas tus llaves privadas, no eres realmente dueño de tu criptomoneda.' },
    ] as QuizQuestion[],
  },
};

type Pair = string[];
const ProList: React.FC<{ items: Pair[] }> = ({ items }) => (
  <ul className="space-y-2 text-sm mb-4">
    {items.map(([h, d]) => (
      <li key={h} className="flex items-start gap-2">
        <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
        <span><strong>{h}</strong> {d}</span>
      </li>
    ))}
  </ul>
);
const ConList: React.FC<{ items: Pair[] }> = ({ items }) => (
  <ul className="space-y-2 text-sm">
    {items.map(([h, d]) => (
      <li key={h} className="flex items-start gap-2">
        <XMarkIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
        <span><strong>{h}</strong> {d}</span>
      </li>
    ))}
  </ul>
);

const SelfCustodySim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 bg-brand-bg/50 border-orange-400/50">
          <div className="flex items-center gap-4 mb-4">
            <FireIcon className="h-10 w-10 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">{c.hot}</h3>
          </div>
          <p className="text-sm text-brand-text-secondary mb-4">{c.hotDesc}</p>
          <h4 className="font-semibold text-brand-primary mb-2">{c.pros}</h4>
          <ProList items={c.hotPros} />
          <h4 className="font-semibold text-red-400 mb-2">{c.cons}</h4>
          <ConList items={c.hotCons} />
          <p className="text-xs text-brand-text-secondary mt-4 p-2 bg-brand-bg rounded-lg"><strong>{c.bestFor}</strong> {c.hotBest}</p>
        </Card>

        <Card className="p-6 bg-brand-bg/50 border-sky-400/50">
          <div className="flex items-center gap-4 mb-4">
            <CpuChipIcon className="h-10 w-10 text-sky-400" />
            <h3 className="text-2xl font-bold text-white">{c.cold}</h3>
          </div>
          <p className="text-sm text-brand-text-secondary mb-4">{c.coldDesc}</p>
          <h4 className="font-semibold text-brand-primary mb-2">{c.pros}</h4>
          <ProList items={c.coldPros} />
          <h4 className="font-semibold text-red-400 mb-2">{c.cons}</h4>
          <ConList items={c.coldCons} />
          <p className="text-xs text-brand-text-secondary mt-4 p-2 bg-brand-bg rounded-lg"><strong>{c.bestFor}</strong> {c.coldBest}</p>
        </Card>
      </div>

      <Quiz questions={c.quiz} onComplete={onComplete} />
    </Card>
  );
};

export default SelfCustodySim;
