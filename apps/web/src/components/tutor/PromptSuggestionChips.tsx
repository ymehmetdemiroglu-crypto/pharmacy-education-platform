import React from 'react';
import { Tag } from 'antd';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionChipsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

const CHIPS = [
  'Bağ güçlerini ve geri dönüşümlülük dengesini açıkla [Slayt 2]',
  'Dibukain molekülünün çoklu reseptör bağları nelerdir? [Slayt 33]',
  'Açilasyon ile fosforilasyon farkı nedir? [Slayt 11, 12]',
  'Hidrofobik etkileşimde entropi nasıl rol oynar? [Slayt 25]',
  'Salisilik asit neden izomerlerinden daha aktiftir? [Slayt 19]',
  'Bana vize odaklı bir Sokratik soru sor',
];

export const PromptSuggestionChips: React.FC<PromptSuggestionChipsProps> = ({
  onSelectPrompt,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1.5 pt-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-500" />
        Önerilen Hızlı Sorular:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {CHIPS.map((chip, idx) => (
          <Tag
            key={idx}
            onClick={() => !disabled && onSelectPrompt(chip)}
            className="text-[11px] font-normal cursor-pointer hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5 px-2.5 rounded-full m-0"
          >
            {chip}
          </Tag>
        ))}
      </div>
    </div>
  );
};
