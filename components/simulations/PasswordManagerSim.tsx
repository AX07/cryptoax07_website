import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const PasswordManagerSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-gray-700' };

    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score < 3) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score < 5) return { score, label: 'Medium', color: 'bg-yellow-500' };
    return { score, label: 'Strong', color: 'bg-brand-secondary' };
  };

  const strength = useMemo(() => calculateStrength(password), [password]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let newPassword = '';
    for (let i = 0; i < 16; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Why Use a Password Manager?</h3>
            <p className="text-brand-text-secondary mb-6">
              Using the same password everywhere is a huge security risk. If one site is breached, all your accounts are vulnerable. A password manager creates and stores strong, unique passwords for every site, so you only have to remember one master password.
            </p>
            <Button onClick={() => setStep(2)}>Let's Try It</Button>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Create a Secure Password</h3>
            <p className="text-brand-text-secondary mb-6 text-center">Let's create a password for a mock exchange, "CryptoX".</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(strength.score / 5) * 100}%` }}
                ></div>
              </div>
              <span className="font-semibold" style={{ color: strength.color.replace('bg-', '') }}>{strength.label}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generatePassword}>Generate Strong Password</Button>
              <Button onClick={() => setStep(3)} disabled={strength.score < 5} variant="secondary">
                {strength.score < 5 ? 'Password too weak' : 'Save to Vault'}
              </Button>
            </div>
          </div>
        );
        case 3:
            return (
              <div className="animate-fade-in text-center">
                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Saved to Your Vault</h3>
                <p className="text-brand-text-secondary mb-6">Your password manager encrypts and stores your login details. You can now easily copy it when you need to log in.</p>
                
                <Card className="p-4 bg-brand-bg/50 max-w-md mx-auto text-left">
                    <h4 className="font-bold text-white text-lg">CryptoX</h4>
                    <p className="text-sm text-brand-text-secondary">Username: user@example.com</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-brand-text-secondary">Password:</p>
                        <div className="flex items-center gap-2 bg-brand-bg p-2 rounded-md">
                            <span className="font-mono">{isPasswordVisible ? password : '••••••••••••••••'}</span>
                            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="text-brand-primary">
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </Card>
                
                <Button onClick={onComplete} variant="secondary" className="mt-8">
                  Finish Lesson
                </Button>
              </div>
            );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Password Manager Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Your first line of defense in crypto—and online in general—is a strong, unique password for every account. Reusing passwords is a major security risk. This simulation demonstrates how password managers help you create, store, and manage these complex passwords securely, so you only have to remember one master password.
      </p>
      {renderContent()}
    </Card>
  );
};

export default PasswordManagerSim;