import React from 'react';
import { AedRecord } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BatteryWarning, 
  CalendarClock, 
  ShieldCheck, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface StatsOverviewProps {
  records: AedRecord[];
  onFilterByStatus?: (status: 'ALL' | 'READY' | 'WARNING' | 'CRITICAL' | 'EXPIRING_SOON') => void;
  currentFilter?: string;
  onOpenAiAudit?: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  records,
  onFilterByStatus,
  currentFilter = 'ALL',
  onOpenAiAudit
}) => {
  const total = records.length;
  const readyCount = records.filter(r => r.readinessLevel === 'READY').length;
  const warningCount = records.filter(r => r.readinessLevel === 'WARNING').length;
  const criticalCount = records.filter(r => r.readinessLevel === 'CRITICAL').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Expiring in 90 days
  const expiringSoonCount = records.filter(r => {
    if (r.batteryExpiryDate) {
      const diff = (new Date(r.batteryExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 90) return true;
    }
    if (r.adultPadsExpiryDate) {
      const diff = (new Date(r.adultPadsExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 90) return true;
    }
    return false;
  }).length;

  const trainedStaffAeds = records.filter(r => r.staffTrainedCprAed).length;
  const readyRate = total > 0 ? Math.round((readyCount / total) * 100) : 0;
  const trainingRate = total > 0 ? Math.round((trainedStaffAeds / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Top Banner - Geometric Balance */}
      <div className="bg-teal-700 rounded-xl p-5 sm:p-6 text-white shadow-sm border border-teal-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <ShieldCheck className="w-64 h-64 text-teal-200" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-600 rounded-full text-teal-100 text-xs font-semibold mb-2.5 border border-teal-500 shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>ภาพรวมความพร้อมใช้งาน 7 อำเภอ จังหวัดสตูล</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              ทำเนียบความพร้อมใช้เครื่องฟื้นคืนคลื่นหัวใจ AED จังหวัดสตูล
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-2xl leading-relaxed">
              ติดตามสถานะความพร้อมของเครื่อง แบตเตอรี่ แผ่นนำไฟฟ้า (Adult/Pediatric Pads) 
              และอุปกรณ์ช่วยชีวิตตามเกณฑ์มาตรฐานสถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAiAudit}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center space-x-2 active:scale-95 border border-amber-300"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>AI วิเคราะห์ความพร้อมและแจ้งเตือน</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid - Geometric Balance */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total AEDs */}
        <div 
          onClick={() => onFilterByStatus && onFilterByStatus('ALL')}
          className={`cursor-pointer bg-white p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            currentFilter === 'ALL' ? 'border-teal-600 ring-2 ring-teal-600/20 bg-teal-50/30' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>เครื่องทั้งหมด</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-700 text-[11px] font-bold">7 อำเภอ</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total}</span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">พร้อมใช้ {readyRate}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 truncate">ครอบคลุม รพ./รพ.สต./จุดท่องเที่ยว</p>
        </div>

        {/* Level 1: Fully Ready */}
        <div 
          onClick={() => onFilterByStatus && onFilterByStatus('READY')}
          className={`cursor-pointer bg-white p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            currentFilter === 'READY' ? 'border-teal-600 ring-2 ring-teal-600/20 bg-teal-50/30' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>พร้อมใช้สมบูรณ์</span>
            </span>
            <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded text-[10px] font-bold">100%</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700">{readyCount}</span>
            <span className="text-xs font-medium text-slate-500">เครื่อง</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 truncate">ไฟเขียว แบต/แผ่นปกติ อุปกรณ์ครบ</p>
        </div>

        {/* Level 2: Warning */}
        <div 
          onClick={() => onFilterByStatus && onFilterByStatus('WARNING')}
          className={`cursor-pointer bg-white p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            currentFilter === 'WARNING' ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/30' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>มีข้อควรระวัง</span>
            </span>
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">Attention</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">{warningCount}</span>
            <span className="text-xs font-medium text-slate-500">เครื่อง</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 truncate">ใกล้หมดอายุ / ขาดอุปกรณ์เสริมบางชิ้น</p>
        </div>

        {/* Level 3: Critical */}
        <div 
          onClick={() => onFilterByStatus && onFilterByStatus('CRITICAL')}
          className={`cursor-pointer bg-white p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            currentFilter === 'CRITICAL' ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-rose-800 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>ไม่พร้อมใช้ / วิกฤต</span>
            </span>
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-bold">Critical</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">{criticalCount}</span>
            <span className="text-xs font-medium text-slate-500">เครื่อง</span>
          </div>
          <p className="text-[11px] text-rose-500 mt-1.5 font-medium truncate">หมดอายุ/ชำรุด ต้องแก้ไขด่วน</p>
        </div>

        {/* Expiring in 90 Days */}
        <div 
          onClick={() => onFilterByStatus && onFilterByStatus('EXPIRING_SOON')}
          className={`col-span-2 sm:col-span-2 lg:col-span-1 cursor-pointer bg-white p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            currentFilter === 'EXPIRING_SOON' ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/30' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-orange-800 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <BatteryWarning className="w-4 h-4 text-orange-600" />
              <span>หมดอายุใน 90 วัน</span>
            </span>
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded text-[10px] font-bold">≤3 เดือน</span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">{expiringSoonCount}</span>
            <span className="text-xs font-medium text-slate-500">รายการ</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 truncate">เตรียมงบ/ทำเรื่องเบิกเปลี่ยนล่วงหน้า</p>
        </div>
      </div>
    </div>
  );
};
