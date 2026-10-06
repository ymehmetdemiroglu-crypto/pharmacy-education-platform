import React, { useState } from 'react';
import { Modal, Button, Tag, Segmented, Input, Upload, message, Tooltip } from 'antd';
import {
  FolderOpenOutlined,
  FilePdfOutlined,
  UploadOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  RobotOutlined,
  EyeOutlined,
  LeftOutlined,
  SafetyCertificateOutlined,
  BookOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  studentDocumentService,
  StudentDocument,
  StudyCard,
} from '../../services/studentDocumentService';

interface StudentDocumentVaultModalProps {
  open: boolean;
  onClose: () => void;
  onAskTutorAboutExcerpt?: ((text: string) => void) | undefined;
}

export const StudentDocumentVaultModal: React.FC<StudentDocumentVaultModalProps> = ({
  open,
  onClose,
  onAskTutorAboutExcerpt,
}) => {
  const [courseFilter, setCourseFilter] = useState<'all' | 'medchem' | 'pharmacology'>('all');
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<StudentDocument[]>(() =>
    studentDocumentService.getDocuments()
  );

  // Upload inline state
  const [isUploading, setIsUploading] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFaculty, setNewFaculty] = useState('Marmara Üniversitesi Eczacılık');
  const [newCourse, setNewCourse] = useState<'medchem' | 'pharmacology'>('pharmacology');
  const [newTextContent, setNewTextContent] = useState('');

  // Flashcard state
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [revealedCardAnswers, setRevealedCardAnswers] = useState<Record<string, boolean>>({});
  const [revealedHintTiers, setRevealedHintTiers] = useState<Record<string, number>>({});

  const refreshList = () => {
    setDocuments(studentDocumentService.getDocuments());
  };

  const filteredDocs =
    courseFilter === 'all' ? documents : documents.filter((d) => d.courseId === courseFilter);

  const activeDoc = documents.find((d) => d.id === activeDocId) || null;

  const handleUploadSubmit = async () => {
    if (!newFileName.trim()) {
      message.warning('Lütfen bir dosya adı veya konu başlığı giriniz.');
      return;
    }

    setIsUploading(true);
    try {
      const doc = await studentDocumentService.uploadDocument({
        fileName: newFileName.endsWith('.pdf') ? newFileName : `${newFileName}.pdf`,
        fileSizeBytes: 1500000,
        courseId: newCourse,
        facultyName: newFaculty,
        textContent: newTextContent,
      });

      refreshList();
      setActiveDocId(doc.id);
      setNewFileName('');
      setNewTextContent('');
      message.success('Ders notu başarıyla yüklendi ve Sokratik Vize Rehberi sentezlendi!');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    studentDocumentService.deleteDocument(id);
    if (activeDocId === id) setActiveDocId(null);
    refreshList();
    message.info('Doküman depodan silindi.');
  };

  const toggleAnswer = (cardId: string) => {
    setRevealedCardAnswers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const advanceHint = (cardId: string) => {
    setRevealedHintTiers((prev) => ({
      ...prev,
      [cardId]: Math.min(3, (prev[cardId] || 0) + 1),
    }));
  };

  const handleAskTutor = (text: string) => {
    onAskTutorAboutExcerpt?.(text);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      getContainer={false}
      transitionName=""
      maskTransitionName=""
      className="student-vault-modal"
      title={
        <div className="flex items-center gap-2.5 pt-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
            <FolderOpenOutlined />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC] m-0">
              Ders Notlarım & Doküman Deposu
            </h3>
            <p className="text-[11px] text-slate-400 font-normal m-0">
              Kişisel üniversite notları, PDF slaytlar ve yapay zeka vize çalışma rehberi
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-2">
        {/* Storage Security & Privacy Pill */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] text-xs text-slate-600 dark:text-[#B4B4B4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SafetyCertificateOutlined className="text-emerald-500 text-base shrink-0" />
            <span>
              <strong>Kişisel & Şifreli Alan:</strong> Yüklediğiniz notlar yalnızca size özeldir ve Supabase Storage alanınızda güvenle saklanır.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
            {documents.length} Doküman Aktif
          </span>
        </div>

        {/* ACTIVE STUDY GUIDE VIEW */}
        {activeDoc && activeDoc.studyGuide ? (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Header with back action */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#2F2F2F]">
              <Button
                size="small"
                icon={<LeftOutlined />}
                onClick={() => setActiveDocId(null)}
                className="rounded-xl text-xs text-slate-700 dark:text-[#ECECEC] border-slate-200 dark:border-[#2F2F2F]"
              >
                Doküman Listesine Dön
              </Button>
              <div className="flex items-center gap-2">
                <Tag color={activeDoc.courseId === 'medchem' ? 'blue' : 'green'} className="rounded-lg text-[11px] m-0">
                  {activeDoc.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
                </Tag>
                <span className="text-xs text-slate-400">{activeDoc.facultyName}</span>
              </div>
            </div>

            {/* Guide Overview Banner */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#ECECEC] m-0 flex items-center gap-2">
                  <ThunderboltOutlined className="text-amber-500" />
                  {activeDoc.studyGuide.summaryTitle}
                </h4>
                <Button
                  size="small"
                  icon={<RobotOutlined className="text-[#10A37F]" />}
                  onClick={() => handleAskTutor(`"${activeDoc.fileName}" notundan şu konuyu derinleştirir misin: ${activeDoc.studyGuide?.overview}`)}
                  className="rounded-xl text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                >
                  Tüm Notu Tutor'a Sor
                </Button>
              </div>

              <p className="text-xs text-slate-600 dark:text-[#B4B4B4] leading-relaxed m-0">
                {activeDoc.studyGuide.overview}
              </p>

              {/* Key Concept Bullets */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-[#ECECEC] flex items-center gap-1.5">
                  <CheckCircleFilled className="text-emerald-500" />
                  Vize İçin Kritik Temel İlkeler:
                </span>
                <ul className="text-xs text-slate-600 dark:text-[#A0A0A0] pl-4 m-0 space-y-1">
                  {activeDoc.studyGuide.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Socratic Flashcards */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800 dark:text-[#ECECEC] flex items-center gap-1.5">
                <BookOutlined className="text-[#10A37F]" />
                Aktif Hatırlama & Sokratik Vize Flaşkartları ({activeDoc.studyGuide.cards.length}):
              </span>

              {activeDoc.studyGuide.cards.map((card) => {
                const isAnswerRevealed = revealedCardAnswers[card.id];
                const hintTier = revealedHintTiers[card.id] || 0;

                return (
                  <div
                    key={card.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-3 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-[#ECECEC]">
                          {card.conceptTitle}
                        </span>
                        <Tag className="rounded-lg text-[10px] bg-slate-100 dark:bg-[#2A2A2A] text-slate-600 dark:text-slate-300 border-0">
                          Sayfa {card.pageNumber}
                        </Tag>
                      </div>

                      <Button
                        size="small"
                        type="text"
                        icon={<RobotOutlined className="text-amber-500" />}
                        onClick={() => handleAskTutor(`Ders notumdaki şu soruyu Sokratik yöntemle açıklar mısın: "${card.question}"?`)}
                        className="text-xs text-amber-600 dark:text-amber-400"
                      >
                        Tutor'a Sor
                      </Button>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-[#ECECEC] leading-relaxed m-0">
                      {card.question}
                    </p>

                    {/* Hint ladder */}
                    {hintTier > 0 && (
                      <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col gap-1 text-xs text-amber-900 dark:text-amber-200">
                        {card.hintLadder.slice(0, hintTier).map((h, idx) => (
                          <div key={idx}>
                            <strong>{h.split(':')[0]}:</strong>
                            {h.substring(h.indexOf(':') + 1)}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Reveal */}
                    {isAnswerRevealed && (
                      <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed animate-fadeIn">
                        <strong>Cevap & Açıklama:</strong> {card.answer}
                      </div>
                    )}

                    {/* Exam Trap Warning */}
                    <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300 flex items-center gap-2">
                      <WarningOutlined className="text-rose-500 shrink-0" />
                      <span>{card.examTrapWarning}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#262626]">
                      <Button
                        size="small"
                        icon={<BulbOutlined className="text-amber-500" />}
                        disabled={hintTier >= 3}
                        onClick={() => advanceHint(card.id)}
                        className="rounded-xl text-xs border-slate-200 dark:border-[#2F2F2F] text-slate-700 dark:text-[#ECECEC]"
                      >
                        {hintTier === 0 ? 'İpucu İste (1/3)' : hintTier === 1 ? 'Güçlü İpucu (2/3)' : 'Çözüm İskelesi'}
                      </Button>

                      <Button
                        size="small"
                        type={isAnswerRevealed ? 'default' : 'primary'}
                        onClick={() => toggleAnswer(card.id)}
                        className={
                          isAnswerRevealed
                            ? 'rounded-xl text-xs'
                            : 'bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white rounded-xl text-xs'
                        }
                      >
                        {isAnswerRevealed ? 'Cevabı Gizle' : 'Cevabı Gör'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* DOCUMENT LIST & UPLOAD VIEW */
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Filters & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Segmented
                size="small"
                value={courseFilter}
                onChange={(val) => setCourseFilter(val as any)}
                options={[
                  { label: 'Tüm Notlar', value: 'all' },
                  { label: 'Farmasötik Kimya', value: 'medchem' },
                  { label: 'Farmakoloji', value: 'pharmacology' },
                ]}
                className="bg-slate-100 dark:bg-[#212121] rounded-xl text-xs"
              />

              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => setIsUploading(!isUploading)}
                className="bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                {isUploading ? 'Formu Kapat' : 'Yeni Not Ekle'}
              </Button>
            </div>

            {/* Inline Upload Form */}
            {isUploading && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-[#ECECEC] flex items-center gap-1.5">
                    <UploadOutlined className="text-[#10A37F]" />
                    Ders Notu veya PDF Yükleme Formu:
                  </span>
                  <span className="text-[11px] text-slate-400">PDF, Markdown veya Metin</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Dosya / Not Başlığı:</label>
                    <Input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="Örn: Istanbul_Eczacilik_Toksikoloji_Vize.pdf"
                      className="rounded-xl text-xs bg-white dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Fakülte Adı:</label>
                    <Input
                      value={newFaculty}
                      onChange={(e) => setNewFaculty(e.target.value)}
                      placeholder="Örn: Hacettepe Üniversitesi Eczacılık"
                      className="rounded-xl text-xs bg-white dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Ders Kategorisi:</label>
                  <Segmented
                    size="small"
                    value={newCourse}
                    onChange={(val) => setNewCourse(val as any)}
                    options={[
                      { label: 'Farmakoloji', value: 'pharmacology' },
                      { label: 'Farmasötik Kimya', value: 'medchem' },
                    ]}
                    className="w-full bg-white dark:bg-[#212121] rounded-xl text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Ders Notu Metni / Önemli Kısımlar (İsteğe Bağlı):</label>
                  <Input.TextArea
                    rows={3}
                    value={newTextContent}
                    onChange={(e) => setNewTextContent(e.target.value)}
                    placeholder="Slayt özetinizi veya hocanın vurguladığı sınav sorularını buraya yapıştırabilirsiniz..."
                    className="rounded-xl text-xs bg-white dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    size="small"
                    onClick={() => setIsUploading(false)}
                    className="rounded-xl text-xs"
                  >
                    Vazgeç
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleUploadSubmit}
                    className="bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white rounded-xl text-xs font-semibold px-4"
                  >
                    Kaydet & Vize Rehberi Üret
                  </Button>
                </div>
              </div>
            )}

            {/* Document Cards List */}
            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] hover:border-[#10A37F] dark:hover:border-[#10A37F] transition-all cursor-pointer flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FilePdfOutlined className="text-red-500 text-base" />
                      <span className="font-semibold text-xs text-slate-900 dark:text-[#ECECEC] truncate max-w-sm">
                        {doc.fileName}
                      </span>
                      <Tag
                        color={doc.courseId === 'medchem' ? 'blue' : 'green'}
                        className="rounded-lg text-[10px] m-0"
                      >
                        {doc.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
                      </Tag>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="Sil">
                        <Button
                          size="small"
                          type="text"
                          icon={<DeleteOutlined className="text-slate-400 hover:text-red-500 text-xs" />}
                          onClick={(e) => handleDelete(doc.id, e)}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-[#A0A0A0] line-clamp-2 m-0 leading-relaxed">
                    {doc.extractedTextPreview}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#262626] text-[11px] text-slate-400">
                    <span>{doc.facultyName} • {doc.pageCount} Sayfa</span>
                    <span className="text-[#10A37F] font-semibold flex items-center gap-1">
                      Akıllı Vize Rehberini Aç →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
