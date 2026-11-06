import React, { useState, useEffect, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon, QrCodeIcon } from '../icons/Icons';
import { useSimText } from './useSimText';

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const COPY = {
  en: {
    title: 'Two-Factor Authentication (2FA)',
    intro: "Learn how to add a crucial layer of security to all your online accounts, especially for crypto exchanges. This simulation guides you through setting up and using time-based Two-Factor Authentication (2FA) with an authenticator app. You'll also learn the importance of safely backing up your recovery codes.",
    whatTitle: 'What is Two-Factor Authentication (2FA)?',
    whatBody: '2FA adds a second layer of security to your accounts. After entering your password, you\'ll need to provide a second "factor"—usually a temporary 6-digit code from an app on your phone. This means even if someone steals your password, they can\'t access your account without your phone.',
    start: 'Start 2FA Setup',
    s1: 'Step 1: Scan the QR Code',
    s1Body: 'In a real app, you would use an authenticator app (like Google Authenticator or Authy) to scan this QR code. This links the account to your app.',
    s1Note: "If you can't scan, you can usually enter a secret key manually.",
    cont: 'Continue',
    s2: 'Step 2: Verify Your Authenticator',
    s2Body: 'Enter the 6-digit code from your (simulated) authenticator app to confirm the setup.',
    authApp: 'Authenticator App',
    placeholder: 'Enter 6-digit code',
    enable: 'Enable 2FA',
    wrongCode: 'Incorrect code. Please try again.',
    s3: 'Step 3: Save Your Backup Codes',
    s3Body: 'If you lose your phone, these one-time codes are the ONLY way to get back into your account. Store them somewhere safe and offline, like on paper.',
    critical: 'CRITICAL STEP:',
    saved: "I've Saved My Codes",
    s4: 'Step 4: Practice Logging In',
    s4Body: "Now, let's try logging in with your new 2FA protection enabled.",
    login: 'CryptoX Login',
    password: 'Password',
    code2fa: '2FA Code',
    loginBtn: 'Login',
    wrong2fa: 'Incorrect 2FA code.',
    doneTitle: '2FA Enabled & Verified!',
    doneBody: "You've successfully set up and used 2FA. Your account is now significantly more secure.",
    finish: 'Finish Lesson',
  },
  es: {
    title: 'Autenticación de Dos Factores (2FA)',
    intro: 'Aprende a añadir una capa de seguridad crucial a todas tus cuentas en línea, especialmente en los exchanges de cripto. Esta simulación te guía para configurar y usar la autenticación de dos factores (2FA) basada en tiempo con una app autenticadora. También aprenderás la importancia de respaldar tus códigos de recuperación de forma segura.',
    whatTitle: '¿Qué es la Autenticación de Dos Factores (2FA)?',
    whatBody: 'La 2FA añade una segunda capa de seguridad a tus cuentas. Después de escribir tu contraseña, deberás dar un segundo "factor": normalmente un código temporal de 6 dígitos de una app en tu teléfono. Así, aunque alguien robe tu contraseña, no podrá entrar a tu cuenta sin tu teléfono.',
    start: 'Iniciar Configuración de 2FA',
    s1: 'Paso 1: Escanea el Código QR',
    s1Body: 'En una app real, usarías una app autenticadora (como Google Authenticator o Authy) para escanear este código QR. Así vinculas la cuenta a tu app.',
    s1Note: 'Si no puedes escanear, normalmente puedes escribir una clave secreta manualmente.',
    cont: 'Continuar',
    s2: 'Paso 2: Verifica tu Autenticador',
    s2Body: 'Escribe el código de 6 dígitos de tu app autenticadora (simulada) para confirmar la configuración.',
    authApp: 'App Autenticadora',
    placeholder: 'Escribe el código de 6 dígitos',
    enable: 'Activar 2FA',
    wrongCode: 'Código incorrecto. Inténtalo de nuevo.',
    s3: 'Paso 3: Guarda tus Códigos de Respaldo',
    s3Body: 'Si pierdes tu teléfono, estos códigos de un solo uso son la ÚNICA forma de volver a entrar a tu cuenta. Guárdalos en un lugar seguro y sin conexión, como en papel.',
    critical: 'PASO CRÍTICO:',
    saved: 'Ya Guardé mis Códigos',
    s4: 'Paso 4: Practica Iniciar Sesión',
    s4Body: 'Ahora probemos iniciar sesión con tu nueva protección 2FA activada.',
    login: 'Inicio de Sesión en CryptoX',
    password: 'Contraseña',
    code2fa: 'Código 2FA',
    loginBtn: 'Iniciar Sesión',
    wrong2fa: 'Código 2FA incorrecto.',
    doneTitle: '¡2FA Activada y Verificada!',
    doneBody: 'Configuraste y usaste 2FA con éxito. Tu cuenta ahora es mucho más segura.',
    finish: 'Terminar Lección',
  },
};

const TwoFactorAuthSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [step, setStep] = useState(1);
  const [authCode, setAuthCode] = useState(generateCode());
  const [countdown, setCountdown] = useState(15);
  const [userInputCode, setUserInputCode] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState<'' | 'verify' | 'login'>('');

  const backupCodes = useMemo(() => Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 10).toUpperCase()), []);

  useEffect(() => {
    if (step === 3 || step === 5) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            setAuthCode(generateCode());
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleVerify = () => {
    if (userInputCode === authCode) { setError(''); setStep(4); } else { setError('verify'); }
  };
  const handleLogin = () => {
    if (loginCode === authCode) { setError(''); setStep(6); } else { setError('login'); }
  };

  const codeDisplay = <p className="text-4xl font-mono tracking-widest text-brand-primary text-center my-2">{authCode.slice(0, 3)} {authCode.slice(3, 6)}</p>;

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.whatTitle}</h3>
            <p className="text-brand-text-secondary mb-6">{c.whatBody}</p>
            <Button onClick={() => setStep(2)}>{c.start}</Button>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.s1}</h3>
            <p className="text-brand-text-secondary mb-6">{c.s1Body}</p>
            <div className="bg-white p-4 inline-block rounded-lg mb-4"><QrCodeIcon className="h-32 w-32 text-black" /></div>
            <p className="text-brand-text-secondary text-sm mb-6">{c.s1Note}</p>
            <Button onClick={() => setStep(3)}>{c.cont}</Button>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{c.s2}</h3>
            <p className="text-brand-text-secondary mb-6 text-center">{c.s2Body}</p>
            <Card className="p-4 bg-brand-bg/50 max-w-sm mx-auto mb-4">
              <h4 className="text-white font-bold text-center">{c.authApp}</h4>
              {codeDisplay}
              <div className="w-full bg-gray-600 rounded-full h-1.5"><div className="bg-brand-primary h-1.5 rounded-full" style={{ width: `${(countdown / 15) * 100}%` }}></div></div>
            </Card>
            <div className="max-w-sm mx-auto">
              <input type="text" inputMode="numeric" value={userInputCode} onChange={e => setUserInputCode(e.target.value)} maxLength={6} placeholder={c.placeholder}
                className="w-full text-center text-2xl tracking-widest bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary font-mono" />
              {error === 'verify' && <p className="text-red-500 text-center mt-2 font-bold">{c.wrongCode}</p>}
              <Button onClick={handleVerify} className="w-full mt-4">{c.enable}</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{c.s3}</h3>
            <p className="text-brand-text-secondary mb-6"><strong>{c.critical}</strong> {c.s3Body}</p>
            <Card className="p-6 bg-brand-bg/50"><div className="grid grid-cols-2 gap-4 font-mono text-brand-text">{backupCodes.map(code => <p key={code}>{code}</p>)}</div></Card>
            <Button onClick={() => setStep(5)} className="mt-6">{c.saved}</Button>
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{c.s4}</h3>
            <p className="text-brand-text-secondary mb-6 text-center">{c.s4Body}</p>
            <Card className="p-6 bg-brand-bg/50 max-w-sm mx-auto mb-4">
              <h4 className="text-white font-bold text-center">{c.authApp}</h4>
              {codeDisplay}
            </Card>
            <Card className="p-6 bg-brand-surface max-w-sm mx-auto">
              <h4 className="font-bold text-white text-lg text-center mb-4">{c.login}</h4>
              <div className="mb-4">
                <label className="block text-sm">{c.password}</label>
                <input type="password" value="••••••••••••" readOnly className="w-full bg-brand-bg p-2 rounded-md border border-gray-600" />
              </div>
              <div>
                <label className="block text-sm">{c.code2fa}</label>
                <input type="text" inputMode="numeric" value={loginCode} onChange={e => setLoginCode(e.target.value)} maxLength={6} className="w-full bg-brand-bg p-2 rounded-md border border-gray-600 font-mono" />
              </div>
              {error === 'login' && <p className="text-red-500 text-center mt-2 text-sm font-bold">{c.wrong2fa}</p>}
              <Button onClick={handleLogin} className="w-full mt-4">{c.loginBtn}</Button>
            </Card>
          </div>
        );
      case 6:
        return (
          <div className="text-center animate-fade-in">
            <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-secondary mb-2">{c.doneTitle}</h3>
            <p className="text-brand-text-secondary mb-6">{c.doneBody}</p>
            <Button onClick={onComplete} variant="secondary">{c.finish}</Button>
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

export default TwoFactorAuthSim;
