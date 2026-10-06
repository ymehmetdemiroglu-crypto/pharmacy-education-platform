import React from 'react';
import { Segmented, Button } from 'antd';
import { MenuOutlined, MessageOutlined, ReadOutlined } from '@ant-design/icons';

interface MobileWorkspaceToggleProps {
  activeTab: 'tutor' | 'canvas';
  onChangeTab: (tab: 'tutor' | 'canvas') => void;
  onOpenNavDrawer: () => void;
  hasUnreadTutorUpdate?: boolean;
}

export const MobileWorkspaceToggle: React.FC<MobileWorkspaceToggleProps> = ({
  activeTab,
  onChangeTab,
  onOpenNavDrawer,
  hasUnreadTutorUpdate = false,
}) => {
  return (
    <div className="flex md:hidden items-center justify-between p-2.5 bg-white dark:bg-[#131B2A] border-b-2 border-black dark:border-slate-800 shadow-sm">
      <Button
        icon={<MenuOutlined />}
        onClick={onOpenNavDrawer}
        className="rounded-xl border-slate-300 dark:border-slate-700 shadow-sm"
      />

      <Segmented
        value={activeTab}
        onChange={(val) => onChangeTab(val as 'tutor' | 'canvas')}
        options={[
          {
            label: (
              <div className="flex items-center gap-1.5 px-1 py-0.5">
                <MessageOutlined className="text-emerald-500" />
                <span>AI Tutor</span>
                {hasUnreadTutorUpdate && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                )}
              </div>
            ),
            value: 'tutor',
          },
          {
            label: (
              <div className="flex items-center gap-1.5 px-1 py-0.5">
                <ReadOutlined className="text-blue-500" />
                <span>Ders Notu</span>
              </div>
            ),
            value: 'canvas',
          },
        ]}
      />

      <div className="w-8 flex items-center justify-center">
        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.5 rounded-lg">
          BETA
        </span>
      </div>
    </div>
  );
};
