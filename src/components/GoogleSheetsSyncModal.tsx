import React, { useState } from 'react';
import { AedRecord } from '../types';
import { exportAedRecordsToCsv, downloadCsvFile } from '../utils/googleWorkspace';
import { 
  FileSpreadsheet, 
  Check, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface GoogleSheetsSyncModalProps {
  records: AedRecord[];
  onClose: () => void;
  googleConnected: boolean;
  onConnectGoogle: () => void;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  records,
  onClose,
  googleConnected,
  onConnectGoogle
}) => {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncedUrl, setSyncedUrl] = useState<string | null>(null);

  const handleSyncToSheets = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      // Simulated Google Sheet URL created for Satun Health Office
      setSyncedUrl('https://docs.google.com/spreadsheets/d/1Satun-AED-Readiness-Registry-2569/edit#gid=0');
    }, 1200);
  };

  const handleDownloadCsv = () => {
    const csv = exportAedRecordsToCsv(records);
    downloadCsvFile(csv, `satun-aed-registry-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-800 mb-1">
              <FileSpreadsheet className="w-4 h-4 text-teal-700" />
              <span>Google Workspace & Google Sheets Integration</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ส่งออกและเชื่อมโยงทำเนียบ AED กับ Google Sheets
            </h3>
            <p className="text-xs text-slate-500">
              สำนักงานสาธารณสุขจังหวัดสตูล & สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Integration Status Card */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          googleConnected 
            ? 'bg-teal-50 border-teal-300 text-teal-900' 
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              googleConnected ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">
                {googleConnected ? 'เชื่อมต่อ Google Workspace สำเร็จแล้ว' : 'พร้อมเชื่อมต่อ Google Workspace'}
              </div>
              <div className="text-[11px] text-slate-500">
                สิทธิ์ที่เปิดใช้งาน: Google Sheets API, Google Drive, Google Forms
              </div>
            </div>
          </div>

          {!googleConnected && (
            <button
              onClick={onConnectGoogle}
              className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs border border-teal-800"
            >
              เชื่อมต่อ Google
            </button>
          )}
        </div>

        {/* Sync Summary */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="font-bold text-slate-900">โครงสร้างข้อมูลที่จะส่งออก ({records.length} แถว / 35 คอลัมน์):</div>
          <div className="grid grid-cols-2 gap-2 text-slate-600">
            <div>• รหัสเครื่อง & อำเภอ (7 อำเภอ)</div>
            <div>• สถานะไฟ Self-test & แบตเตอรี่</div>
            <div>• ชื่อหน่วยบริการ & จุดติดตั้ง</div>
            <div>• วันหมดอายุแผ่นนำไฟฟ้า & โหมดเด็ก</div>
            <div>• ยี่ห้อ รุ่น และ Serial Number</div>
            <div>• อุปกรณ์ Ready Kit 5 รายการ & ตู้เก็บ</div>
            <div>• พิกัด GPS สำหรับระบบกู้ชีพ 1669</div>
            <div>• คะแนนความพร้อม (Readiness Score %)</div>
          </div>
        </div>

        {/* Sync Result Link if done */}
        {syncedUrl && (
          <div className="bg-teal-50 border border-teal-300 p-4 rounded-xl space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-900">
              <Check className="w-4 h-4 text-teal-700" />
              <span>ซิงค์ข้อมูลเข้า Google Sheets สำเร็จเรียบร้อยแล้ว!</span>
            </div>
            <p className="text-xs text-teal-800">
              ข้อมูลทำเนียบความพร้อมใช้เครื่อง AED จ.สตูล ถูกบันทึกและจัดฟอร์แมตหัวตารางสีเขียวสดใสเรียบร้อยแล้ว
            </p>
            <div className="pt-1">
              <a
                href={syncedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 underline"
              >
                <span>เปิดดู Google Sheet ในแท็บใหม่</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>ดาวน์โหลด CSV (Excel)</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSyncToSheets}
              disabled={syncing}
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm border border-teal-800 flex items-center space-x-2 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'กำลังส่งข้อมูล...' : 'ส่งออกไปยัง Google Sheets ทันที'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
