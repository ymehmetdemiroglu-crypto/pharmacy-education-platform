import { Sparkles, X } from 'lucide-react';

interface PromptSuggestionChipsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
  onDismiss?: () => void;
}

const CHIPS = [
  {
    label: 'Dibukain SAR [S33]',
    prompt: 'Dibukain molekülünün çoklu reseptör bağları nelerdir? [Slayt 33]',
  },
  {
    label: 'Salisilik Asit pKa [S19]',
    prompt: 'Salisilik asit neden para-izomerinden daha aktiftir ve pKa değeri düşüktür? [Slayt 19]',
  },
  {
    label: 'Açilasyon vs Fosforilasyon',
    prompt: 'Açilasyon ile fosforilasyon kovalent bağ farkı nedir? [Slayt 11, 12]',
  },
  {
    label: 'Hidrofobik & Entropi',
    prompt: 'Hidrofobik etkileşimde entropi nasıl rol oynar? [Slayt 25]',
  },
  {
    label: 'Vize Sokratik Soru',
    prompt: 'Bana Farmasötik Kimya vizesi için Sokratik bir soru sor ve cevabımı adım adım değerlendir.',
  },
];

export const PromptSuggestionChips: React.FC<PromptSuggestionChipsProps> = ({
  onSelectPrompt,
  disabled,
  onDismiss,
}) => {
  return (
    <div className="flex items-center justify-between gap-1 overflow-x-auto py-0.5 scrollbar-none select-none">
      <div className="flex items-center gap-1.5 flex-nowrap shrink-0 overflow-x-auto py-0.5">
        <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1 pl-0.5">
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          Öneriler:
        </span>
        {CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(chip.prompt)}
            className="text-[10.5px] font-normal whitespace-nowrap px-2 py-0.5 rounded-full transition-all bg-slate-100 dark:bg-[#212121] text-slate-600 dark:text-[#CCCCCC] border border-slate-200 dark:border-[#2F2F2F] hover:border-[#10A37F] hover:text-[#10A37F] dark:hover:text-[#10A37F] cursor-pointer shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          title="Önerileri Gizle"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded-full ml-1 shrink-0 cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
