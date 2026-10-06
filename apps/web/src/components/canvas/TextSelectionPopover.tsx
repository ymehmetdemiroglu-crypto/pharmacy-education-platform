import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

interface TextSelectionPopoverProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onAskTutor: (selectedText: string) => void;
}

export const TextSelectionPopover: React.FC<TextSelectionPopoverProps> = ({
  containerRef,
  onAskTutor,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !containerRef.current) {
        setPosition(null);
        setSelectedText('');
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 3) {
        setPosition(null);
        setSelectedText('');
        return;
      }

      // Check if selection is within our container
      const range = selection.getRangeAt(0);
      const container = containerRef.current;
      if (!container.contains(range.commonAncestorContainer)) {
        setPosition(null);
        setSelectedText('');
        return;
      }

      const rect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setPosition({
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top - containerRect.top - 42,
      });
      setSelectedText(text);
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, [containerRef]);

  if (!position || !selectedText) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
        zIndex: 50,
      }}
      className="animate-in fade-in zoom-in duration-150"
    >
      <Button
        type="primary"
        icon={<RobotOutlined className="text-yellow-300" />}
        onMouseDown={(e) => {
          e.preventDefault();
          onAskTutor(selectedText);
          window.getSelection()?.removeAllRanges();
          setPosition(null);
        }}
        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-xl shadow-lg transition-transform hover:scale-105 select-none h-8 border-0"
      >
        <span>Tutor'a Sor: "{selectedText.slice(0, 24)}..."</span>
      </Button>
    </div>
  );
};
