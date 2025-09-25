import React, { useMemo } from 'react';
import type { CompletedSimulation } from '../../types';
import Card from './Card';

interface ContributionCalendarProps {
  completedSimulations: CompletedSimulation[];
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ completedSimulations }) => {
  const contributionsByDate = useMemo(() => {
    const map = new Map<string, number>();
    completedSimulations.forEach(sim => {
      const date = new Date(sim.completedAt);
      const key = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  }, [completedSimulations]);

  const { days, monthLabels } = useMemo(() => {
    const endDate = new Date();
    const daysToShow = 365;
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (daysToShow - 1));

    const dayCells = [];
    const monthLabels: { month: string; startColumn: number }[] = [];
    
    // Add placeholders to align the first day to the correct weekday column
    const startDayOfWeek = startDate.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
        dayCells.push({ date: null, count: 0 });
    }

    let currentMonth = -1;
    for (let i = 0; i < daysToShow; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        if (currentDate > endDate) break;

        const dateKey = currentDate.toISOString().split('T')[0];
        const count = contributionsByDate.get(dateKey) || 0;
        dayCells.push({ date: new Date(currentDate), count });

        const month = currentDate.getMonth();
        if (month !== currentMonth) {
            currentMonth = month;
            monthLabels.push({
                month: MONTH_NAMES[month],
                startColumn: Math.floor(dayCells.length / 7) + 1
            });
        }
    }
    
    return { days: dayCells, monthLabels };
  }, [contributionsByDate]);

  const getColor = (count: number) => {
    if (count <= 0) return 'bg-gray-700/50 hover:border-gray-600';
    if (count === 1) return 'bg-sky-800 hover:border-sky-600';
    if (count === 2) return 'bg-brand-primary hover:border-sky-300';
    return 'bg-brand-orange hover:border-orange-300';
  };

  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-xl font-bold text-white mb-4">Learning Activity</h3>
      <div className="overflow-x-auto">
        <div className="inline-block">
            <div className="grid grid-flow-col grid-rows-1 gap-x-[22px] text-xs text-brand-text-secondary mb-1">
                {monthLabels.map(({ month, startColumn }) => (
                    <div key={month} className="col-start-1" style={{ gridColumnStart: startColumn }}>{month}</div>
                ))}
            </div>
            <div className="flex gap-3">
                 <div className="grid grid-rows-7 gap-y-1.5 text-xs text-brand-text-secondary mt-[-2px] pr-2">
                    <span className="h-4"></span> {/* Spacer for top row */}
                    <span className="h-4">Mon</span>
                    <span className="h-4"></span>
                    <span className="h-4">Wed</span>
                    <span className="h-4"></span>
                    <span className="h-4">Fri</span>
                    <span className="h-4"></span>
                 </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                {days.map((day, index) => (
                    <div
                    key={day.date ? day.date.toISOString() : `empty-${index}`}
                    className={`w-4 h-4 rounded-sm border border-transparent transition-all duration-200 ${day.date ? getColor(day.count) : 'bg-transparent'}`}
                    title={day.date ? `${day.count} lesson${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString()}` : ''}
                    />
                ))}
                </div>
            </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-4 text-xs text-brand-text-secondary">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-700/50"></div>
        <div className="w-3 h-3 rounded-sm bg-sky-800"></div>
        <div className="w-3 h-3 rounded-sm bg-brand-primary"></div>
        <div className="w-3 h-3 rounded-sm bg-brand-orange"></div>
        <span>More</span>
      </div>
    </Card>
  );
};

export default ContributionCalendar;
