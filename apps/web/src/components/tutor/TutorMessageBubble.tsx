import React from 'react';
import { Tag, Button } from 'antd';
import { UserOutlined, RobotOutlined, BookOutlined, ExportOutlined } from '@ant-design/icons';
import type { TutorMessage } from '../../services/tutorService';

interface TutorMessageBubbleProps {
  message: TutorMessage;
  onNavigateToSlide?: ((slideNumber: number) => void) | undefined;
  onExecuteCanvasAction?: ((target: string) => void) | undefined;
}

export const TutorMessageBubble: React.FC<TutorMessageBubbleProps> = ({
  message,
  onNavigateToSlide,
  onExecuteCanvasAction,
}) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end gap-2 my-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
        <div className="max-w-[85%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-xs sm:text-sm font-medium shadow-sm leading-relaxed">
          {message.content}
        </div>
        <div className="w-7 h-7 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
          <UserOutlined className="text-xs" />
        </div>
      </div>
    );
  }

  const levelTag = message.scaffoldLevel
    ? {
        nudge: { color: 'gold', text: 'Dürtme' },
        clue: { color: 'blue', text: 'İpucu' },
        remediation: { color: 'magenta', text: 'Yanılgı Düzeltme' },
        mastery: { color: 'green', text: 'Kavram Ustalığı' },
      }[message.scaffoldLevel]
    : null;

  return (
    <div className="flex items-start gap-2.5 my-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
        <RobotOutlined className="text-xs" />
      </div>

      <div className="flex-1 max-w-[92%] flex flex-col gap-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 p-3.5 rounded-2xl rounded-tl-none shadow-sm">
        {/* Header badges */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 dark:border-slate-700/80 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs text-blue-600 dark:text-blue-400">
              AI Sokratik Eğitmen
            </span>
            {levelTag && (
              <Tag color={levelTag.color} className="text-[10px] font-mono m-0 border-0 rounded-lg">
                {levelTag.text}
              </Tag>
            )}
          </div>
        </div>

        {/* Message body */}
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-normal m-0 whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Slide Citation Pills */}
        {message.slideCitation && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
              <BookOutlined className="text-blue-500" />
              Slayt:
            </span>
            {message.slideCitation.slideNumbers.map((s) => (
              <Tag
                key={s}
                color="blue"
                className="cursor-pointer font-mono text-[10px] m-0 rounded-lg hover:opacity-80 transition-opacity"
                onClick={() => onNavigateToSlide?.(s)}
              >
                Slayt {s} →
              </Tag>
            ))}
          </div>
        )}

        {/* Canvas Action Button */}
        {message.canvasAction && (
          <div className="pt-1">
            <Button
              type="link"
              size="small"
              icon={<ExportOutlined />}
              onClick={() => onExecuteCanvasAction?.(message.canvasAction!.target)}
              className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium p-0 h-auto"
            >
              <span>Ders notunda göster ({message.canvasAction.target})</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
