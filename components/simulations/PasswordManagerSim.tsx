import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useSimText } from './useSimText';

const COPY = {
  en: {
    title: 'Password Manager Simulation',
    intro: 'Your first line of defense in crypto—and online in general—is a strong, unique password for every account. Reusing passwords is a major security risk. This simulation demonstrates how password managers help you create, store, and manage these complex passwords securely, so you only have to remember one master password.',
    whyTitle: 'Why Use a Password Manager?',
    whyBody: 'Using the same password everywhere is a huge security risk. If one site is breached, all your accounts are vulnerable. A password manager creates and stores strong, unique passwords for every site, so you only have to remember one master password.',
    tryIt: "Let's Try It",
    createTitle: 'Create a Secure Password',
    createDesc: 'Let\'s create a password for a mock exchange, "CryptoX".',
    password: 'Password',
    hint: 'Aim for 12+ characters with upper-case, numbers and symbols, or let the generator do it.',
    weak: 'Weak', medium: 'Medium', strong: 'Strong',
    generate: 'Generate Strong Password',
    tooWeak: 'Password too weak',
    save: 'Save to Vault',
    savedTitle: 'Saved to Your Vault',
    savedBody: 'Your password manager encrypts and stores your login details. You can now easily copy it when you need to log in.',
    username: 'Username: user@example.com',
    passwordLabel: 'Password:',
    show: 'Show', hide: 'Hide',
    finish: 'Finish Lesson',
  },
  es: {
    title: 'Simulación de Gestor de Contraseñas',
    intro: 'Tu primera línea de defensa en cripto —y en internet en general— es una contraseña fuerte y única para cada cuenta. Reutilizar contraseñas es un gran riesgo de seguridad. Esta simulación muestra cómo los gestores de contraseñas te ayudan a crear, guardar y administrar estas contraseñas complejas de forma segura, para que solo recuerdes una contraseña maestra.',
    whyTitle: '¿Por qué usar un gestor de contraseñas?',
    whyBody: 'Usar la misma contraseña en todos lados es un enorme riesgo de seguridad. Si un sitio es vulnerado, todas tus cuentas quedan expuestas. Un gestor de contraseñas crea y guarda contraseñas fuertes y únicas para cada sitio, así solo debes recordar una contraseña maestra.',
    tryIt: 'Probémoslo',
    createTitle: 'Crea una Contraseña Segura',
    createDesc: 'Vamos a crear una contraseña para un exchange de prueba, "CryptoX".',
    password: 'Contraseña',
    hint: 'Usa 12+ caracteres con mayúsculas, números y símbolos, o deja que el generador lo haga.',
    weak: 'Débil', medium: 'Media', strong: 'Fuerte',
    generate: 'Generar Contraseña Fuerte',
    tooWeak: 'Contraseña demasiado débil',
    save: 'Guardar en la Bóveda',
    savedTitle: 'Guardada en tu Bóveda',
    savedBody: 'Tu gestor de contraseñas cifra y guarda tus datos de acceso. Ahora puedes copiarla fácilmente cuando necesites iniciar sesión.',
    username: 'Usuario: user@example.com',
    passwordLabel: 'Contraseña:',
    show: 'Mostrar', hide: 'Ocultar',
    finish: 'Terminar Lección',
  },
};

const PasswordManagerSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (!password) return { score: 0, label: '', bar: 'bg-gray-700', text: 'text-gray-400' };
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score < 3) return { score, label: c.weak, bar: 'bg-red-500', text: 'text-red-400' };
    if (score < 5) return { score, label: c.medium, bar: 'bg-yellow-500', text: 'text-yellow-400' };
    return { score, label: c.strong, bar: 'bg-brand-secondary', text: 'text-brand-secondary' };
  }, [password, c]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    // Use the browser's cryptographically secure generator, as a real password manager does
    const values = new Uint32Array(16);
    crypto.getRandomValues(values);
    let next = Array.from(values, v => chars[v % chars.length]).join('');
    // guarantee every character class so the sim always rates it Strong
    if (!/[A-Z]/.test(next) || !/[0-9]/.test(next) || !/[^A-Za-z0-9]/.test(next)) next = 'Aa1!' + next.slice(4);
    setPassword(next);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.whyTitle}</h3>
            <p className="text-brand-text-secondary mb-6">{c.whyBody}</p>
            <Button onClick={() => setStep(2)}>{c.tryIt}</Button>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{c.createTitle}</h3>
            <p className="text-brand-text-secondary mb-6 text-center">{c.createDesc}</p>
            <div className="mb-4">
              <label htmlFor="pm-pass" className="block text-sm font-medium text-brand-text-secondary mb-1">{c.password}</label>
              <input id="pm-pass" type="text" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary" />
              <p className="text-xs text-brand-text-secondary mt-1">{c.hint}</p>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full transition-all duration-300 ${strength.bar}`} style={{ width: `${(strength.score / 5) * 100}%` }}></div>
              </div>
              <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generatePassword}>{c.generate}</Button>
              <Button onClick={() => setStep(3)} disabled={strength.score < 5} variant="secondary">
                {strength.score < 5 ? c.tooWeak : c.save}
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in text-center">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.savedTitle}</h3>
            <p className="text-brand-text-secondary mb-6">{c.savedBody}</p>
            <Card className="p-4 bg-brand-bg/50 max-w-md mx-auto text-left">
              <h4 className="font-bold text-white text-lg">CryptoX</h4>
              <p className="text-sm text-brand-text-secondary">{c.username}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-brand-text-secondary">{c.passwordLabel}</p>
                <div className="flex items-center gap-2 bg-brand-bg p-2 rounded-md">
                  <span className="font-mono">{isPasswordVisible ? password : '••••••••••••••••'}</span>
                  <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="text-brand-primary">
                    {isPasswordVisible ? c.hide : c.show}
                  </button>
                </div>
              </div>
            </Card>
            <Button onClick={onComplete} variant="secondary" className="mt-8">{c.finish}</Button>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">{c.intro}</p>
      {renderContent()}
    </Card>
  );
};

export default PasswordManagerSim;
