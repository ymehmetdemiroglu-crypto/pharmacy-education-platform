import React, { useState } from 'react';
import { Tag, Tooltip, Modal, Input, Button } from 'antd';
import { Sparkles, Key, Zap } from 'lucide-react';

export const ModelStatusBadge: React.FC = () => {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('pep_openrouter_key') || '' : '';
  });

  const handleSaveKey = () => {
    if (typeof window !== 'undefined') {
      if (apiKey.trim()) {
        localStorage.setItem('pep_openrouter_key', apiKey.trim());
      } else {
        localStorage.removeItem('pep_openrouter_key');
      }
    }
    setIsKeyModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Tooltip title="Tıklayarak OpenRouter API anahtarını yapılandırabilirsiniz">
          <button
            type="button"
            onClick={() => setIsKeyModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-emerald-500 text-white text-[11px] font-mono transition-colors shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-emerald-400">Ling 3.0 Sante</span>
            <span className="text-slate-400 border-l border-slate-700 pl-1.5">OpenRouter</span>
          </button>
        </Tooltip>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-base font-bold">
            <Key className="w-4 h-4 text-emerald-500" />
            <span>AI Model & API Yapılandırması</span>
          </div>
        }
        open={isKeyModalOpen}
        onOk={handleSaveKey}
        onCancel={() => setIsKeyModalOpen(false)}
        okText="Kaydet"
        cancelText="İptal"
      >
        <div className="flex flex-col gap-3 py-2 text-xs sm:text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Varsayılan olarak platform <strong>inclusionai/ling-3.0-flash-sante</strong> ve vizeye özel medikal grounding motorunu kullanır.
          </p>
          <div>
            <label className="block font-semibold mb-1 text-xs text-gray-700 dark:text-gray-300">
              Kendi OpenRouter API Anahtarınız (İsteğe Bağlı):
            </label>
            <Input.Password
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="OpenRouter API anahtarı (isteğe bağlı)..."
            />
          </div>
          <p className="text-[11px] text-gray-500">
            Anahtar yalnızca yerel tarayıcınızda (localStorage) saklanır, asla sunucuya kaydedilmez.
          </p>
        </div>
      </Modal>
    </>
  );
};
