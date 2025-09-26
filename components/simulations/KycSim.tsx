import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon, DocumentTextIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

type LivenessDirection = 'center' | 'left' | 'right' | 'up' | 'down' | 'done';

const KycSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [idDocType, setIdDocType] = useState('passport');
  const [addressDocType, setAddressDocType] = useState('utility_bill');
  const [idUploaded, setIdUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);
  
  const [livenessDirection, setLivenessDirection] = useState<LivenessDirection>('center');
  const [livenessInstruction, setLivenessInstruction] = useState(t('simulations.kyc.lookStraight'));

  useEffect(() => {
    // This effect runs the liveliness check animation sequence
    if (step === 3 && livenessDirection !== 'done') {
      const sequence: { dir: LivenessDirection; text: string; delay: number }[] = [
        { dir: 'center', text: t('simulations.kyc.lookStraight'), delay: 2000 },
        { dir: 'left', text: t('simulations.kyc.turnLeft'), delay: 2000 },
        { dir: 'right', text: t('simulations.kyc.turnRight'), delay: 2000 },
        { dir: 'up', text: t('simulations.kyc.lookUp'), delay: 2000 },
        { dir: 'down', text: t('simulations.kyc.lookDown'), delay: 2000 },
        { dir: 'center', text: t('simulations.kyc.great'), delay: 1000 },
        { dir: 'done', text: t('simulations.kyc.livelinessComplete'), delay: 0 },
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
  }, [step, t]);
  
  // FIX: Added function implementations that were missing due to file truncation.
  const handleIdUpload = () => {
    setIdUploaded(true);
    setTimeout(() => {
        setStep(3);
    }, 1000);
  };
  
  const submitVerification = () => {
    setStep(6); // Processing
    setTimeout(() => {
        setStep(7); // Success
    }, 2500);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.kyc.step1Title')}</h3>
            <div className="flex justify-center gap-4 mb-6">
                <Button variant={idDocType === 'passport' ? 'primary' : 'accent'} onClick={() => setIdDocType('passport')}>{t('simulations.kyc.passport')}</Button>
                <Button variant={idDocType === 'driversLicense' ? 'primary' : 'accent'} onClick={() => setIdDocType('driversLicense')}>{t('simulations.kyc.driversLicense')}</Button>
                <Button variant={idDocType === 'idCard' ? 'primary' : 'accent'} onClick={() => setIdDocType('idCard')}>{t('simulations.kyc.idCard')}</Button>
            </div>
            <Button onClick={() => setStep(2)}>{t('continue')}</Button>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.kyc.step2Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.kyc.step2Desc')}</p>
            <Card className="p-6 bg-brand-bg/50 border-dashed border-2 border-gray-600">
                <DocumentTextIcon className="h-12 w-12 mx-auto text-brand-text-secondary mb-4" />
                <p className="font-semibold text-white">{idDocType === 'passport' ? t('simulations.kyc.passport') : idDocType === 'driversLicense' ? t('simulations.kyc.driversLicense') : t('simulations.kyc.idCard')}</p>
                <Button onClick={handleIdUpload} className="mt-4">{t('simulations.kyc.selectMock', { docType: idDocType })}</Button>
            </Card>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.kyc.step3Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.kyc.step3Desc')}</p>
            <div className="relative w-48 h-64 bg-brand-bg/50 rounded-lg mx-auto border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                <div className={`absolute border-4 border-brand-primary rounded-full transition-all duration-500 ${livenessDirection === 'center' ? 'w-40 h-52' : 'w-36 h-48'}`}></div>
                <p className="z-10 font-bold text-white bg-black/50 p-2 rounded">{livenessInstruction}</p>
            </div>
          </div>
        );
      case 4:
         return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.kyc.step4Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.kyc.step4Desc')}</p>
            <div className="flex justify-center gap-4 mb-6">
                <Button variant={addressDocType === 'utility_bill' ? 'primary' : 'accent'} onClick={() => setAddressDocType('utility_bill')}>{t('simulations.kyc.utilityBill')}</Button>
                <Button variant={addressDocType === 'bank_statement' ? 'primary' : 'accent'} onClick={() => setAddressDocType('bank_statement')}>{t('simulations.kyc.bankStatement')}</Button>
            </div>
            <Button onClick={() => setStep(5)}>{t('simulations.kyc.confirmContinue')}</Button>
          </div>
        );
      case 5:
        return (
            <div className="text-center animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.kyc.step5Title')}</h3>
                <p className="text-brand-text-secondary mb-6">{t('simulations.kyc.step2Desc')}</p>
                 <Card className="p-6 bg-brand-bg/50 border-dashed border-2 border-gray-600">
                    <DocumentTextIcon className="h-12 w-12 mx-auto text-brand-text-secondary mb-4" />
                    <p className="font-semibold text-white">{addressDocType === 'utility_bill' ? t('simulations.kyc.utilityBill') : t('simulations.kyc.bankStatement')}</p>
                 </Card>
                <Button onClick={submitVerification} className="mt-6">{t('simulations.kyc.submitVerification')}</Button>
            </div>
        );
      case 6:
        return (
            <div className="text-center animate-fade-in">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                <p className="text-lg text-white font-semibold">{t('simulations.kyc.processingTitle')}</p>
                <p className="text-brand-text-secondary">{t('simulations.kyc.processingDesc')}</p>
            </div>
        );
       case 7:
        return (
            <div className="text-center animate-fade-in">
                <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-secondary mb-2">{t('simulations.kyc.successTitle')}</h3>
                <p className="text-brand-text-secondary mb-6">{t('simulations.kyc.successDesc')}</p>
                <Button onClick={onComplete} variant="secondary">{t('finishLesson')}</Button>
            </div>
        );
      default:
        return null;
    }
  };

  // FIX: Added the return statement with JSX to fix the type error.
  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.kyc.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-lg mx-auto">
        {t('simulations.kyc.description')}
      </p>
      {renderContent()}
    </Card>
  );
};

// FIX: Added the default export to resolve the import error in App.tsx.
export default KycSim;
