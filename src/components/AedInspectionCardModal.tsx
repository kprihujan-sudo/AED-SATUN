import React from 'react';
import { AedRecord } from '../types';
import { 
  HeartPulse, 
  Printer, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  QrCode,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface AedInspectionCardModalProps {
  record: AedRecord;
  onClose: () => void;
}

export const AedInspectionCardModal: React.FC<AedInspectionCardModalProps> = ({
  record,
  onClose
}) => {
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-xl p-6 space-y-5 max-h-[95vh] overflow-y-auto">
        {/* Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Printer className="w-5 h-5 text-teal-700" />
              <span>บัตรบันทึกการตรวจเช็คความพร้อมใช้ประจำตู้ AED (Cabinet Tag)</span>
            </h3>
            <p className="text-xs text-slate-500">
              สำหรับพิมพ์เคลือบพลาสติกหรือใส่ซองติดไว้ที่หน้าตู้ AED ประจำหน่วยบริการ
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 shadow-sm border border-teal-800 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์เอกสารนี้ (Print Tag)</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Card Container */}
        <div id="printable-aed-card" className="border-4 border-teal-800 rounded-xl p-6 bg-white space-y-4 text-slate-900">
          {/* Tag Header */}
          <div className="flex items-center justify-between border-b-2 border-teal-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center text-white shadow-xs">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-teal-900 leading-tight">
                  บัตรตรวจเช็คความพร้อมใช้เครื่อง AED ประจำตู้
                </h2>
                <p className="text-xs font-bold text-slate-700">
                  สำนักงานสาธารณสุขจังหวัดสตูล | สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-bold bg-teal-50 text-teal-900 px-2.5 py-1 rounded-md border border-teal-300">
                {record.id}
              </div>
              <div className="text-[10px] text-slate-500 font-bold mt-0.5">อ.{record.district}</div>
            </div>
          </div>

          {/* Location & Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 font-medium">หน่วยบริการ / สถานที่:</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{record.facilityName}</div>
              <div className="text-slate-600 text-[11px] mt-0.5">{record.installationLocation}</div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">ข้อมูลเครื่อง & วันหมดอายุ:</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{record.brand} {record.model}</div>
              <div className="text-[11px] text-slate-600">S/N: <span className="font-mono font-bold">{record.serialNumber}</span></div>
              <div className="text-[11px] text-teal-900 font-medium mt-0.5">
                แบตหมดอายุ: <strong className="text-teal-800">{record.batteryExpiryDate}</strong> | แผ่นหมดอายุ: <strong className="text-teal-800">{record.adultPadsExpiryDate}</strong>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-rose-50 border-2 border-rose-400 p-3 rounded-lg flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-black text-rose-900 text-sm flex items-center space-x-1.5">
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>พบผู้หมดสติ ไม่หายใจ โทร 1669 ทันที!</span>
              </div>
              <p className="text-rose-800 text-[11px]">
                นำเครื่อง AED มาเปิดสวิตช์ แปะแผ่นนำไฟฟ้า และทำ CPR ปั๊มหัวใจตามคำแนะนำของเครื่อง
              </p>
            </div>
            <div className="text-center bg-rose-600 text-white font-black text-lg px-3 py-1.5 rounded-lg shrink-0">
              1669
            </div>
          </div>

          {/* Monthly Inspection Checklist Grid */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>ตารางบันทึกการตรวจเช็คประจำเดือน (ปี 2569 / 2026):</span>
              <span className="text-[10px] text-slate-500 font-normal">เกณฑ์: ไฟเขียวปกติ, แบตไม่หมดอายุ, ซองแผ่นสมบูรณ์</span>
            </div>

            <table className="w-full border-collapse border border-slate-300 text-center text-xs">
              <thead className="bg-teal-50 text-teal-950 font-bold text-[11px] border border-slate-300">
                <tr>
                  <th className="border border-slate-300 p-1.5">เดือน</th>
                  <th className="border border-slate-300 p-1.5">สถานะไฟ Self-test</th>
                  <th className="border border-slate-300 p-1.5">แบตเตอรี่ & แผ่น</th>
                  <th className="border border-slate-300 p-1.5">Ready Kit & ตู้</th>
                  <th className="border border-slate-300 p-1.5">ผู้ตรวจเช็ค</th>
                  <th className="border border-slate-300 p-1.5">ลายมือชื่อ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {months.map((m, idx) => (
                  <tr key={idx} className="h-6">
                    <td className="border border-slate-300 font-bold bg-slate-50">{m}</td>
                    <td className="border border-slate-300">{idx === 7 ? '✓ ไฟเขียว' : ''}</td>
                    <td className="border border-slate-300">{idx === 7 ? '✓ ปกติ' : ''}</td>
                    <td className="border border-slate-300">{idx === 7 ? '✓ ครบ' : ''}</td>
                    <td className="border border-slate-300">{idx === 7 ? record.custodianName.split(' ')[0] : ''}</td>
                    <td className="border border-slate-300"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Custodian & Contact Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium">ผู้รับผิดชอบดูแล: </span>
              <strong className="text-slate-900">{record.custodianName}</strong> ({record.custodianPosition})
              <span className="text-slate-500 ml-2 font-medium">โทร: </span>
              <strong className="text-teal-800 font-bold">{record.custodianPhone}</strong>
            </div>

            <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-medium">
              <QrCode className="w-4 h-4 text-slate-700" />
              <span>สแกนตรวจสอบทำเนียบ จ.สตูล</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
