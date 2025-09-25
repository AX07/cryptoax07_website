import React, { useState, useEffect, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon, QrCodeIcon } from '../icons/Icons';

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const TwoFactorAuthSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [authCode, setAuthCode] = useState(generateCode());
  const [countdown, setCountdown] = useState(15);
  const [userInputCode, setUserInputCode] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState('');

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
    if (userInputCode === authCode) {
      setError('');
      setStep(4);
    } else {
      setError('Incorrect code. Please try again.');
    }
  };
  
  const handleLogin = () => {
      if (loginCode === authCode) {
          setError('');
          setStep(6); // Success
      } else {
          setError('Incorrect 2FA code.');
      }
  }

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">What is Two-Factor Authentication (2FA)?</h3>
            <p className="text-brand-text-secondary mb-6">
              2FA adds a second layer of security to your accounts. After entering your password, you'll need to provide a second "factor"—usually a temporary 6-digit code from an app on your phone. This means even if someone steals your password, they can't access your account without your phone.
            </p>
            <Button onClick={() => setStep(2)}>Start 2FA Setup</Button>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 1: Scan the QR Code</h3>
            <p className="text-brand-text-secondary mb-6">In a real app, you would use an authenticator app (like Google Authenticator or Authy) to scan this QR code. This links the account to your app.</p>
            <div className="bg-white p-4 inline-block rounded-lg mb-4">
              <QrCodeIcon className="h-32 w-32 text-black" />
            </div>
            <p className="text-brand-text-secondary text-sm mb-6">If you can't scan, you can usually enter a secret key manually.</p>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Step 2: Verify Your Authenticator</h3>
            <p className="text-brand-text-secondary mb-6 text-center">Enter the 6-digit code from your (simulated) authenticator app to confirm the setup.</p>
            <Card className="p-4 bg-brand-bg/50 max-w-sm mx-auto mb-4">
              <h4 className="text-white font-bold text-center">Authenticator App</h4>
              <p className="text-4xl font-mono tracking-widest text-brand-primary text-center my-2">{authCode.slice(0, 3)} {authCode.slice(3, 6)}</p>
              <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div className="bg-brand-primary h-1.5 rounded-full" style={{ width: `${(countdown/15)*100}%`}}></div>
              </div>
            </Card>
            <div className="max-w-sm mx-auto">
              <input 
                type="text" 
                value={userInputCode}
                onChange={e => setUserInputCode(e.target.value)}
                maxLength={6}
                placeholder="Enter 6-digit code"
                className="w-full text-center text-2xl tracking-widest bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary font-mono"
              />
              {error && <p className="text-red-500 text-center mt-2 font-bold">{error}</p>}
              <Button onClick={handleVerify} className="w-full mt-4">Enable 2FA</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 3: Save Your Backup Codes</h3>
            <p className="text-brand-text-secondary mb-6"><strong>CRITICAL STEP:</strong> If you lose your phone, these one-time codes are the ONLY way to get back into your account. Store them somewhere safe and offline, like on paper.</p>
            <Card className="p-6 bg-brand-bg/50">
              <div className="grid grid-cols-2 gap-4 font-mono text-brand-text">
                {backupCodes.map(code => <p key={code}>{code}</p>)}
              </div>
            </Card>
            <Button onClick={() => setStep(5)} className="mt-6">I've Saved My Codes</Button>
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Step 4: Practice Logging In</h3>
            <p className="text-brand-text-secondary mb-6 text-center">Now, let's try logging in with your new 2FA protection enabled.</p>
             <Card className="p-6 bg-brand-bg/50 max-w-sm mx-auto mb-4">
              <h4 className="text-white font-bold text-center">Authenticator App</h4>
              <p className="text-4xl font-mono tracking-widest text-brand-primary text-center my-2">{authCode.slice(0, 3)} {authCode.slice(3, 6)}</p>
            </Card>
            <Card className="p-6 bg-brand-surface max-w-sm mx-auto">
                <h4 className="font-bold text-white text-lg text-center mb-4">CryptoX Login</h4>
                <div className="mb-4">
                    <label className="block text-sm">Password</label>
                    <input type="password" value="••••••••••••" readOnly className="w-full bg-brand-bg p-2 rounded-md border border-gray-600"/>
                </div>
                <div>
                    <label className="block text-sm">2FA Code</label>
                    <input 
                        type="text" 
                        value={loginCode}
                        onChange={e => setLoginCode(e.target.value)}
                        maxLength={6}
                        className="w-full bg-brand-bg p-2 rounded-md border border-gray-600 font-mono"
                    />
                </div>
                {error && <p className="text-red-500 text-center mt-2 text-sm font-bold">{error}</p>}
                <Button onClick={handleLogin} className="w-full mt-4">Login</Button>
            </Card>
          </div>
        );
      case 6:
        return (
          <div className="text-center animate-fade-in">
            <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-secondary mb-2">2FA Enabled & Verified!</h3>
            <p className="text-brand-text-secondary mb-6">You've successfully set up and used 2FA. Your account is now significantly more secure.</p>
            <Button onClick={onComplete} variant="secondary">Finish Lesson</Button>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Two-Factor Authentication (2FA)</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Learn how to add a crucial layer of security to all your online accounts, especially for crypto exchanges. This simulation guides you through setting up and using time-based Two-Factor Authentication (2FA) with an authenticator app. You'll also learn the importance of safely backing up your recovery codes.
      </p>
      {renderContent()}
    </Card>
  );
};

export default TwoFactorAuthSim;