import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon, DocumentTextIcon } from '../icons/Icons';

type LivenessDirection = 'center' | 'left' | 'right' | 'up' | 'down' | 'done';

const KycSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [idDocType, setIdDocType] = useState('passport');
  const [addressDocType, setAddressDocType] = useState('utility_bill');
  const [idUploaded, setIdUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);
  
  const [livenessDirection, setLivenessDirection] = useState<LivenessDirection>('center');
  const [livenessInstruction, setLivenessInstruction] = useState('Look straight ahead');

  useEffect(() => {
    // This effect runs the liveliness check animation sequence
    if (step === 3 && livenessDirection !== 'done') {
      const sequence: { dir: LivenessDirection; text: string; delay: number }[] = [
        { dir: 'center', text: 'Look straight ahead', delay: 2000 },
        { dir: 'left', text: 'Slowly turn your head left', delay: 2000 },
        { dir: 'right', text: 'Now turn your head right', delay: 2000 },
        { dir: 'up', text: 'Look up', delay: 2000 },
        { dir: 'down', text: 'Look down', delay: 2000 },
        { dir: 'center', text: 'Great!', delay: 1000 },
        { dir: 'done', text: 'Liveliness check complete!', delay: 0 },
      ];

      let currentIndex = 0;
      const runSequence = () => {
        if (currentIndex < sequence.length) {
            setLivenessDirection(sequence[currentIndex].dir);
            setLivenessInstruction(sequence[currentIndex].text);
            const nextDelay = sequence[currentIndex].delay;
            currentIndex++;
            setTimeout(runSequence, nextDelay);
        } else {
            setTimeout(() => setStep(4), 1500); // Move to next step after completion
        }
      };
      
      // Start the sequence
      const timer = setTimeout(runSequence, 1000);

      // Cleanup function to prevent running on unmount
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  const getMockIdImageSrc = () => {
      // Using data URLs for simple, dependency-free mock images
      const text = idDocType.replace('_', ' ').toUpperCase();
      return `data:image/svg+xml;charset=UTF-8,%3csvg width='300' height='190' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%232d3748'/%3e%3ctext x='50%25' y='50%25' font-family='monospace' font-size='18' fill='%23e2e8f0' text-anchor='middle' dominant-baseline='middle'%3eMOCK ${text}%3c/text%3e%3c/svg%3e`;
  };

  const getMockAddressImageSrc = () => {
      const text = addressDocType.replace('_', ' ').toUpperCase();
      return `data:image/svg+xml;charset=UTF-8,%3csvg width='300' height='400' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='%232d3748'/%3e%3ctext x='50%25' y='20' font-family='monospace' font-size='16' fill='%23e2e8f0' text-anchor='middle'%3e${text}%3c/text%3e%3ctext x='20' y='60' font-family='monospace' font-size='12' fill='%23e2e8f0'%3eJohn Doe%3c/text%3e%3ctext x='20' y='80' font-family='monospace' font-size='12' fill='%23e2e8f0'%3e123 Crypto Lane%3c/text%3e%3ctext x='20' y='100' font-family='monospace' font-size='12' fill='%23e2e8f0'%3eBlockchain City, 1337%3c/text%3e%3ctext x='20' y='140' font-family='monospace' font-size='12' fill='%23e2e8f0'%3eDate: ${new Date().toLocaleDateString()}%3c/text%3e%3c/svg%3e`;
  }

  const handleFinalSubmit = () => {
    setStep(6); // processing
    setTimeout(() => {
        setStep(7); // success
    }, 2500);
  };
  
  const renderContent = () => {
    switch(step) {
      case 1: // Select ID Document
        return (
          <div className="animate-fade-in text-center">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 1: Select Your Identity Document</h3>
            <div className="space-y-4 mb-6 text-left">
              <label className={`block p-4 border rounded-lg cursor-pointer ${idDocType === 'passport' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-700'}`}>
                <input type="radio" name="idDocType" value="passport" checked={idDocType === 'passport'} onChange={e => setIdDocType(e.target.value)} className="hidden"/>
                <span className="font-bold text-white">Passport</span>
              </label>
              <label className={`block p-4 border rounded-lg cursor-pointer ${idDocType === 'drivers_license' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-700'}`}>
                <input type="radio" name="idDocType" value="drivers_license" checked={idDocType === 'drivers_license'} onChange={e => setIdDocType(e.target.value)} className="hidden"/>
                <span className="font-bold text-white">Driver's License</span>
              </label>
              <label className={`block p-4 border rounded-lg cursor-pointer ${idDocType === 'id_card' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-700'}`}>
                <input type="radio" name="idDocType" value="id_card" checked={idDocType === 'id_card'} onChange={e => setIdDocType(e.target.value)} className="hidden"/>
                <span className="font-bold text-white">Identity Card</span>
              </label>
            </div>
            <Button onClick={() => setStep(2)} className="w-full">Continue</Button>
          </div>
        );
        case 2: // Upload ID Document (Mock)
        return (
            <div className="animate-fade-in text-center">
                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 2: Upload Your Document</h3>
                <p className="text-brand-text-secondary mb-4">In a real scenario, you would upload a file. Here, we'll use a mock document.</p>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 bg-brand-bg min-h-[250px] flex items-center justify-center">
                    {idUploaded ? (
                        <img src={getMockIdImageSrc()} alt={`Mock ${idDocType}`} className="mx-auto rounded-md animate-fade-in"/>
                    ) : (
                        <Button onClick={() => setIdUploaded(true)}>
                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                            Select Mock {idDocType.replace('_', ' ')}
                        </Button>
                    )}
                </div>
                {idUploaded && (
                     <Button onClick={() => setStep(3)} className="w-full animate-fade-in">Confirm & Continue</Button>
                )}
                 <button onClick={() => { setStep(1); setIdUploaded(false); }} className="text-brand-text-secondary hover:text-white text-sm mt-4 w-full text-center">Back</button>
            </div>
        );
      case 3: // Liveliness Check
        const headPosition = {
            'center': 'translate-x-0 translate-y-0',
            'left': '-translate-x-4',
            'right': 'translate-x-4',
            'up': '-translate-y-2',
            'down': 'translate-y-2',
            'done': 'translate-x-0 translate-y-0'
        }[livenessDirection];
        
        return (
          <div className="animate-fade-in text-center">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 3: Liveliness Check</h3>
            <p className="text-brand-text-secondary mb-6">Follow the instructions to complete the selfie verification.</p>
            <div className="w-48 h-64 mx-auto border-4 border-brand-primary rounded-full flex items-center justify-center bg-brand-bg/50 overflow-hidden mb-4">
                <div className={`w-24 h-36 bg-gray-500 rounded-t-full transition-transform duration-500 ${headPosition}`}>
                    <div className="relative w-full h-full">
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-400"></div>
                        <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-400"></div>
                    </div>
                </div>
            </div>
            <p className="text-lg font-semibold text-white h-8">{livenessInstruction}</p>
          </div>
        );
      case 4: // Select Proof of Address
        return (
            <div className="animate-fade-in text-center">
              <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 4: Proof of Address</h3>
              <p className="text-brand-text-secondary mb-4">Select a document. It must show your name, address, and be dated within 3 months.</p>
              <div className="space-y-4 mb-6 text-left">
                <label className={`block p-4 border rounded-lg cursor-pointer ${addressDocType === 'utility_bill' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-700'}`}>
                  <input type="radio" name="addressDocType" value="utility_bill" checked={addressDocType === 'utility_bill'} onChange={e => setAddressDocType(e.target.value)} className="hidden"/>
                  <span className="font-bold text-white">Utility Bill</span>
                </label>
                <label className={`block p-4 border rounded-lg cursor-pointer ${addressDocType === 'bank_statement' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-700'}`}>
                  <input type="radio" name="addressDocType" value="bank_statement" checked={addressDocType === 'bank_statement'} onChange={e => setAddressDocType(e.target.value)} className="hidden"/>
                  <span className="font-bold text-white">Bank Statement</span>
                </label>
              </div>
              <Button onClick={() => setStep(5)} className="w-full">Continue</Button>
            </div>
        );
      case 5: // Upload Proof of Address (Mock)
        return (
            <div className="animate-fade-in text-center">
                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Step 5: Upload Proof of Address</h3>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 bg-brand-bg min-h-[250px] flex items-center justify-center">
                     {addressUploaded ? (
                        <img src={getMockAddressImageSrc()} alt={`Mock ${addressDocType}`} className="mx-auto rounded-md animate-fade-in"/>
                    ) : (
                        <Button onClick={() => setAddressUploaded(true)}>
                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                            Select Mock {addressDocType.replace('_', ' ')}
                        </Button>
                    )}
                </div>
                {addressUploaded && (
                    <Button onClick={handleFinalSubmit} className="w-full animate-fade-in">Submit for Verification</Button>
                )}
                <button onClick={() => { setStep(4); setAddressUploaded(false); }} className="text-brand-text-secondary hover:text-white text-sm mt-4 w-full text-center">Back</button>
            </div>
        );
      case 6: // Processing
        return (
            <div className="text-center animate-fade-in">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
               <p className="text-lg text-white font-semibold">Verifying your documents...</p>
               <p className="text-brand-text-secondary">This can take a moment in a real scenario.</p>
            </div>
        );
      case 7: // Success
        return (
            <div className="text-center animate-fade-in">
                <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-secondary mb-2">Verification Complete!</h3>
                <p className="text-brand-text-secondary mb-6">Your identity has been successfully verified. You now have full access to the platform.</p>
                <Button onClick={onComplete} variant="secondary">Finish Lesson</Button>
            </div>
        );
      default: return null;
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">KYC Verification Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        This simulation walks you through 'Know Your Customer' (KYC), a standard identity verification process required by most centralized exchanges. You will select mock documents and complete a simulated liveliness check to understand the steps involved without using your real personal information. This is essential for accessing full exchange features like fiat deposits and withdrawals.
      </p>
      {renderContent()}
    </Card>
  );
};

export default KycSim;