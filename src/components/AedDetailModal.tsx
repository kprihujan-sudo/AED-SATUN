import React from 'react';
import { AedRecord } from '../types';
import { 
  HeartPulse, 
  MapPin, 
  Battery, 
  Zap, 
  BriefcaseMedical, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  Printer, 
  FileEdit, 
  ShieldCheck, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface AedDetailModalProps {
  record: AedRecord;
  onClose: () => void;
  onEdit: (record: AedRecord) => void;
  onPrintCard: (record: AedRecord) => void;
}

export const AedDetailModal: React.FC<AedDetailModalProps> = ({
  record,
  onClose,
  onEdit,
  onPrintCard
}) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const battDays = record.batteryExpiryDate 
    ? Math.ceil((new Date(record.batteryExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : 999;
  const padsDays = record.adultPadsExpiryDate 
    ? Math.ceil((new Date(record.adultPadsExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full border border-slate-200 shadow-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-md text-xs font-bold font-mono border border-slate-200">
                {record.id}
              </span>
              <span className="px-2.5 py-0.5 bg-teal-50 text-teal-800 rounded-md text-xs font-bold border border-teal-200">
                อ.{record.district}
              </span>
              <span className="text-xs text-slate-500 font-medium">{record.facilityType}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1.5">{record.facilityName}</h3>
            <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{record.installationLocation}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              record.readinessLevel === 'READY' ? 'bg-teal-50 text-teal-800 border-teal-200' :
              record.readinessLevel === 'WARNING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              {record.readinessScore}% - {record.readinessLevel === 'READY' ? 'พร้อมใช้สมบูรณ์' : record.readinessLevel === 'WARNING' ? 'มีข้อควรระวัง' : 'ไม่พร้อมใช้งาน'}
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Readiness Diagnostics Alert */}
        {(record.issuesList && record.issuesList.length > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>ข้อสังเกต / ประเด็นที่ต้องเฝ้าระวังหรือแก้ไข ({record.issuesList.length} รายการ):</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-800 pl-6 list-disc">
              {record.issuesList.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* 1. Device & Specs */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 border-b border-slate-200 pb-1.5">
              <HeartPulse className="w-4 h-4 text-teal-700" />
              <span>ข้อมูลจำเพาะของเครื่อง</span>
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ยี่ห้อ & รุ่น:</span> <span className="font-bold">{record.brand} {record.model}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Serial Number:</span> <span className="font-mono font-bold">{record.serialNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ปีจัดซื้อ / ได้รับ:</span> <span>พ.ศ. {record.procurementYear || '-'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">แหล่งงบประมาณ:</span> <span>{record.ownership}</span></div>
              {record.gpsUrl && (
                <div className="pt-1">
                  <a href={record.gpsUrl} target="_blank" rel="noreferrer" className="text-teal-700 font-bold hover:underline flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>เปิดพิกัดใน Google Maps ({record.latitude}, {record.longitude})</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 2. Battery & Electrical */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 border-b border-slate-200 pb-1.5">
              <Battery className="w-4 h-4 text-teal-700" />
              <span>ระบบไฟและแบตเตอรี่</span>
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">สถานะ Self-test:</span> <span className="font-bold">{record.selfTestStatus}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ระดับแบตเตอรี่:</span> <span className="font-bold">{record.batteryLevel}</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">วันหมดอายุแบตเตอรี่:</span> 
                <span className={`font-bold ${battDays <= 90 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {record.batteryExpiryDate} ({battDays >= 0 ? `เหลือ ${battDays} วัน` : 'หมดอายุแล้ว'})
                </span>
              </div>
            </div>
          </div>

          {/* 3. Electrode Pads */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 border-b border-slate-200 pb-1.5">
              <Zap className="w-4 h-4 text-teal-700" />
              <span>แผ่นนำไฟฟ้า (Electrode Pads)</span>
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">วันหมดอายุแผ่นผู้ใหญ่:</span>
                <span className={`font-bold ${padsDays <= 90 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {record.adultPadsExpiryDate} ({padsDays >= 0 ? `เหลือ ${padsDays} วัน` : 'หมดอายุแล้ว'})
                </span>
              </div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">สภาพซองแผ่น:</span> <span>{record.adultPadsStatus === 'INTACT' ? 'สมบูรณ์พร้อมใช้' : record.adultPadsStatus}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ระบบช่วยชีวิตเด็ก:</span> <span>{record.hasPediatricPads || record.pediatricModeType ? 'มีพร้อมใช้' : 'ไม่มี'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">แผ่นสำรอง (Spare Pads):</span> <span>{record.hasSparePads ? 'มีสำรอง' : 'ไม่มีสำรอง'}</span></div>
            </div>
          </div>

          {/* 4. Custodian & Training */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 border-b border-slate-200 pb-1.5">
              <UserCheck className="w-4 h-4 text-teal-700" />
              <span>ผู้ดูแล & การฝึกอบรม</span>
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ผู้รับผิดชอบ:</span> <span className="font-bold">{record.custodianName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">ตำแหน่ง:</span> <span>{record.custodianPosition}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">เบอร์โทรศัพท์:</span> <span className="font-bold text-teal-800">{record.custodianPhone}</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">การอบรม CPR & AED:</span> 
                <span className={`font-bold ${record.staffTrainedCprAed ? 'text-teal-700' : 'text-rose-600'}`}>
                  {record.staffTrainedCprAed ? 'ผ่านการอบรมแล้ว' : 'ยังไม่ผ่าน/เกิน 2 ปี'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ready Kit & Cabinet Checklist Status */}
        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
            <BriefcaseMedical className="w-4 h-4 text-teal-700" />
            <span>รายการอุปกรณ์เสริมและตู้เก็บประจำจุด</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.rescueKit?.traumaShears ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              <span className="font-bold">{record.rescueKit?.traumaShears ? '✓' : '✗'}</span>
              <span>กรรไกรตัดเสื้อ</span>
            </div>
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.rescueKit?.razor ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              <span className="font-bold">{record.rescueKit?.razor ? '✓' : '✗'}</span>
              <span>มีดโกนขนหน้าอก</span>
            </div>
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.rescueKit?.medicalGloves ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              <span className="font-bold">{record.rescueKit?.medicalGloves ? '✓' : '✗'}</span>
              <span>ถุงมือยางแพทย์</span>
            </div>
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.rescueKit?.cprMaskOrShield ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              <span className="font-bold">{record.rescueKit?.cprMaskOrShield ? '✓' : '✗'}</span>
              <span>หน้ากาก CPR</span>
            </div>
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.rescueKit?.towelOrWipes ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              <span className="font-bold">{record.rescueKit?.towelOrWipes ? '✓' : '✗'}</span>
              <span>ผ้าแห้งเช็ดเหงื่อ</span>
            </div>
            <div className={`p-2.5 rounded-lg flex items-center space-x-2 border ${record.cabinet?.cabinetUnlocked ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-rose-50 text-rose-900 border-rose-200'}`}>
              <span className="font-bold">{record.cabinet?.cabinetUnlocked ? '✓' : '⚠️'}</span>
              <span>ตู้ไม่ล็อคกุญแจ</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className="text-[11px] text-slate-400 font-medium">
            ตรวจล่าสุด: {record.lastInspectionDate} | ครบกำหนดตรวจครั้งถัดไป: {record.nextInspectionDue}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onPrintCard(record);
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ป้ายตู้ AED</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(record);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all shadow-sm border border-teal-800"
            >
              <FileEdit className="w-4 h-4" />
              <span>แก้ไขข้อมูล / ตรวจซ้ำ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
