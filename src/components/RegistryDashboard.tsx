import React, { useState } from 'react';
import { 
  AedRecord, 
  SatunDistrict, 
  HealthFacilityType, 
  ReadinessLevel 
} from '../types';
import { SATUN_DISTRICTS } from '../data/satunLocations';
import { exportAedRecordsToCsv, downloadCsvFile } from '../utils/googleWorkspace';
import { 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  MapPin, 
  ExternalLink, 
  QrCode, 
  FileEdit, 
  Trash2, 
  Eye, 
  Battery, 
  Zap, 
  Sparkles,
  Printer,
  ChevronDown,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

interface RegistryDashboardProps {
  records: AedRecord[];
  onSelectRecord: (record: AedRecord) => void;
  onEditRecord: (record: AedRecord) => void;
  onDeleteRecord: (id: string) => void;
  onOpenNewSurvey: () => void;
  onPrintCard: (record: AedRecord) => void;
  onOpenSheetsSync: () => void;
  selectedStatusFilter?: string;
  onResetStatusFilter?: () => void;
}

export const RegistryDashboard: React.FC<RegistryDashboardProps> = ({
  records,
  onSelectRecord,
  onEditRecord,
  onDeleteRecord,
  onOpenNewSurvey,
  onPrintCard,
  onOpenSheetsSync,
  selectedStatusFilter = 'ALL',
  onResetStatusFilter
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>(selectedStatusFilter);
  const [viewMode, setViewMode] = useState<'TABLE' | 'CARDS'>('TABLE');

  // Filter logic
  const filteredRecords = records.filter(r => {
    // District
    if (districtFilter !== 'ALL' && r.district !== districtFilter) return false;

    // Facility Type
    if (facilityTypeFilter !== 'ALL' && r.facilityType !== facilityTypeFilter) return false;

    // Status
    if (statusFilter === 'READY' && r.readinessLevel !== 'READY') return false;
    if (statusFilter === 'WARNING' && r.readinessLevel !== 'WARNING') return false;
    if (statusFilter === 'CRITICAL' && r.readinessLevel !== 'CRITICAL') return false;
    if (statusFilter === 'EXPIRING_SOON') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let expSoon = false;
      if (r.batteryExpiryDate) {
        const diff = (new Date(r.batteryExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (diff >= 0 && diff <= 90) expSoon = true;
      }
      if (r.adultPadsExpiryDate) {
        const diff = (new Date(r.adultPadsExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (diff >= 0 && diff <= 90) expSoon = true;
      }
      if (!expSoon) return false;
    }

    // Search query
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const match = 
        r.facilityName.toLowerCase().includes(term) ||
        r.installationLocation.toLowerCase().includes(term) ||
        r.serialNumber.toLowerCase().includes(term) ||
        r.brand.toLowerCase().includes(term) ||
        r.model.toLowerCase().includes(term) ||
        r.custodianName.toLowerCase().includes(term) ||
        r.district.toLowerCase().includes(term);
      if (!match) return false;
    }

    return true;
  });

  const handleExportCsv = () => {
    const csv = exportAedRecordsToCsv(filteredRecords);
    downloadCsvFile(csv, `satun-aed-registry-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-5">
      {/* Control Bar: Search & Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาชื่อหน่วยบริการ, รพ.สต., ตำแหน่งติดตั้ง, Serial Number, ยี่ห้อ หรือชื่อผู้ดูแล..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
              title="ส่งออกเป็นไฟล์ CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>ส่งออก CSV</span>
            </button>

            <button
              onClick={onOpenSheetsSync}
              className="px-3.5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
              title="ส่งออก / ซิงค์ไปยัง Google Sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
              <span>Google Sheets</span>
            </button>

            <button
              onClick={onOpenNewSurvey}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-sm border border-teal-800 flex items-center space-x-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>สำรวจเครื่องใหม่</span>
            </button>
          </div>
        </div>

        {/* District Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-1 border-t border-slate-100 pt-3">
          <button
            onClick={() => setDistrictFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              districtFilter === 'ALL'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
            }`}
          >
            ทุกอำเภอ ({records.length})
          </button>
          {SATUN_DISTRICTS.map(d => {
            const count = records.filter(r => r.district === d.name).length;
            return (
              <button
                key={d.code}
                onClick={() => setDistrictFilter(d.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  districtFilter === d.name
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                }`}
              >
                อ.{d.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Status & Facility Filter dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">สถานะ:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="ALL">ทุกสถานะความพร้อม</option>
              <option value="READY">พร้อมใช้สมบูรณ์ (100%)</option>
              <option value="WARNING">มีข้อควรระวัง (Attention)</option>
              <option value="CRITICAL">ไม่พร้อมใช้ / ชำรุด (Critical)</option>
              <option value="EXPIRING_SOON">หมดอายุใน 90 วัน</option>
            </select>

            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] ml-2">ประเภท:</span>
            <select
              value={facilityTypeFilter}
              onChange={(e) => setFacilityTypeFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none max-w-xs truncate"
            >
              <option value="ALL">ทุกประเภทหน่วยบริการ</option>
              <option value="รพศ./รพท./รพช. (โรงพยาบาล)">โรงพยาบาล (รพศ./รพช.)</option>
              <option value="รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)">รพ.สต. / สอน.</option>
              <option value="สสจ. / สสอ. (สำนักงานสาธารณสุข)">สสจ. / สสอ.</option>
              <option value="ศูนย์บริการสาธารณสุข / คลินิกชุมชนอบอุ่น">ศูนย์บริการสาธารณสุข</option>
              <option value="ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669">ศูนย์กู้ชีพ 1669 / EMS</option>
              <option value="จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.">จุดบริการสาธารณะ / ท่าเรือ</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">แสดงผล: <strong>{filteredRecords.length}</strong> จาก {records.length} เครื่อง</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('TABLE')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'TABLE' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'}`}
              >
                ตาราง
              </button>
              <button
                onClick={() => setViewMode('CARDS')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'CARDS' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'}`}
              >
                การ์ด
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">ไม่พบรายการเครื่อง AED ตามเงื่อนไขที่ค้นหา</h3>
          <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหา หรือปรับตัวกรองอำเภอ/สถานะความพร้อม</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setDistrictFilter('ALL');
              setStatusFilter('ALL');
              setFacilityTypeFilter('ALL');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-200"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : viewMode === 'TABLE' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">รหัส / อำเภอ</th>
                  <th className="py-3.5 px-4">ชื่อหน่วยบริการ & จุดติดตั้ง</th>
                  <th className="py-3.5 px-4">รุ่น & S/N</th>
                  <th className="py-3.5 px-4">สถานะความพร้อม</th>
                  <th className="py-3.5 px-4">วันหมดอายุ แบต / แผ่น</th>
                  <th className="py-3.5 px-4">ผู้ดูแล & ติดต่อ</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((r) => {
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  const battDays = r.batteryExpiryDate 
                    ? Math.ceil((new Date(r.batteryExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    : 999;
                  const padsDays = r.adultPadsExpiryDate
                    ? Math.ceil((new Date(r.adultPadsExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    : 999;

                  return (
                    <tr 
                      key={r.id}
                      className="hover:bg-teal-50/20 transition-all cursor-pointer group"
                      onClick={() => onSelectRecord(r)}
                    >
                      {/* Code & District */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{r.id}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">
                          อ.{r.district}
                        </span>
                      </td>

                      {/* Facility & Location */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                          {r.facilityName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{r.installationLocation}</span>
                        </div>
                      </td>

                      {/* Brand & S/N */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-800">{r.brand} {r.model}</div>
                        <div className="text-[10px] font-mono text-slate-400">S/N: {r.serialNumber}</div>
                      </td>

                      {/* Readiness Score & Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                            r.readinessLevel === 'READY' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                            r.readinessLevel === 'WARNING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            'bg-rose-50 text-rose-800 border-rose-200'
                          }`}>
                            {r.readinessScore}% - {r.readinessLevel === 'READY' ? 'พร้อมใช้' : r.readinessLevel === 'WARNING' ? 'ควรระวัง' : 'ไม่พร้อมใช้'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          ตรวจล่าสุด: {r.lastInspectionDate}
                        </div>
                      </td>

                      {/* Expiration status */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[11px]">
                        <div className="flex items-center space-x-1">
                          <Battery className={`w-3.5 h-3.5 ${battDays <= 0 ? 'text-rose-500' : battDays <= 90 ? 'text-amber-500' : 'text-teal-600'}`} />
                          <span className={battDays <= 0 ? 'text-rose-600 font-bold' : battDays <= 90 ? 'text-amber-600 font-semibold' : 'text-slate-600'}>
                            แบต: {r.batteryExpiryDate} {battDays <= 90 && battDays > 0 ? `(อีก ${battDays} วัน)` : battDays <= 0 ? '(หมดอายุ!)' : ''}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mt-0.5">
                          <Zap className={`w-3.5 h-3.5 ${padsDays <= 0 ? 'text-rose-500' : padsDays <= 90 ? 'text-amber-500' : 'text-teal-600'}`} />
                          <span className={padsDays <= 0 ? 'text-rose-600 font-bold' : padsDays <= 90 ? 'text-amber-600 font-semibold' : 'text-slate-600'}>
                            แผ่น: {r.adultPadsExpiryDate} {padsDays <= 90 && padsDays > 0 ? `(อีก ${padsDays} วัน)` : padsDays <= 0 ? '(หมดอายุ!)' : ''}
                          </span>
                        </div>
                      </td>

                      {/* Custodian */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[11px]">
                        <div className="font-semibold text-slate-800">{r.custodianName}</div>
                        <div className="text-slate-500">{r.custodianPhone}</div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => onPrintCard(r)}
                            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all"
                            title="พิมพ์ป้ายตรวจเช็คประจำตู้ (Inspection Card & QR)"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditRecord(r)}
                            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all"
                            title="แก้ไขข้อมูล / บันทึกผลตรวจใหม่"
                          >
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`ยืนยันการลบเครื่อง ${r.id} (${r.facilityName}) หรือไม่?`)) {
                                onDeleteRecord(r.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="ลบรายการ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecords.map(r => (
            <div
              key={r.id}
              onClick={() => onSelectRecord(r)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-sm hover:border-teal-400 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-bold">
                    {r.id}
                  </span>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    อ.{r.district}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  r.readinessLevel === 'READY' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                  r.readinessLevel === 'WARNING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                  'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {r.readinessScore}%
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 truncate">{r.facilityName}</h4>
                <p className="text-xs text-slate-500 truncate flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{r.installationLocation}</span>
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg space-y-1.5 text-xs text-slate-700 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">เครื่อง:</span>
                  <span className="font-bold">{r.brand} {r.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">วันหมดอายุแบต:</span>
                  <span className="font-bold">{r.batteryExpiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">วันหมดอายุแผ่น:</span>
                  <span className="font-bold">{r.adultPadsExpiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">ผู้ดูแล:</span>
                  <span className="font-medium">{r.custodianName} ({r.custodianPhone})</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] text-slate-400 font-medium">ตรวจล่าสุด: {r.lastInspectionDate}</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onPrintCard(r)}
                    className="p-1.5 text-slate-500 hover:text-teal-700 rounded-md"
                    title="ป้ายตรวจเช็คประจำตู้"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditRecord(r)}
                    className="p-1.5 text-slate-500 hover:text-teal-700 rounded-md"
                    title="แก้ไข"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
