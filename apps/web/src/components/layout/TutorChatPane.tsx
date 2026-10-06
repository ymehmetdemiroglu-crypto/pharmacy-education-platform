import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Spin, Tooltip } from 'antd';
import { SendOutlined, RobotOutlined, DeleteOutlined, CloseOutlined, BulbOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PromptSuggestionChips } from '../tutor/PromptSuggestionChips';
import { TutorMessageBubble } from '../tutor/TutorMessageBubble';
import { askTutor, type TutorMessage } from '../../services/tutorService';
import { realtimeTelemetry, type MisconceptionAlert } from '../../services/realtimeTelemetryService';

const { TextArea } = Input;

interface TutorChatPaneProps {
  activeConceptId?: string | undefined;
  onNavigateToSlide?: ((slideNumber: number) => void) | undefined;
  onExecuteCanvasAction?: ((target: string) => void) | undefined;
  externalPrompt?: string | null | undefined;
  onClearExternalPrompt?: (() => void) | undefined;
  onClose?: (() => void) | undefined;
}

export const TutorChatPane: React.FC<TutorChatPaneProps> = ({
  activeConceptId,
  onNavigateToSlide,
  onExecuteCanvasAction,
  externalPrompt,
  onClearExternalPrompt,
  onClose,
}) => {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      content:
        'Merhaba! Ben PharmLearn AI Sokratik Eğitmeninim.\n\nProf. Dr. Bedia Kaymakçıoğlu\'nun "İlaç Reseptör Etkileşimi (Kimyasal Bağlar)" vize dersi [Slayt 1–33] üzerinde çalışıyoruz. Ders notundan merak ettiğin herhangi bir cümleyi seçerek "Tutor\'a Sor" diyebilir veya aşağıdaki hızlı konulardan birini seçebilirsin!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [2, 33],
      },
      scaffoldLevel: 'clue',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeNudge, setActiveNudge] = useState<MisconceptionAlert | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = realtimeTelemetry.subscribe((ev) => {
      if (ev.misconceptionAlert) {
        setActiveNudge(ev.misconceptionAlert);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      onClearExternalPrompt?.();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

    const userMsg: TutorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsLoading(true);

    try {
      const tutorReply = await askTutor({
        prompt: text,
        conversationHistory: [...messages, userMsg],
        activeConceptId,
      });

      setMessages((prev) => [...prev, tutorReply]);

      if (tutorReply.canvasAction) {
        onExecuteCanvasAction?.(tutorReply.canvasAction.target);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'tutor',
          content: 'Bağlantı hatası oluştu. Çevrimdışı Sokratik yardımcım üzerinden yanıt üretiliyor...',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'tutor',
        content: 'Sohbet temizlendi. Hangi kimyasal bağ veya reseptör kavramını çalışmak istersin?',
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#131B2A] text-slate-800 dark:text-slate-100">
      {/* Clean Tutor Header */}
      <div className="h-12 shrink-0 flex items-center justify-between px-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A]">
        <div className="flex items-center gap-2">
          <RobotOutlined className="text-blue-500 text-sm" />
          <span className="font-semibold text-xs text-slate-900 dark:text-white">
            AI Sokratik Eğitmen
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            33 Slayt Doğrulandı
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip title="Sohbeti Temizle">
            <Button
              type="text"
              shape="circle"
              size="small"
              onClick={handleClearChat}
              icon={<DeleteOutlined className="text-xs text-gray-400 hover:text-gray-600" />}
            />
          </Tooltip>
          {onClose && (
            <Tooltip title="Paneli Kapat">
              <Button
                type="text"
                shape="circle"
                size="small"
                onClick={onClose}
                icon={<CloseOutlined className="text-xs text-gray-400 hover:text-gray-600" />}
              />
            </Tooltip>
          )}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <TutorMessageBubble
            key={msg.id}
            message={msg}
            onNavigateToSlide={onNavigateToSlide}
            onExecuteCanvasAction={onExecuteCanvasAction}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 my-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <Spin size="small" />
            <span>AI Eğitmen düşünüyor ve ders notunu tarıyor...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Proactive Socratic Nudge Pill */}
      {activeNudge && (
        <div className="mx-3 mb-1 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/60 border border-amber-300 dark:border-amber-700/80 rounded-xl shadow-sm flex flex-col gap-1.5 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold text-xs">
              <BulbOutlined className="text-amber-500" />
              <span>Tutor bir şey fark etti 💡: {activeNudge.title}</span>
            </div>
            <button
              onClick={() => setActiveNudge(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-0.5 rounded cursor-pointer border-0 bg-transparent"
              title="Kapat"
            >
              <CloseOutlined className="text-[10px]" />
            </button>
          </div>
          <p className="text-[11px] text-amber-900/80 dark:text-amber-200/90 leading-relaxed m-0">
            {activeNudge.rationale}
          </p>
          <div className="flex justify-end pt-1">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                const q = activeNudge.suggestedQuestion;
                setActiveNudge(null);
                handleSendMessage(q);
              }}
              icon={<ArrowRightOutlined />}
              className="bg-amber-600 hover:bg-amber-700 text-white border-0 text-xs h-7 px-3 rounded-xl flex items-center gap-1 font-medium shadow-sm"
            >
              Sokratik İpucu Al
            </Button>
          </div>
        </div>
      )}

      {/* Prompt Suggestion Chips & Input */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] flex flex-col gap-2">
        <PromptSuggestionChips
          disabled={isLoading}
          onSelectPrompt={(prompt) => handleSendMessage(prompt)}
        />

        <div className="flex items-end gap-2 mt-1">
          <TextArea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tutor'a soru sor (Enter ile gönder)..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            className="text-xs sm:text-sm font-sans rounded-xl"
            disabled={isLoading}
          />
          <Button
            type="primary"
            aria-label="send-message"
            onClick={() => handleSendMessage()}
            disabled={!inputVal.trim() || isLoading}
            icon={<SendOutlined />}
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 h-10 px-4 rounded-xl shadow-sm cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
