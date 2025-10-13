import React, { useState, useRef, useEffect } from 'react';
import { askAi } from '../services/geminiService';
import { GET_CATEGORIES } from '../constants';
import type { AiResponse } from '../types';
import GeneratedExample from './GeneratedExample';
import { ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, XMarkIcon } from './icons/Icons';
import Button from './ui/Button';
import { useLanguage } from '../hooks/useLanguage';

interface Message {
  role: 'user' | 'model';
  content: string | AiResponse;
}

interface AiChatbotProps {
  onSelectSimulation: (simulationId: string) => void;
}

const AiChatbot: React.FC<AiChatbotProps> = ({ onSelectSimulation }) => {
  const { t } = useLanguage();
  const CATEGORIES = GET_CATEGORIES(t);

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: { type: 'answer', text: t('aiChatbot.greeting') } }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const response = await askAi(userInput, CATEGORIES, t);
    setMessages([...newMessages, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  }

  const renderMessageContent = (message: Message) => {
    if (message.role === 'user') {
      return <div>{message.content as string}</div>;
    }

    const aiContent = message.content as AiResponse;
    switch (aiContent.type) {
      case 'answer':
        return <div>{aiContent.text}</div>;
      case 'recommendation':
        return (
          <div>
            <p>{aiContent.text}</p>
            <Button 
              onClick={() => {
                onSelectSimulation(aiContent.simulationId);
                handleClose();
              }}
              className="mt-3 w-full"
              variant="secondary"
            >
              {t('aiChatbot.trySimulation')}
            </Button>
          </div>
        );
      case 'generated_example':
        return (
          <div>
            <p>{aiContent.text}</p>
            <GeneratedExample steps={aiContent.steps} />
          </div>
        );
      default:
        const contentAsAny = aiContent as any;
        if (contentAsAny && typeof contentAsAny.text === 'string') {
          return <div>{contentAsAny.text}</div>;
        }
        return <div>Sorry, something went wrong.</div>;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-sky-400 transition-transform duration-200 hover:scale-110 z-[100]"
        aria-label="Open AI Chatbot"
      >
        <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-brand-bg" />
      </button>

      {isOpen && (
        <>
        {isExpanded && <div onClick={() => setIsExpanded(false)} className="fixed inset-0 bg-black/60 z-[50] animate-fade-in-fast"></div>}
        <div 
           className={`
            z-50 flex flex-col bg-brand-surface rounded-2xl shadow-2xl border border-gray-700
            transition-all duration-300 ease-in-out
            ${isExpanded 
              ? 'fixed top-1/2 left-1/2 w-[95vw] max-w-4xl h-[85vh] -translate-x-1/2 -translate-y-1/2' 
              : 'fixed bottom-24 right-6 w-full max-w-sm h-[60vh]'}
          `}
        >
          <header className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
            <h3 className="text-lg font-bold text-white">{t('aiChatbot.assistant')}</h3>
            <button onClick={handleClose} className="text-brand-text-secondary hover:text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </header>

          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl px-4 py-2 max-w-xs lg:max-w-md ${msg.role === 'user' ? 'bg-brand-primary text-brand-bg' : 'bg-gray-700 text-brand-text'}`}>
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start mb-4">
                 <div className="rounded-xl px-4 py-2 bg-gray-700 text-brand-text">
                   <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-brand-primary rounded-full animate-bounce"></span>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex-shrink-0">
            <div className="flex items-center bg-brand-bg rounded-lg">
              <input
                type="text"
                value={userInput}
                onFocus={() => setIsExpanded(true)}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t('aiChatbot.placeholder')}
                className="w-full bg-transparent p-3 focus:outline-none text-brand-text"
                disabled={isLoading}
              />
              <button type="submit" className="p-3 text-brand-primary disabled:text-gray-500" disabled={isLoading || !userInput.trim()}>
                <PaperAirplaneIcon className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
        </>
      )}
    </>
  );
};

export default React.memo(AiChatbot);