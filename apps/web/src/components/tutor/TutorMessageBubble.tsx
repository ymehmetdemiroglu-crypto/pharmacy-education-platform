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
        <div className="max-w-[85%] bg-slate-100 dark:bg-[#2F2F2F] text-slate-900 dark:text-[#ECECEC] p-3 rounded-2xl rounded-tr-none text-xs sm:text-sm font-medium shadow-xs leading-relaxed border border-slate-200 dark:border-[#383838]">
          {message.content}
        </div>
        <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-[#383838] text-slate-700 dark:text-[#ECECEC] flex items-center justify-center shrink-0 mt-1 shadow-xs">
          <UserOutlined className="text-xs" />
        </div>
      </div>
    );
  }

  const levelTag = message.scaffoldLevel
    ? {
        nudge: { color: 'gold', text: 'Dürtme' },
        clue: { color: 'cyan', text: 'İpucu' },
        remediation: { color: 'magenta', text: 'Yanılgı Düzeltme' },
        mastery: { color: 'green', text: 'Kavram Ustalığı' },
      }[message.scaffoldLevel]
    : null;

  return (
    <div className="flex items-start gap-2.5 my-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="w-7 h-7 rounded-xl bg-[#10A37F] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
        <RobotOutlined className="text-xs" />
      </div>

      <div className="flex-1 max-w-[92%] flex flex-col gap-2 bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] p-3.5 rounded-2xl rounded-tl-none shadow-xs">
        {/* Header badges */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 dark:border-[#2F2F2F] pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs text-[#10A37F]">
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
        <p className="text-xs sm:text-sm text-slate-800 dark:text-[#ECECEC] leading-relaxed font-normal m-0 whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Slide Citation Pills */}
        {message.slideCitation && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-500 dark:text-[#8E8E8E] flex items-center gap-1">
              <BookOutlined className="text-[#10A37F]" />
              Slayt:
            </span>
            {message.slideCitation.slideNumbers.map((s) => (
              <Tag
                key={s}
                className="cursor-pointer font-mono text-[10px] m-0 rounded-lg bg-white dark:bg-[#171717] text-slate-700 dark:text-[#ECECEC] border border-slate-200 dark:border-[#2F2F2F] hover:border-[#10A37F] transition-colors"
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
              className="text-xs flex items-center gap-1 text-[#10A37F] hover:text-[#0E8C6D] font-medium p-0 h-auto"
            >
              <span>Ders notunda göster ({message.canvasAction.target})</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
