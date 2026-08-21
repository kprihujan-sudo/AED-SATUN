import React, { useState } from 'react';
import { AedRecord } from '../types';
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BrainCircuit, 
  FileText, 
  MapPin, 
  Clock, 
  Download,
  Building2
} from 'lucide-react';

interface AiConsultantModalProps {
  records: AedRecord[];
  onClose: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  records,
  onClose
}) => {
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [report, setReport] = useState<string | null>(null);

  const total = records.length;
  const ready = records.filter(r => r.readinessLevel === 'READY');
  const warning = records.filter(r => r.readinessLevel === 'WARNING');
  const critical = records.filter(r => r.readinessLevel === 'CRITICAL');

  const today = new Date();
  today.setHours(0,0,0,0);

  const expiring90Days = records.filter(r => {
    if (r.batteryExpiryDate) {
      const diff = (new Date(r.batteryExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 90) return true;
    }
    if (r.adultPadsExpiryDate) {
      const diff = (new Date(r.adultPadsExpiryDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 90) return true;
    }
    return false;
  });

  const runAiAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const generated = `📋 รายงานวิเคราะห์ความพร้อมใช้เครื่อง AED และข้อเสนอแนะเชิงยุทธศาสตร์
สำนักงานสาธารณสุขจังหวัดสตูล ประจำปีงบประมาณ 2569
--------------------------------------------------------------------------------

1. สรุปสถานการณ์ภาพรวมจังหวัดสตูล (Executive Summary):
   • จำนวนเครื่อง AED ในทะเบียนทั้งหมด: ${total} เครื่อง
   • ผ่านเกณฑ์พร้อมใช้สมบูรณ์ (100% Ready): ${ready.length} เครื่อง (${Math.round((ready.length/total)*100)}%)
   • อยู่ในเกณฑ์เฝ้าระวัง (Attention/Warning): ${warning.length} เครื่อง (${Math.round((warning.length/total)*100)}%)
   • อยู่ในเกณฑ์วิกฤต/ไม่พร้อมใช้ (Critical/Not Ready): ${critical.length} เครื่อง (${Math.round((critical.length/total)*100)}%)
   • เครื่อง/อุปกรณ์ที่หมดอายุภายใน 90 วัน: ${expiring90Days.length} รายการ

2. จุดเสี่ยงวิกฤตที่ต้องดำเนินการแก้ไขทันที (Immediate Action Required):
${critical.length > 0 ? critical.map((c, i) => `   ${i+1}. [${c.id}] ${c.facilityName} (อ.${c.district}):
      - ปัญหาหลัก: ${c.issuesList.join(', ')}
      - มาตรการด่วน: ปลดล็อคตู้ทันที และเปลี่ยนแบตเตอรี่/แผ่นนำไฟฟ้าด่วนที่สุด`).join('\n') : '   • ไม่พบเครื่องที่มีสถานะวิกฤตเร่งด่วน'}

3. แผนเตรียมความพร้อมด้านวัสดุสิ้นเปลือง (Supply Chain & Procurement Plan):
   • มีแผ่นนำไฟฟ้า/แบตเตอรี่ใกล้หมดอายุใน 3 เดือน จำนวน ${expiring90Days.length} รายการ
   • ข้อเสนอแนะ: สสจ.สตูล ควรเปิดจัดซื้อรวมระดับจังหวัด (Provincial Pool Procurement) เพื่อลดต้นทุนต่อหน่วยของแผ่น Adult/Pediatric Pads และแบตเตอรี่

4. จุดยุทธศาสตร์ท่องเที่ยวและแหล่งสัญจรทางน้ำ (Maritime & Tourism Priority):
   • เกาะหลีเป๊ะ (รพ.สต.เกาะหลีเป๊ะ) & ท่าเรือปากบารา: เป็นจุดที่นักท่องเที่ยวทั้งไทยและต่างชาติหนาแน่น ต้องสำรองชุดแผ่นเด็ก (Pediatric Pads) และตรวจสอบ Alarm ตู้สม่ำเสมอ
   • ด่านพรมแดนวังประจัน (ควนโดน): ต้องห้ามล็อคกุญแจตู้ และจัดซ้อมแผน CPR ให้ จนท.ด่านตรวจคนเข้าเมือง

5. การพัฒนาศักยภาพบุคลากร (Capacity Building):
   • จัดโครงการฝึกอบรม BLS & AED Refresher Course ให้บุคลากร รพ.สต. และผู้ดูแลตู้ใน 7 อำเภออย่างน้อยปีละ 1 ครั้ง`;

      setReport(generated);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full border border-slate-200 shadow-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-800 mb-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>AI Clinical & Biomedical Engineering Advisor</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              ระบบปัญญาประดิษฐ์วิเคราะห์ความพร้อมใช้ AED จ.สตูล
            </h3>
            <p className="text-xs text-slate-500">
              ประมวลผลข้อมูลทำเนียบ 7 อำเภอ ตามเกณฑ์มาตรฐาน สพฉ. และสมาคมแพทย์โรคหัวใจ
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {!report ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-center text-teal-700 mx-auto shadow-xs">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="text-base font-bold text-slate-900">
                พร้อมวิเคราะห์ข้อมูลทำเนียบ {total} เครื่อง ใน 7 อำเภอ
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                AI จะทำการตรวจสอบวันหมดอายุ จุดบกพร่องของตู้เก็บ ความพร้อมสำหรับเด็ก และแนะนำแผนจัดซื้อจัดจ้างล่วงหน้าสำหรับ สสจ. สตูล
              </p>
            </div>
            <button
              onClick={runAiAnalysis}
              disabled={analyzing}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm border border-teal-800 transition-all flex items-center space-x-2 mx-auto active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>{analyzing ? 'กำลังประมวลผลวิเคราะห์...' : 'เริ่มวิเคราะห์รายงานผู้บริหาร (Generate Audit)'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs overflow-y-auto max-h-96 leading-relaxed whitespace-pre-wrap border border-slate-800">
              {report}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const blob = new Blob(['\uFEFF' + report], { type: 'text/plain;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `satun-aed-ai-report-${new Date().toISOString().split('T')[0]}.txt`;
                  a.click();
                }}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 flex items-center space-x-1.5 shadow-xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>ดาวน์โหลดรายงาน (Download Report)</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={runAiAnalysis}
                  className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold rounded-lg shadow-xs"
                >
                  วิเคราะห์ใหม่อีกครั้ง
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm border border-teal-800"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
