import React, { useState, useEffect } from 'react';
import { AedRecord } from './types';
import { INITIAL_AED_RECORDS } from './data/mockAedData';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { RegistryDashboard } from './components/RegistryDashboard';
import { SurveyForm } from './components/SurveyForm';
import { GoogleFormSchemaViewer } from './components/GoogleFormSchemaViewer';
import { AedDetailModal } from './components/AedDetailModal';
import { AedInspectionCardModal } from './components/AedInspectionCardModal';
import { AiConsultantModal } from './components/AiConsultantModal';
import { GoogleSheetsSyncModal } from './components/GoogleSheetsSyncModal';
import { HeartPulse, CheckCircle2, ShieldCheck, FileSpreadsheet, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'survey' | 'registry' | 'google-form-schema' | 'sheets-sync' | 'ai-advisor'>('registry');

  // Persistence in localStorage
  const [records, setRecords] = useState<AedRecord[]>(() => {
    try {
      const saved = localStorage.getItem('satun_aed_registry_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load local AED records:', e);
    }
    return INITIAL_AED_RECORDS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('satun_aed_registry_data', JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save AED records:', e);
    }
  }, [records]);

  // Modal States
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<AedRecord | null>(null);
  const [selectedRecordForPrint, setSelectedRecordForPrint] = useState<AedRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<AedRecord | null>(null);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showSheetsModal, setShowSheetsModal] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Google OAuth State
  const [googleConnected, setGoogleConnected] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Ready rate
  const total = records.length;
  const readyCount = records.filter(r => r.readinessLevel === 'READY').length;
  const readyPercentage = total > 0 ? Math.round((readyCount / total) * 100) : 0;

  // Add or Update Record
  const handleSaveRecord = (newRecord: AedRecord) => {
    setRecords(prev => {
      const existsIndex = prev.findIndex(r => r.id === newRecord.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = newRecord;
        return updated;
      } else {
        return [newRecord, ...prev];
      }
    });
    setEditingRecord(null);
    setActiveTab('registry');
    showToast(`บันทึกข้อมูลเครื่อง ${newRecord.id} (${newRecord.facilityName}) เรียบร้อยแล้ว`);
  };

  // Delete Record
  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    showToast(`ลบรายการเครื่อง ${id} เรียบร้อยแล้ว`);
  };

  // Connect Google account handler
  const handleConnectGoogle = () => {
    setGoogleConnected(true);
    showToast('เชื่อมต่อสิทธิ์ Google Workspace (Sheets, Drive, Forms) เรียบร้อยแล้ว');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Prompt',sans-serif]">
      {/* Print Stylesheet */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-aed-card, #printable-aed-card * {
            visibility: visible;
          }
          #printable-aed-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            border-width: 2px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalAeds={total}
        readyPercentage={readyPercentage}
        onOpenNewSurvey={() => {
          setEditingRecord(null);
          setActiveTab('survey');
        }}
        googleConnected={googleConnected}
        onConnectGoogle={handleConnectGoogle}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-in slide-in-from-bottom-5 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: REGISTRY DASHBOARD */}
        {activeTab === 'registry' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <StatsOverview
              records={records}
              currentFilter={statusFilter}
              onFilterByStatus={(filter) => {
                setStatusFilter(filter);
              }}
              onOpenAiAudit={() => setShowAiModal(true)}
            />

            <RegistryDashboard
              records={records}
              onSelectRecord={(r) => setSelectedRecordForDetail(r)}
              onEditRecord={(r) => {
                setEditingRecord(r);
                setActiveTab('survey');
              }}
              onDeleteRecord={handleDeleteRecord}
              onOpenNewSurvey={() => {
                setEditingRecord(null);
                setActiveTab('survey');
              }}
              onPrintCard={(r) => setSelectedRecordForPrint(r)}
              onOpenSheetsSync={() => setShowSheetsModal(true)}
              selectedStatusFilter={statusFilter}
              onResetStatusFilter={() => setStatusFilter('ALL')}
            />
          </div>
        )}

        {/* TAB 2: INTERACTIVE SURVEY FORM */}
        {activeTab === 'survey' && (
          <div className="animate-in fade-in duration-200">
            <SurveyForm
              onSaveRecord={handleSaveRecord}
              onCancel={() => {
                setEditingRecord(null);
                setActiveTab('registry');
              }}
              initialData={editingRecord || undefined}
            />
          </div>
        )}

        {/* TAB 3: GOOGLE FORM SCHEMA & AUTOMATION */}
        {activeTab === 'google-form-schema' && (
          <div className="animate-in fade-in duration-200">
            <GoogleFormSchemaViewer
              googleConnected={googleConnected}
              onConnectGoogle={handleConnectGoogle}
            />
          </div>
        )}

        {/* TAB 4: GOOGLE SHEETS SYNC */}
        {activeTab === 'sheets-sync' && (
          <div className="animate-in fade-in duration-200 max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    ศูนย์กลางการส่งออกและซิงค์ข้อมูล Google Sheets
                  </h2>
                  <p className="text-xs text-slate-500">
                    สำนักงานสาธารณสุขจังหวัดสตูล & สถาบันการแพทย์ฉุกเฉินแห่งชาติ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 space-y-2">
                  <div className="font-bold text-teal-950 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>สถานะความพร้อมของข้อมูลปัจจุบัน</span>
                  </div>
                  <div className="text-teal-900 space-y-1 font-medium">
                    <div>• จำนวนเครื่องที่พร้อมส่งออก: <strong>{records.length}</strong> รายการ</div>
                    <div>• ครอบคลุม 7 อำเภอ: เมืองสตูล, ควนโดน, ควนกาหลง, ท่าแพ, ละงู, ทุ่งหว้า, มะนัง</div>
                    <div>• คำนวณคะแนนความพร้อม (Readiness Score) และระดับความเสี่ยงครบถ้วน</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>การเชื่อมต่อ Google API</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    แอปพลิเคชันรองรับการสร้าง Google Sheet โดยตรงผ่าน Google Sheets API v4 พร้อมตั้งค่าหัวตารางสีเขียว และแบ่งกลุ่มตามอำเภอ
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowSheetsModal(true)}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center space-x-2 shadow-xs border border-teal-800 transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>เปิดเครื่องมือซิงค์ Google Sheets</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI ADVISOR */}
        {activeTab === 'ai-advisor' && (
          <div className="animate-in fade-in duration-200 max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    AI Clinical & Strategic AED Auditor สำหรับผู้บริหาร สสจ.สตูล
                  </h2>
                  <p className="text-xs text-slate-500">
                    วิเคราะห์ช่องว่างความพร้อมใช้เครื่อง AED ใน 7 อำเภอ และวางแผนจัดซื้อจัดจ้างวัสดุสิ้นเปลืองล่วงหน้า
                  </p>
                </div>
              </div>

              <div className="text-center py-6">
                <button
                  onClick={() => setShowAiModal(true)}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm border border-teal-800 transition-all active:scale-95"
                >
                  เปิดหน้าต่างวิเคราะห์และสร้างรายงานสรุปเชิงยุทธศาสตร์
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedRecordForDetail && (
        <AedDetailModal
          record={selectedRecordForDetail}
          onClose={() => setSelectedRecordForDetail(null)}
          onEdit={(r) => {
            setSelectedRecordForDetail(null);
            setEditingRecord(r);
            setActiveTab('survey');
          }}
          onPrintCard={(r) => {
            setSelectedRecordForDetail(null);
            setSelectedRecordForPrint(r);
          }}
        />
      )}

      {/* Printable Card Modal */}
      {selectedRecordForPrint && (
        <AedInspectionCardModal
          record={selectedRecordForPrint}
          onClose={() => setSelectedRecordForPrint(null)}
        />
      )}

      {/* AI Advisor Modal */}
      {showAiModal && (
        <AiConsultantModal
          records={records}
          onClose={() => setShowAiModal(false)}
        />
      )}

      {/* Google Sheets Sync Modal */}
      {showSheetsModal && (
        <GoogleSheetsSyncModal
          records={records}
          onClose={() => setShowSheetsModal(false)}
          googleConnected={googleConnected}
          onConnectGoogle={handleConnectGoogle}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500 text-center no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">
              ระบบทำเนียบความพร้อมใช้เครื่อง AED จังหวัดสตูล
            </span>
          </div>
          <div>
            ตามเกณฑ์มาตรฐาน สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) และ สมาคมแพทย์โรคหัวใจแห่งประเทศไทย
          </div>
        </div>
      </footer>
    </div>
  );
}
