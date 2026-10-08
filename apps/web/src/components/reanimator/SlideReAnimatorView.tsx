import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Button,
  Tag,
  Segmented,
  Input,
  Space,
  Typography,
  Tooltip,
  Divider,
  Alert,
  message,
  Modal
} from 'antd';
import {
  CloudUploadOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  DownloadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  BulbOutlined,
  EyeOutlined,
  BookOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  ArrowRightOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSlideReAnimatorStore, ReAnimatorViewTab } from '../../stores/useSlideReAnimatorStore';
import { PRELOADED_REANIMATED_SLIDES } from '../../data/reanimatedSlides.data';
import { IonizationChamber } from '@pharmacy/widgets';
import { DoseResponseCurve } from '@pharmacy/widgets';
import { SarMatrixWidget } from '../widgets/SarMatrixWidget';
import { DualModeMoleculeViewer } from '../widgets/DualModeMoleculeViewer';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export interface SlideReAnimatorViewProps {
  onBackToDashboard?: () => void;
}

export const SlideReAnimatorView: React.FC<SlideReAnimatorViewProps> = ({ onBackToDashboard }) => {
  const {
    slides,
    activeSlideId,
    activeCourse,
    activeTab,
    isUploading,
    hypothesisText,
    isHypothesisCommitted,
    selectedOptionId,
    revealedHintsCount,
    isQuizSubmitted,
    lastQuizResult,
    initialize,
    setCourse,
    setActiveSlide,
    setActiveTab,
    setHypothesis,
    commitHypothesis,
    selectOption,
    revealNextHint,
    submitQuiz,
    resetQuizProgression,
    uploadAndReanimate,
    deleteSlide,
    getActiveSlide,
    getAnkiTsv
  } = useSlideReAnimatorStore();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadText, setUploadText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRawTextExpanded, setIsRawTextExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const activeSlide = getActiveSlide();

  const handleDownloadAnki = () => {
    try {
      const tsvContent = getAnkiTsv();
      const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const sanitizedTitle = activeSlide.title.replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `PharmLearn_Anki_${sanitizedTitle}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      message.success('Anki içe aktarım dosyası (.txt) başarıyla indirildi!');
    } catch (e) {
      message.error('Anki dosyası oluşturulamadı.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      setIsUploadModalOpen(true);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadTitle.trim()) {
      message.warning('Lütfen slayt başlığı girin.');
      return;
    }

    try {
      const fileToUpload = selectedFile || new Blob([uploadText], { type: 'text/plain' });
      await uploadAndReanimate(fileToUpload, {
        title: uploadTitle.trim(),
        courseId: activeCourse,
        rawText: uploadText.trim()
      });
      message.success('Slayt başarıyla yüklendi ve interaktif simülatöre dönüştürüldü!');
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setUploadTitle('');
      setUploadText('');
    } catch (err) {
      message.error('Slayt işlenirken hata oluştu.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 text-[#ECECEC]">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#2F2F2F] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            <Title level={3} style={{ color: '#ECECEC', margin: 0 }}>
              Fotokopiden Etkileşime (Dynamic Slide Re-Animator)
            </Title>
            <Tag color="#10A37F" className="font-semibold text-xs border-0">
              PILLAR 2
            </Tag>
          </div>
          <Paragraph style={{ color: '#A0A0A0', margin: '4px 0 0 0', fontSize: '14px' }}>
            Fakülte slaytını veya fotokopici notunu yükle; anında canlı biyo-fiziksel simülatöre, vize tuzağı testine ve Anki destesine dönüştür.
          </Paragraph>
        </div>

        <div className="flex items-center gap-3">
          <Segmented
            value={activeCourse}
            onChange={(val) => setCourse(val as 'medchem' | 'pharmacology')}
            options={[
              { label: 'Farmasötik Kimya', value: 'medchem' },
              { label: 'Farmakoloji', value: 'pharmacology' }
            ]}
            className="bg-[#171717] border border-[#2F2F2F] text-sm text-[#ECECEC]"
          />
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => {
              setSelectedFile(null);
              setUploadTitle('');
              setUploadText('');
              setIsUploadModalOpen(true);
            }}
            style={{ backgroundColor: '#10A37F', borderColor: '#10A37F', color: '#FFFFFF', fontWeight: 600 }}
          >
            Slayt Yükle 📸
          </Button>
          {onBackToDashboard && (
            <Button
              onClick={onBackToDashboard}
              className="bg-[#212121] border-[#2F2F2F] text-[#ECECEC] hover:border-[#10A37F]"
            >
              Panoya Dön
            </Button>
          )}
        </div>
      </div>

      {/* Exemplar Quick Selector Bar */}
      <div className="my-4 p-3 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#888] uppercase tracking-wider mr-1">
          Örnek Fakülte Slaytları:
        </span>
        {slides.map((s) => {
          const isActive = s.id === activeSlideId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSlide(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#10A37F] text-white shadow-sm'
                  : 'bg-[#242424] text-[#BBB] hover:bg-[#2C2C2C] hover:text-white border border-[#333]'
              }`}
            >
              <span>📌</span>
              <span>{s.title}</span>
              {s.courseId === 'medchem' ? (
                <Tag color="#177ddc" className="text-[10px] py-0 px-1 border-0 m-0">MedChem</Tag>
              ) : (
                <Tag color="#d46b08" className="text-[10px] py-0 px-1 border-0 m-0">Pharm</Tag>
              )}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Study Desk Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Uploaded Slide & Entity Extraction Canvas (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card
            className="bg-[#212121] border-[#2F2F2F] shadow-md rounded-2xl overflow-hidden"
            styles={{ body: { padding: '16px' } }}
          >
            {/* Slide Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#2D2D2D]">
              <div>
                <div className="flex items-center gap-2">
                  <Tag color="#10A37F" className="text-xs border-0 font-medium m-0">
                    Slayt #{activeSlide.pageNumber}
                  </Tag>
                  <Text className="text-xs text-[#888]">{activeSlide.facultyName}</Text>
                </div>
                <Title level={4} style={{ color: '#FFFFFF', margin: '6px 0 0 0', fontSize: '17px' }}>
                  {activeSlide.title}
                </Title>
              </div>

              {/* Delete button for user slides */}
              {!PRELOADED_REANIMATED_SLIDES.some((p) => p.id === activeSlide.id) && (
                <Tooltip title="Bu slaytı sil">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => {
                      deleteSlide(activeSlide.id);
                      message.info('Slayt silindi.');
                    }}
                  />
                </Tooltip>
              )}
            </div>

            {/* Slide Visual Presentation Frame */}
            <div className="my-4 p-4 bg-[#171717] rounded-xl border border-[#2D2D2D] relative min-h-[220px] flex flex-col justify-between">
              <div className="text-xs text-[#666] font-mono flex items-center justify-between pb-2 border-b border-[#222]">
                <span>{activeSlide.deckName}</span>
                <span>Provenance: Verified Slide</span>
              </div>

              {/* Center Slide Mock Diagram / Graphic */}
              <div className="py-4 px-2">
                <div className="text-sm font-semibold text-[#DDD] mb-2 flex items-center gap-1.5">
                  <FileTextOutlined className="text-[#10A37F]" />
                  <span>Slayt İçeriğinden Çıkarılan Temel Parametreler</span>
                </div>
                <p className="text-xs text-[#BBB] leading-relaxed line-clamp-4 font-mono bg-[#1E1E1E] p-2.5 rounded border border-[#282828]">
                  {activeSlide.extractedRawText.slice(0, 260)}...
                </p>
              </div>

              {/* Detected Entity Bounding Chips */}
              <div>
                <div className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Tespit Edilen Vize Varlıkları (Entities):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSlide.entities.map((ent) => {
                    let color = '#2E7D32';
                    if (ent.type === 'pka' || ent.type === 'ph') color = '#1565C0';
                    if (ent.type === 'trap') color = '#C62828';
                    if (ent.type === 'kd' || ent.type === 'ec50') color = '#E65100';

                    return (
                      <Tooltip key={ent.id} title={`Güven Skoru: %${Math.round(ent.confidence * 100)}`}>
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white shadow-2xs border border-white/20"
                          style={{ backgroundColor: color }}
                        >
                          <span>{ent.type === 'trap' ? '⚠️' : '⚡'}</span>
                          <span>{ent.label}</span>
                        </span>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Toggle Full Raw Text */}
            <div className="mt-2">
              <button
                onClick={() => setIsRawTextExpanded(!isRawTextExpanded)}
                className="text-xs text-[#10A37F] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>{isRawTextExpanded ? '▼ Metni Gizle' : '▶ Ham Slayt OCR Metnini Görüntüle'}</span>
              </button>

              {isRawTextExpanded && (
                <div className="mt-2 p-3 bg-[#171717] rounded-lg border border-[#2D2D2D] text-xs font-mono text-[#AAA] whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {activeSlide.extractedRawText}
                </div>
              )}
            </div>
          </Card>

          {/* Quick Dropzone CTA */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-[#1E1E1E] hover:bg-[#252525] border-2 border-dashed border-[#333] hover:border-[#10A37F] rounded-2xl cursor-pointer text-center transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,.pdf"
              className="hidden"
            />
            <CloudUploadOutlined className="text-2xl text-[#10A37F] mb-1" />
            <div className="text-xs font-semibold text-[#DDD]">Kendi Notunu veya Slaytını Sürükle-Bırak</div>
            <div className="text-[11px] text-[#888] mt-0.5">JPG, PNG, PDF desteklenir (Bulut ve Yerel Saklama)</div>
          </div>
        </div>

        {/* Right Column: Re-Animated Interactive Engine (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <Card
            className="bg-[#212121] border-[#2F2F2F] shadow-md rounded-2xl overflow-hidden"
            styles={{ body: { padding: '20px' } }}
          >
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2F2F2F]">
              <Segmented
                value={activeTab}
                onChange={(val) => setActiveTab(val as ReAnimatorViewTab)}
                options={[
                  {
                    label: (
                      <span className="flex items-center gap-1.5 px-1 py-0.5">
                        <ExperimentOutlined />
                        <span>Canlı Simülatör</span>
                      </span>
                    ),
                    value: 'simulator'
                  },
                  {
                    label: (
                      <span className="flex items-center gap-1.5 px-1 py-0.5">
                        <ThunderboltOutlined />
                        <span>Vize Meydan Okuma</span>
                      </span>
                    ),
                    value: 'quiz'
                  },
                  {
                    label: (
                      <span className="flex items-center gap-1.5 px-1 py-0.5">
                        <BookOutlined />
                        <span>Anki ({activeSlide.ankiCards.length} Kart)</span>
                      </span>
                    ),
                    value: 'anki'
                  }
                ]}
                className="bg-[#171717] border border-[#2F2F2F] text-[#ECECEC]"
              />

              {activeTab === 'anki' && (
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadAnki}
                  size="small"
                  style={{ backgroundColor: '#10A37F', borderColor: '#10A37F', fontWeight: 600 }}
                >
                  Anki (.txt) İndir
                </Button>
              )}
            </div>

            {/* TAB 1: DYNAMIC INTERACTIVE WIDGET */}
            {activeTab === 'simulator' && (
              <div className="pt-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <Title level={4} style={{ color: '#FFFFFF', margin: 0, fontSize: '18px' }}>
                      {activeSlide.widgetConfig.title}
                    </Title>
                  </div>
                  <Paragraph style={{ color: '#A0A0A0', margin: '4px 0 0 0', fontSize: '13px' }}>
                    {activeSlide.widgetConfig.description}
                  </Paragraph>
                </div>

                <div className="p-4 bg-[#171717] rounded-xl border border-[#2D2D2D] min-h-[320px] flex items-center justify-center">
                  {/* Dynamic Widget Mounting */}
                  {activeSlide.widgetConfig.type === 'IonizationChamber' && (
                    <div className="w-full">
                      <IonizationChamber
                        config={{
                          drugName: activeSlide.title,
                          pKa: activeSlide.widgetConfig.props.pKa || 2.97,
                          drugType: (activeSlide.widgetConfig.props.compoundType as any) || 'weak_acid',
                          compartmentA: {
                            name: 'Mide Lümeni (Stomach)',
                            defaultPh: activeSlide.widgetConfig.props.initialPh || 1.5,
                            minPh: 1.0,
                            maxPh: 8.5,
                            surfaceAreaM2: 1.0,
                          },
                        }}
                      />
                    </div>
                  )}

                  {activeSlide.widgetConfig.type === 'DoseResponseCurve' && (
                    <div className="w-full">
                      <DoseResponseCurve
                        config={{
                          title: activeSlide.widgetConfig.title,
                          prompt: 'Konsantrasyon ve antagonist dozu kaymalarını test et.',
                          defaultEc50: activeSlide.widgetConfig.props.baselineEc50 || 5,
                          defaultEmax: 100,
                          defaultHillSlope: 1.0,
                          modes: ['agonist', 'competitive_antagonist'],
                          source: { file: activeSlide.deckName, page: activeSlide.pageNumber },
                          explanation: activeSlide.widgetConfig.description
                        }}
                      />
                    </div>
                  )}

                  {activeSlide.widgetConfig.type === 'SarExplorer' && (
                    <div className="w-full">
                      <SarMatrixWidget />
                    </div>
                  )}

                  {activeSlide.widgetConfig.type === 'DualModeMoleculeViewer' && (
                    <div className="w-full">
                      <DualModeMoleculeViewer
                        initialMolecule={activeSlide.widgetConfig.props.activeDrug || 'dibucaine'}
                      />
                    </div>
                  )}

                  {/* Fallback for other widgets */}
                  {activeSlide.widgetConfig.type !== 'IonizationChamber' &&
                    activeSlide.widgetConfig.type !== 'DoseResponseCurve' &&
                    activeSlide.widgetConfig.type !== 'SarExplorer' &&
                    activeSlide.widgetConfig.type !== 'DualModeMoleculeViewer' && (
                      <div className="text-center py-8">
                        <ExperimentOutlined className="text-4xl text-[#10A37F] mb-3" />
                        <Title level={5} style={{ color: '#FFF' }}>
                          {activeSlide.widgetConfig.title}
                        </Title>
                        <Text className="text-xs text-[#888]">
                          {activeSlide.widgetConfig.description}
                        </Text>
                      </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Text className="text-xs text-[#888]">
                    💡 Simülatördeki değerleri değiştirerek slayt formüllerinin biyolojik etkisini test edebilirsiniz.
                  </Text>
                  <Button
                    type="link"
                    icon={<ThunderboltOutlined />}
                    onClick={() => setActiveTab('quiz')}
                    style={{ color: '#10A37F', fontWeight: 600 }}
                  >
                    Vize Meydan Okumasına Geç →
                  </Button>
                </div>
              </div>
            )}

            {/* TAB 2: SOCRATIC ACTIVE-RECALL CHALLENGE */}
            {activeTab === 'quiz' && (
              <div className="pt-4 flex flex-col gap-4">
                {/* Step 1: Predict-then-Reveal Hypothesis Guard */}
                {!isHypothesisCommitted ? (
                  <div className="p-4 bg-[#1E1E1E] rounded-xl border border-[#333]">
                    <div className="flex items-center gap-2 mb-2 text-[#10A37F] font-semibold text-sm">
                      <ThunderboltOutlined />
                      <span>1. Adım: Predict-then-Reveal (Tahmin Kilidi)</span>
                    </div>
                    <Paragraph style={{ color: '#DDD', fontSize: '14px', marginBottom: '12px' }}>
                      {activeSlide.challenge.hypothesisPrompt}
                    </Paragraph>
                    <TextArea
                      data-testid="reanim-hypothesis-input"
                      value={hypothesisText}
                      onChange={(e) => setHypothesis(e.target.value)}
                      placeholder="Kendi hipotezini yaz (Ör: Amit bağı karaciğerde yavaş hidroliz olur, ester ise plazmada hemen yıkılır...)"
                      rows={3}
                      className="bg-[#171717] border-[#333] text-[#EEE] placeholder:text-[#666] rounded-lg mb-3"
                    />
                    <div className="flex justify-end">
                      <Button
                        data-testid="reanim-unlock-hypothesis-btn"
                        type="primary"
                        icon={<CheckCircleFilled />}
                        onClick={commitHypothesis}
                        disabled={!hypothesisText.trim()}
                        style={{
                          backgroundColor: hypothesisText.trim() ? '#10A37F' : '#333',
                          borderColor: hypothesisText.trim() ? '#10A37F' : '#333',
                          fontWeight: 600
                        }}
                      >
                        Tahminimi Kaydet ve Soruyu Aç ⚡
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#162720] rounded-xl border border-[#10A37F]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircleFilled className="text-[#10A37F]" />
                      <span className="text-[#A7F3D0] font-medium">
                        <b>Hipoteziniz:</b> "{hypothesisText}"
                      </span>
                    </div>
                    <Button
                      size="small"
                      type="text"
                      onClick={resetQuizProgression}
                      className="text-[#6EE7B7] hover:text-white"
                    >
                      Yeniden Başla
                    </Button>
                  </div>
                )}

                {/* Step 2: The Socratic Question & Options */}
                {isHypothesisCommitted && (
                  <div>
                    <div className="mb-3">
                      <Tag color="#10A37F" className="border-0 font-semibold mb-1">
                        VİZE SORUSU
                      </Tag>
                      <Title level={4} style={{ color: '#FFFFFF', margin: 0, fontSize: '16px', lineHeight: 1.4 }}>
                        {activeSlide.challenge.question}
                      </Title>
                    </div>

                    {/* Options list */}
                    <div className="flex flex-col gap-2.5 my-3">
                      {activeSlide.challenge.options.map((opt, index) => {
                        const letter = String.fromCharCode(65 + index);
                        const isSelected = selectedOptionId === opt.id;
                        let optionStyle = 'bg-[#181818] border-[#2E2E2E] text-[#DDD] hover:border-[#444]';

                        if (isQuizSubmitted) {
                          if (opt.isCorrect) {
                            optionStyle = 'bg-[#12281E] border-[#10A37F] text-[#6EE7B7] font-semibold';
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = 'bg-[#2E1417] border-[#EF4444] text-[#FCA5A5]';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-[#1E2E28] border-[#10A37F] text-white font-medium';
                        }

                        return (
                          <div
                            key={opt.id}
                            data-testid={`reanim-option-${opt.id}`}
                            onClick={() => selectOption(opt.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                          >
                            <span className="w-6 h-6 rounded-full bg-[#282828] text-xs font-bold flex items-center justify-center shrink-0">
                              {letter}
                            </span>
                            <span className="text-sm leading-relaxed">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Hint Ladder & Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Button
                        data-testid="reanim-hint-btn"
                        icon={<BulbOutlined />}
                        onClick={revealNextHint}
                        disabled={revealedHintsCount >= 3}
                        className="bg-[#242424] border-[#333] text-[#FFD666] hover:border-[#FFD666]"
                      >
                        İpucu İste ({revealedHintsCount}/3)
                      </Button>

                      {!isQuizSubmitted && (
                        <Button
                          data-testid="reanim-submit-quiz-btn"
                          type="primary"
                          onClick={submitQuiz}
                          disabled={!selectedOptionId}
                          style={{
                            backgroundColor: selectedOptionId ? '#10A37F' : '#333',
                            borderColor: selectedOptionId ? '#10A37F' : '#333',
                            fontWeight: 600
                          }}
                        >
                          Cevabı Onayla 🎯
                        </Button>
                      )}
                    </div>

                    {/* Revealed Hints */}
                    {revealedHintsCount > 0 && (
                      <div className="mt-3 p-3 bg-[#242217] rounded-xl border border-[#D4B106]/40 flex flex-col gap-2">
                        <div className="text-xs font-semibold text-[#FFD666] flex items-center gap-1">
                          <BulbOutlined />
                          <span>3 Kademeli İpucu Merdiveni:</span>
                        </div>
                        {activeSlide.challenge.hintLadder.slice(0, revealedHintsCount).map((hint, idx) => (
                          <div key={idx} className="text-xs text-[#FFE58F] pl-2 border-l-2 border-[#FAAD14]">
                            {hint}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Diagnostic Feedback Verdict */}
                    {isQuizSubmitted && lastQuizResult && (
                      <div
                        className={`mt-4 p-4 rounded-xl border ${
                          lastQuizResult.isCorrect
                            ? 'bg-[#10241A] border-[#10A37F] text-[#A7F3D0]'
                            : 'bg-[#2B1316] border-[#EF4444] text-[#FCA5A5]'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-sm mb-1">
                          {lastQuizResult.isCorrect ? (
                            <>
                              <CheckCircleFilled className="text-[#10A37F]" />
                              <span>Doğru Teşhis!</span>
                            </>
                          ) : (
                            <>
                              <CloseCircleFilled className="text-[#EF4444]" />
                              <span>Vize Tuzağına Yakalandınız!</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed mt-1">{lastQuizResult.feedback}</p>
                        <div className="mt-2 text-[11px] opacity-75 font-mono">
                          Kaynak: {activeSlide.challenge.slideProvenance}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ANKI FLASHCARDS PREVIEW */}
            {activeTab === 'anki' && (
              <div className="pt-4 flex flex-col gap-4">
                <Alert
                  message="1-Tıkla Anki İçe Aktarım"
                  description="Aşağıdaki kartlar slayt içeriğinden otomatik olarak üretilmiştir. 'Anki (.txt) İndir' butonuna tıklayarak Anki Desktop veya AnkiMobile uygulamanıza tek tıkla aktarabilirsiniz."
                  type="info"
                  showIcon
                  className="bg-[#17232D] border-[#1890FF]/40 text-[#BAE7FF]"
                />

                <div className="flex flex-col gap-3">
                  {activeSlide.ankiCards.map((card, i) => (
                    <div
                      key={card.id}
                      className="p-4 bg-[#181818] rounded-xl border border-[#2D2D2D] hover:border-[#3E3E3E] transition-all"
                    >
                      <div className="flex items-center justify-between text-xs text-[#888] mb-2">
                        <span className="font-semibold text-[#10A37F]">Kart #{i + 1}</span>
                        <span className="font-mono">{card.slideCitation}</span>
                      </div>
                      <div className="text-sm font-semibold text-white mb-2">{card.question}</div>
                      <div className="p-3 bg-[#1F1F1F] rounded-lg border border-[#2B2B2B] text-xs text-[#CCC] leading-relaxed">
                        <b>Cevap:</b> {card.answer}
                      </div>

                      {card.examTrapWarning && (
                        <div className="mt-2 text-xs text-[#FF7875] bg-[#2E1417] px-2.5 py-1.5 rounded border border-[#FF4D4F]/30">
                          {card.examTrapWarning}
                        </div>
                      )}

                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {card.tags.map((t) => (
                          <Tag key={t} className="text-[10px] bg-[#252525] border-0 text-[#888]">
                            #{t}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadAnki}
                    style={{ backgroundColor: '#10A37F', borderColor: '#10A37F', fontWeight: 600 }}
                  >
                    Anki (.txt) Dosyasını İndir
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Upload Slide Modal */}
      <Modal
        title={
          <span className="flex items-center gap-2 text-white">
            <CloudUploadOutlined className="text-[#10A37F]" />
            <span>Yeni Slayt veya Fotokopi Notu Re-Animate Et</span>
          </span>
        }
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUploadModalOpen(false)} className="bg-[#242424] text-[#CCC] border-[#333]">
            İptal
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isUploading}
            onClick={handleUploadSubmit}
            style={{ backgroundColor: '#10A37F', borderColor: '#10A37F', fontWeight: 600 }}
          >
            Re-Animate Et ⚡
          </Button>
        ]}
        styles={{
          content: { backgroundColor: '#212121', border: '1px solid #333' },
          header: { backgroundColor: '#212121', borderBottom: '1px solid #2D2D2D' }
        }}
        destroyOnHidden
      >
        <div className="flex flex-col gap-4 py-2">
          <div>
            <Text className="text-xs font-semibold text-[#BBB] mb-1 block">Slayt Başlığı:</Text>
            <Input
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="Örn: Hacettepe Farmakoloji - Reseptör ve İntrensek Etkinlik"
              className="bg-[#171717] border-[#333] text-white"
            />
          </div>

          <div>
            <Text className="text-xs font-semibold text-[#BBB] mb-1 block">
              Slayttan Çıkarılan Metin / Formüller:
            </Text>
            <TextArea
              value={uploadText}
              onChange={(e) => setUploadText(e.target.value)}
              placeholder="Slayt metnini, formülleri, pKa, Kd veya fonksiyonel grupları buraya yapıştırın veya yazın..."
              rows={4}
              className="bg-[#171717] border-[#333] text-white"
            />
          </div>

          <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2D2D2D] text-xs text-[#888]">
            💡 <b>Otomatik Algılama:</b> Sistem metindeki kimyasal formülleri (pKa, pH, ester/amit köprüsü, Schild regresyonu) otomatik ayrıştırarak doğru interaktif simülatörü bağlayacaktır.
          </div>
        </div>
      </Modal>
    </div>
  );
};
