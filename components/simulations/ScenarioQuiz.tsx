import React, { useState } from 'react';
import Button from '../ui/Button';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

export interface ScenarioOption { label: string; correct: boolean; why: string }
export interface Scenario { q: string; options: ScenarioOption[]; tip: string }

interface ScenarioQuizProps {
    scenarios: Scenario[];
    /** Called once every scenario has been answered correctly and the user finishes the lesson. */
    onDone: () => void;
}

/**
 * Real-world decision scenarios: the learner picks an option and gets the consequence immediately.
 * Wrong picks explain why and allow a retry, so the lesson is only completed by making the right calls.
 */
const ScenarioQuiz: React.FC<ScenarioQuizProps> = ({ scenarios, onDone }) => {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);

    const scenario = scenarios[index];
    const isLast = index === scenarios.length - 1;
    const pickedOption = picked !== null ? scenario.options[picked] : null;
    const solved = !!pickedOption?.correct;

    const next = () => {
        if (isLast) {
            setFinished(true);
            onDone();
        } else {
            setIndex(i => i + 1);
            setPicked(null);
        }
    };

    if (finished) {
        return (
            <div className="text-center animate-fade-in py-6">
                <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-secondary">{t('simsV2.common.allDone')}</h3>
                <p className="mt-2 text-brand-text-secondary">{t('simsV2.common.allDoneDesc')}</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" key={index}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                    {t('simsV2.common.missionOf', { n: index + 1, total: scenarios.length })}
                </span>
                <div className="flex gap-1.5" aria-hidden="true">
                    {scenarios.map((_, i) => (
                        <span key={i} className={`h-1.5 w-8 rounded-full ${i < index ? 'bg-brand-secondary' : i === index ? 'bg-brand-primary' : 'bg-gray-700'}`} />
                    ))}
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-5">{scenario.q}</h3>

            <div className="space-y-3">
                {scenario.options.map((opt, i) => {
                    const isPicked = picked === i;
                    const state = !isPicked ? 'idle' : opt.correct ? 'right' : 'wrong';
                    return (
                        <button
                            key={i}
                            disabled={solved}
                            onClick={() => setPicked(i)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 disabled:cursor-default ${
                                state === 'right' ? 'border-brand-secondary bg-brand-secondary/10'
                                : state === 'wrong' ? 'border-red-500 bg-red-500/10'
                                : 'border-gray-700 bg-brand-bg/40 hover:border-brand-primary/60'
                            } ${solved && !isPicked ? 'opacity-40' : ''}`}
                        >
                            <span className="text-white">{opt.label}</span>
                        </button>
                    );
                })}
            </div>

            {pickedOption && (
                <div className={`mt-5 p-4 rounded-xl border animate-fade-in ${solved ? 'border-brand-secondary/50 bg-brand-secondary/10' : 'border-red-500/50 bg-red-500/10'}`} role="status">
                    <div className="flex items-start gap-3">
                        {solved
                            ? <CheckCircleIcon className="h-6 w-6 text-brand-secondary flex-shrink-0" />
                            : <XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0" />}
                        <div>
                            <p className="font-bold text-white">{solved ? t('simsV2.common.correct') : t('simsV2.common.notQuite')}</p>
                            <p className="text-sm text-brand-text-secondary mt-1">{pickedOption.why}</p>
                            {solved && (
                                <p className="text-sm text-brand-orange mt-3 flex items-start gap-2">
                                    <LightBulbIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span><strong>{t('simsV2.common.tip')}:</strong> {scenario.tip}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        {solved
                            ? <Button onClick={next} variant="secondary">{isLast ? t('simsV2.common.finish') : t('simsV2.common.next')}</Button>
                            : <Button onClick={() => setPicked(null)} variant="primary">{t('simsV2.common.tryAgain')}</Button>}
                    </div>
                </div>
            )}

            <p className="mt-4 text-xs text-brand-text-secondary text-center">{t('simsV2.common.retries')}</p>
        </div>
    );
};

export default ScenarioQuiz;
