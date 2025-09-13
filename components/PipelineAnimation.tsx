
import React from 'react';
import type { ScrapingStatus } from '../types';
import { CheckIcon, LoaderIcon, ProcessingIcon, SearchIcon } from './Icons';

interface PipelineAnimationProps {
  status: ScrapingStatus;
}

interface Stage {
  key: ScrapingStatus;
  label: string;
}

const STAGES: Stage[] = [
  { key: 'fetching', label: 'Connecting to URL' },
  { key: 'analyzing', label: 'Analyzing Content' },
  { key: 'generating', label: 'Generating Report' },
];

const STAGE_ICONS: Record<ScrapingStatus, React.FC<{className: string}>> = {
  idle: LoaderIcon,
  fetching: SearchIcon,
  analyzing: ProcessingIcon,
  generating: LoaderIcon,
  done: CheckIcon,
}

export const PipelineAnimation: React.FC<PipelineAnimationProps> = ({ status }) => {
  const currentStageIndex = STAGES.findIndex(s => s.key === status);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">Processing Request...</h2>
       <div className="w-full space-y-4">
        {STAGES.map((stage, index) => {
          const isCompleted = currentStageIndex > index;
          const isCurrent = currentStageIndex === index;
          
          let Icon;
          let iconClass = 'w-5 h-5 transition-all duration-300 ';

          if(isCompleted) {
              Icon = CheckIcon;
              iconClass += 'text-green-500';
          } else if(isCurrent) {
              Icon = STAGE_ICONS[stage.key] || LoaderIcon;
              iconClass += 'text-gray-800 dark:text-gray-200 animate-spin';
          } else {
              Icon = LoaderIcon;
              iconClass += 'text-gray-400 dark:text-gray-500';
          }

          return (
            <div key={stage.key} className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted || isCurrent ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
                <Icon className={iconClass} />
              </div>
              <p className={`transition-all duration-300 ${isCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : isCurrent ? 'text-gray-900 dark:text-gray-100 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};