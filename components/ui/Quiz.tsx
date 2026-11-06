import React, { useState } from 'react';
import type { QuizQuestion } from '../../types';
import Button from './Button';
import Card from './Card';
import { CheckCircleIcon, XCircleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { t } = useLanguage();

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = isAnswered && selectedAnswerIndex !== null ? currentQuestion.options[selectedAnswerIndex].isCorrect : false;

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    } else {
      onComplete();
    }
  };
  
  const handleTryAgain = () => {
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
  }

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'border-gray-600 hover:bg-brand-surface/80 hover:border-brand-primary';
    }
    if (index === selectedAnswerIndex) {
      return isCorrect ? 'border-brand-secondary bg-brand-secondary/20' : 'border-red-500 bg-red-500/20';
    }
    if (currentQuestion.options[index].isCorrect) {
        return 'border-brand-secondary bg-brand-secondary/20';
    }
    return 'border-gray-700 opacity-60';
  };

  return (
    <div className="mt-8 border-t border-gray-700 pt-6 animate-fade-in">
      <h3 className="text-xl font-bold text-center text-white mb-4">{t('knowledgeCheck')}</h3>
      <Card className="p-6 bg-brand-bg/50">
        <p className="text-lg font-semibold text-brand-text mb-4 text-center">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${getButtonClass(index)}`}
            >
              <span className="font-medium">{option.text}</span>
              {isAnswered && index === selectedAnswerIndex && (
                 isCorrect ? <CheckCircleIcon className="h-6 w-6 text-brand-secondary" /> : <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-4 text-center p-4 rounded-lg bg-brand-surface animate-fade-in">
            <h4 className={`font-bold text-lg ${isCorrect ? 'text-brand-secondary' : 'text-red-500'}`}>
              {isCorrect ? t('correct') : t('notQuite')}
            </h4>
            <p className="text-brand-text-secondary mt-1">{currentQuestion.explanation}</p>
            {isCorrect ? (
              <Button onClick={handleNext} variant="secondary" className="mt-4">
                {currentQuestionIndex < questions.length - 1 ? t('nextQuestion') : t('finishLesson')}
              </Button>
            ) : (
              <Button onClick={handleTryAgain} variant="accent" className="mt-4">
                {t('tryAgain')}
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
