import React from 'react';
import { clsx } from 'clsx';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../Button/Button';

export type TrialBannerStatus = 'free_preview' | 'active_trial' | 'expired_trial';

export interface TrialBannerProps {
  status: TrialBannerStatus;
  daysRemaining?: number;
  onActionClick: () => void;
  className?: string;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({
  status,
  daysRemaining = 7,
  onActionClick,
  className,
}) => {
  return (
    <aside
      aria-label="Account Plan Status"
      className={clsx(
        'w-full py-2.5 px-4 sm:px-6 border-b-3 border-black dark:border-white select-none',
        'flex flex-col sm:flex-row items-center justify-between gap-3',
        status === 'active_trial' && 'bg-[#FFD93D] text-black',
        status === 'free_preview' && 'bg-[#FFF8E7] dark:bg-[#1C1C1C] text-black dark:text-white',
        status === 'expired_trial' && 'bg-[#FF6B9D] text-black',
        className
      )}
    >
      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-display font-bold">
        {status === 'active_trial' && (
          <>
            <Clock className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>
              7-Day Premium Free Trial Active — <strong>{daysRemaining} day{daysRemaining === 1 ? '' : 's'} remaining</strong>. All modules and AI tools unlocked.
            </span>
          </>
        )}
        {status === 'free_preview' && (
          <>
            <Sparkles className="w-4 h-4 shrink-0 stroke-[2.5] text-amber-600" />
            <span>
              Lessons 1 & 2 of all modules are <strong>Free Forever</strong>. Ready for full access?
            </span>
          </>
        )}
        {status === 'expired_trial' && (
          <>
            <Clock className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>
              Your 7-day trial has ended. 100% of your learning progress is saved!
            </span>
          </>
        )}
      </div>

      <div className="shrink-0">
        <Button
          size="sm"
          variant={status === 'active_trial' ? 'secondary' : 'primary'}
          onClick={onActionClick}
          rightIcon={<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />}
        >
          {status === 'active_trial' && 'View Student Passes'}
          {status === 'free_preview' && 'Start 7-Day Free Trial'}
          {status === 'expired_trial' && 'Choose Academic Pass'}
        </Button>
      </div>
    </aside>
  );
};
