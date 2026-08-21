import React from 'react';
import { 
  HeartPulse, 
  FileSpreadsheet, 
  ClipboardCheck, 
  LayoutDashboard, 
  FileCode2, 
  Sparkles, 
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'survey' | 'registry' | 'google-form-schema' | 'sheets-sync' | 'ai-advisor';
  setActiveTab: (tab: 'survey' | 'registry' | 'google-form-schema' | 'sheets-sync' | 'ai-advisor') => void;
  totalAeds: number;
  readyPercentage: number;
  onOpenNewSurvey: () => void;
  googleConnected: boolean;
  onConnectGoogle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalAeds,
  readyPercentage,
  onOpenNewSurvey,
  googleConnected,
  onConnectGoogle
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner - Geometric Balance Teal */}
      <div className="bg-teal-700 text-white px-4 py-2.5 text-xs sm:text-sm shadow-xs border-b border-teal-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-600 text-teal-50 border border-teal-500 shadow-xs">
              สสจ. สตูล & สพฉ.
            </span>
            <span className="hidden sm:inline text-teal-200">|</span>
            <span className="text-white font-medium truncate">
              ระบบทำเนียบและสำรวจความพร้อมใช้เครื่องฟื้นคืนคลื่นหัวใจด้วยไฟฟ้าอัตโนมัติ (AED) ประจำปี 2569
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 text-teal-100 bg-teal-800/60 px-2.5 py-1 rounded-lg border border-teal-600/40">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>ความพร้อมรวม: <strong className="text-white">{readyPercentage}%</strong> ({totalAeds} เครื่อง)</span>
            </div>
            <button
              onClick={onConnectGoogle}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs ${
                googleConnected
                  ? 'bg-teal-800 hover:bg-teal-900 text-teal-100 border border-teal-600'
                  : 'bg-white text-teal-800 hover:bg-teal-50 border border-teal-200'
              }`}
              title="เชื่อมต่อ Google Sheets / Forms"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-300" />
              <span>{googleConnected ? 'เชื่อมต่อ Google แล้ว' : 'เชื่อมต่อ Google Workspace'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('registry')}>
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm border border-teal-800">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight tracking-tight">
                  SATUN AED REGISTRY
                </h1>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-md text-[11px] font-bold tracking-wide border border-teal-200">
                  จ.สตูล
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                ทำเนียบและแบบสำรวจมาตรฐานวิชาการ สพฉ. / สธ.
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('registry')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'registry'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ทำเนียบและแดชบอร์ด</span>
            </button>

            <button
              onClick={() => setActiveTab('survey')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'survey'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>แบบสำรวจความพร้อมใช้</span>
            </button>

            <button
              onClick={() => setActiveTab('google-form-schema')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'google-form-schema'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>โครงสร้าง Google Form</span>
            </button>

            <button
              onClick={() => setActiveTab('sheets-sync')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'sheets-sync'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>ส่งออก Google Sheets</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-advisor')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'ai-advisor'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI วิเคราะห์ความพร้อม</span>
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenNewSurvey}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm border border-teal-800 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">บันทึกสำรวจเครื่องใหม่</span>
              <span className="sm:hidden">เพิ่มเครื่อง</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200 px-2 py-1.5 bg-slate-50 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('registry')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'registry' ? 'bg-teal-700 text-white' : 'text-slate-600'
          }`}
        >
          แดชบอร์ด
        </button>
        <button
          onClick={() => setActiveTab('survey')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'survey' ? 'bg-teal-700 text-white' : 'text-slate-600'
          }`}
        >
          แบบสำรวจ
        </button>
        <button
          onClick={() => setActiveTab('google-form-schema')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'google-form-schema' ? 'bg-teal-700 text-white' : 'text-slate-600'
          }`}
        >
          Google Form
        </button>
        <button
          onClick={() => setActiveTab('sheets-sync')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'sheets-sync' ? 'bg-teal-700 text-white' : 'text-slate-600'
          }`}
        >
          Google Sheets
        </button>
        <button
          onClick={() => setActiveTab('ai-advisor')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'ai-advisor' ? 'bg-teal-700 text-white' : 'text-slate-600'
          }`}
        >
          AI แนะนำ
        </button>
      </div>
    </header>
  );
};
