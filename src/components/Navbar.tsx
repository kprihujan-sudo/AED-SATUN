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
      {/* Top Utility Strip - Slim & Proportional */}
      <div className="bg-teal-800 text-white text-[11px] sm:text-xs py-1 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 min-w-0 truncate">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-teal-700 text-teal-100 border border-teal-600 shrink-0">
              สสจ.สตูล × สพฉ.
            </span>
            <span className="text-teal-200/80 hidden md:inline">|</span>
            <span className="text-teal-50 font-medium truncate">
              ระบบทำเนียบ & สำรวจความพร้อมเครื่องกระตุกหัวใจอัตโนมัติ (AED) ประจำปี 2569
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="flex items-center space-x-1.5 bg-teal-900/50 text-teal-100 px-2 py-0.5 rounded text-[11px] border border-teal-700/50">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>
                ความพร้อม <strong className="text-white">{readyPercentage}%</strong> ({totalAeds} เครื่อง)
              </span>
            </div>

            <button
              onClick={onConnectGoogle}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center space-x-1 border ${
                googleConnected
                  ? 'bg-teal-700/70 text-teal-100 border-teal-600 hover:bg-teal-700'
                  : 'bg-white text-teal-900 border-teal-200 hover:bg-teal-50'
              }`}
              title="เชื่อมต่อ Google Workspace"
            >
              <FileSpreadsheet className="w-3 h-3 text-teal-300" />
              <span className="hidden sm:inline">{googleConnected ? 'Google ซิงค์แล้ว' : 'ต่อ Google'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Optimized height and proportions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-15 gap-2 sm:gap-4">
          {/* Brand Logo & Identification */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none shrink-0" 
            onClick={() => setActiveTab('registry')}
          >
            <div className="w-9 h-9 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-xs border border-teal-800 shrink-0">
              <HeartPulse className="w-5 h-5 animate-pulse text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                  SATUN AED
                </span>
                <span className="px-1.5 py-0.2 bg-teal-50 text-teal-800 rounded text-[10px] font-bold border border-teal-200">
                  จ.สตูล
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline leading-none">
                มาตรฐาน สพฉ. & สธ.
              </span>
            </div>
          </div>

          {/* Desktop & Tablet Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80">
            <button
              onClick={() => setActiveTab('registry')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'registry'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>ทำเนียบ & แดชบอร์ด</span>
            </button>

            <button
              onClick={() => setActiveTab('survey')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'survey'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>แบบสำรวจ</span>
            </button>

            <button
              onClick={() => setActiveTab('google-form-schema')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'google-form-schema'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Google Form</span>
            </button>

            <button
              onClick={() => setActiveTab('sheets-sync')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'sheets-sync'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Google Sheets</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-advisor')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'ai-advisor'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>AI วิเคราะห์</span>
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onOpenNewSurvey}
              className="inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-xs border border-teal-800 transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">บันทึกสำรวจเครื่องใหม่</span>
              <span className="lg:hidden">บันทึกสำรวจ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex overflow-x-auto scrollbar-none border-t border-slate-200 px-3 py-1.5 bg-slate-50 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('registry')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-bold flex items-center space-x-1 ${
            activeTab === 'registry' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>แดชบอร์ด</span>
        </button>
        <button
          onClick={() => setActiveTab('survey')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-bold flex items-center space-x-1 ${
            activeTab === 'survey' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <ClipboardCheck className="w-3 h-3" />
          <span>แบบสำรวจ</span>
        </button>
        <button
          onClick={() => setActiveTab('google-form-schema')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-bold flex items-center space-x-1 ${
            activeTab === 'google-form-schema' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <FileCode2 className="w-3 h-3" />
          <span>Google Form</span>
        </button>
        <button
          onClick={() => setActiveTab('sheets-sync')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-bold flex items-center space-x-1 ${
            activeTab === 'sheets-sync' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <FileSpreadsheet className="w-3 h-3" />
          <span>Google Sheets</span>
        </button>
        <button
          onClick={() => setActiveTab('ai-advisor')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-bold flex items-center space-x-1 ${
            activeTab === 'ai-advisor' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-200/60'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>AI วิเคราะห์</span>
        </button>
      </div>
    </header>
  );
};

