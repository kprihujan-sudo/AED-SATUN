import React, { useState } from 'react';
import { 
  OFFICIAL_AED_SURVEY_QUESTIONS, 
  generateGoogleAppsScriptCode 
} from '../utils/googleWorkspace';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ListOrdered, 
  FileSpreadsheet, 
  ShieldCheck,
  HelpCircle,
  Play,
  Layers
} from 'lucide-react';

interface GoogleFormSchemaViewerProps {
  googleConnected: boolean;
  onConnectGoogle: () => void;
  onCreateGoogleFormViaApi?: () => Promise<void>;
  isCreatingForm?: boolean;
}

export const GoogleFormSchemaViewer: React.FC<GoogleFormSchemaViewerProps> = ({
  googleConnected,
  onConnectGoogle,
  onCreateGoogleFormViaApi,
  isCreatingForm
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  const scriptCode = generateGoogleAppsScriptCode();

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(OFFICIAL_AED_SURVEY_QUESTIONS, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const sections = Array.from(new Set(OFFICIAL_AED_SURVEY_QUESTIONS.map(q => q.section)));

  const filteredQuestions = selectedSectionFilter === 'ALL'
    ? OFFICIAL_AED_SURVEY_QUESTIONS
    : OFFICIAL_AED_SURVEY_QUESTIONS.filter(q => q.section === selectedSectionFilter);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 text-white rounded-xl p-6 shadow-sm border border-teal-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md text-xs font-bold bg-teal-700 text-teal-100 border border-teal-600 mb-2">
              <FileCode2 className="w-3.5 h-3.5" />
              <span>โครงสร้าง Google Form มาตรฐานวิชาการ สพฉ. & สธ.</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              แบบจำลองโครงสร้างและตัวสร้าง Google Form สำรวจ AED จ.สตูล
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-2xl leading-relaxed">
              โครงสร้างคำถาม 7 หมวด 26 ตัวชี้วัด ออกแบบตามเกณฑ์สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) 
              และสมาคมแพทย์โรคหัวใจแห่งประเทศไทย รองรับการสร้าง Google Form และ Google Sheet อัตโนมัติ
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowCodeModal(true)}
              className="px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700 text-teal-50 rounded-lg text-xs font-bold border border-teal-600 flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <FileCode2 className="w-4 h-4 text-teal-300" />
              <span>ดู Google Apps Script (GAS)</span>
            </button>

            <button
              onClick={handleCopyScript}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold shadow-xs border border-teal-500 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'คัดลอกโค้ดแล้ว!' : 'คัดลอกสคริปต์สร้างฟอร์ม'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs">
            <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-900 flex items-center justify-center text-xs font-bold">1</span>
            <span>ความสมบูรณ์เชิงวิชาการ</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            ครอบคลุมสถานะไฟ Self-test, วันหมดอายุแบตเตอรี่, แผ่นนำไฟฟ้า (Adult & Pediatric Pads), และ Rescue Ready Kit 5 รายการ
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs">
            <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-900 flex items-center justify-center text-xs font-bold">2</span>
            <span>เข้าถึงและใช้งานง่าย</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            จัดแบ่ง 7 ส่วนย่อยแบบ Page Break พร้อมคำอธิบายภาพกำกับ และมีตัวเลือกแบบ Choice/Date ป้องกันการพิมพ์ผิดพลาด
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs">
            <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-900 flex items-center justify-center text-xs font-bold">3</span>
            <span>เชื่อมโยง Google Sheets</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            คำตอบจาก Google Form จะไหลเข้า Google Sheet โดยตรง พร้อมสูตรคำนวณระดับความพร้อมใช้ (Readiness Score) อัตโนมัติ
          </p>
        </div>
      </div>

      {/* Section Filter */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
          <Layers className="w-4 h-4 text-teal-700" />
          <span>หมวดหมู่คำถาม ({OFFICIAL_AED_SURVEY_QUESTIONS.length} ข้อ):</span>
        </div>

        <div className="flex overflow-x-auto gap-1.5 pb-1">
          <button
            onClick={() => setSelectedSectionFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedSectionFilter === 'ALL'
                ? 'bg-teal-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ทั้งหมด ({OFFICIAL_AED_SURVEY_QUESTIONS.length})
          </button>
          {sections.map((sec, i) => (
            <button
              key={i}
              onClick={() => setSelectedSectionFilter(sec)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedSectionFilter === sec
                  ? 'bg-teal-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              ส่วนที่ {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Schema List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-bold">
                  {q.id.toUpperCase()}
                </span>
                <span className="text-[11px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  {q.section}
                </span>
                {q.required && (
                  <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold border border-rose-200">
                    จำเป็น *
                  </span>
                )}
              </div>

              <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                ประเภท: {q.type === 'CHOICE' ? 'หลายตัวเลือก (Radio)' : q.type === 'CHECKBOX' ? 'ช่องทำเครื่องหมาย (Checkbox)' : q.type === 'DATE' ? 'วันที่ (Date)' : q.type === 'TEXT' ? 'ข้อความสั้น (Short Text)' : 'ย่อหน้า (Paragraph)'}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {q.title}
              </h4>
              {q.description && (
                <p className="text-xs text-slate-500 mt-0.5">
                  คำอธิบาย: {q.description}
                </p>
              )}
            </div>

            {/* Options list if choice */}
            {q.options && q.options.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700">ตัวเลือกคำตอบ (Options):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic standard citation */}
            {q.academicStandardRef && (
              <div className="flex items-center space-x-1.5 text-[11px] text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span><strong>เกณฑ์วิชาการอ้างอิง:</strong> {q.academicStandardRef}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Script Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full border border-slate-200 shadow-xl p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <FileCode2 className="w-5 h-5 text-teal-700" />
                  <span>Google Apps Script (GAS) สำหรับสร้าง Form & Sheet อัตโนมัติ</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  นำสคริปต์นี้ไปวางใน Google Apps Script (script.google.com) เพื่อสร้างฟอร์มจริงลง Google Drive ได้ทันที
                </p>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-md hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-y-auto max-h-96 leading-relaxed border border-slate-800">
              <pre>{scriptCode}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500 font-medium">
                สร้าง Form พร้อม Page Breaks และผูกเข้ากับ Google Sheets อัตโนมัติ
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyScript}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs border border-teal-800"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'คัดลอกเรียบร้อย' : 'คัดลอกโค้ด'}</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 shadow-xs"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
