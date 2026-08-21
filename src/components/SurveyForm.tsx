import React, { useState } from 'react';
import { 
  AedRecord, 
  SatunDistrict, 
  HealthFacilityType, 
  SelfTestStatus, 
  BatteryEnergyLevel 
} from '../types';
import { SATUN_DISTRICTS, SATUN_FACILITIES_PRESET, POPULAR_AED_BRANDS } from '../data/satunLocations';
import { calculateReadiness } from '../utils/readinessCalculator';
import { 
  HeartPulse, 
  MapPin, 
  BatteryCharging, 
  Zap, 
  BriefcaseMedical, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Compass, 
  Sparkles, 
  Save, 
  RotateCcw,
  Info,
  Layers,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

interface SurveyFormProps {
  onSaveRecord: (record: AedRecord) => void;
  onCancel?: () => void;
  initialData?: Partial<AedRecord>;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({
  onSaveRecord,
  onCancel,
  initialData
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Form State
  const [district, setDistrict] = useState<SatunDistrict>(initialData?.district || 'เมืองสตูล');
  const [facilityType, setFacilityType] = useState<HealthFacilityType>(initialData?.facilityType || 'รพศ./รพท./รพช. (โรงพยาบาล)');
  const [facilityName, setFacilityName] = useState<string>(initialData?.facilityName || '');
  const [installationLocation, setInstallationLocation] = useState<string>(initialData?.installationLocation || '');
  const [latitude, setLatitude] = useState<number | undefined>(initialData?.latitude || 6.6218);
  const [longitude, setLongitude] = useState<number | undefined>(initialData?.longitude || 100.0686);
  const [gettingGps, setGettingGps] = useState<boolean>(false);

  // Device Info
  const [brand, setBrand] = useState<string>(initialData?.brand || 'Philips');
  const [model, setModel] = useState<string>(initialData?.model || 'HeartStart FRx');
  const [serialNumber, setSerialNumber] = useState<string>(initialData?.serialNumber || '');
  const [procurementYear, setProcurementYear] = useState<string>(initialData?.procurementYear || '2566');
  const [ownership, setOwnership] = useState<AedRecord['ownership']>(initialData?.ownership || 'งบกระทรวงสาธารณสุข');

  // Technical & Battery
  const [selfTestStatus, setSelfTestStatus] = useState<SelfTestStatus>(initialData?.selfTestStatus || 'OK_GREEN');
  const [batteryLevel, setBatteryLevel] = useState<BatteryEnergyLevel>(initialData?.batteryLevel || '100_FULL');
  const [batteryExpiryDate, setBatteryExpiryDate] = useState<string>(initialData?.batteryExpiryDate || '2028-12-31');

  // Pads
  const [adultPadsExpiryDate, setAdultPadsExpiryDate] = useState<string>(initialData?.adultPadsExpiryDate || '2027-10-31');
  const [adultPadsStatus, setAdultPadsStatus] = useState<AedRecord['adultPadsStatus']>(initialData?.adultPadsStatus || 'INTACT');
  const [hasPediatricPads, setHasPediatricPads] = useState<boolean>(initialData?.hasPediatricPads ?? true);
  const [pediatricModeType, setPediatricModeType] = useState<AedRecord['pediatricModeType']>(initialData?.pediatricModeType || 'PEDIATRIC_KEY_SWITCH');
  const [pediatricPadsExpiryDate, setPediatricPadsExpiryDate] = useState<string>(initialData?.pediatricPadsExpiryDate || '2027-10-31');
  const [hasSparePads, setHasSparePads] = useState<boolean>(initialData?.hasSparePads ?? true);

  // Rescue Kit
  const [traumaShears, setTraumaShears] = useState<boolean>(initialData?.rescueKit?.traumaShears ?? true);
  const [razor, setRazor] = useState<boolean>(initialData?.rescueKit?.razor ?? true);
  const [medicalGloves, setMedicalGloves] = useState<boolean>(initialData?.rescueKit?.medicalGloves ?? true);
  const [cprMaskOrShield, setCprMaskOrShield] = useState<boolean>(initialData?.rescueKit?.cprMaskOrShield ?? true);
  const [towelOrWipes, setTowelOrWipes] = useState<boolean>(initialData?.rescueKit?.towelOrWipes ?? true);
  const [alcoholWipes, setAlcoholWipes] = useState<boolean>(initialData?.rescueKit?.alcoholWipes ?? true);

  // Cabinet & Environment
  const [hasAedSign, setHasAedSign] = useState<boolean>(initialData?.cabinet?.hasAedSign ?? true);
  const [signVisibleDistance, setSignVisibleDistance] = useState<boolean>(initialData?.cabinet?.signVisibleDistance ?? true);
  const [cabinetUnlocked, setCabinetUnlocked] = useState<boolean>(initialData?.cabinet?.cabinetUnlocked ?? true);
  const [alarmWorking, setAlarmWorking] = useState<boolean>(initialData?.cabinet?.alarmWorking ?? true);
  const [wellLitAndDry, setWellLitAndDry] = useState<boolean>(initialData?.cabinet?.wellLitAndDry ?? true);
  const [accessible24Hours, setAccessible24Hours] = useState<boolean>(initialData?.cabinet?.accessible24Hours ?? true);
  const [emergencyPhone1669Visible, setEmergencyPhone1669Visible] = useState<boolean>(initialData?.cabinet?.emergencyPhone1669Visible ?? true);

  // Custodian & Training
  const [custodianName, setCustodianName] = useState<string>(initialData?.custodianName || '');
  const [custodianPosition, setCustodianPosition] = useState<string>(initialData?.custodianPosition || 'พยาบาลวิชาชีพ');
  const [custodianPhone, setCustodianPhone] = useState<string>(initialData?.custodianPhone || '');
  const [custodianLineId, setCustodianLineId] = useState<string>(initialData?.custodianLineId || '');
  const [staffTrainedCprAed, setStaffTrainedCprAed] = useState<boolean>(initialData?.staffTrainedCprAed ?? true);
  const [trainedStaffCount, setTrainedStaffCount] = useState<number>(initialData?.trainedStaffCount || 10);
  const [notes, setNotes] = useState<string>(initialData?.notes || '');

  // Calculate Realtime Diagnostic
  const currentRecordState: Partial<AedRecord> = {
    district,
    facilityType,
    facilityName,
    installationLocation,
    brand,
    model,
    serialNumber,
    procurementYear,
    ownership,
    selfTestStatus,
    batteryLevel,
    batteryExpiryDate,
    adultPadsExpiryDate,
    adultPadsStatus,
    hasPediatricPads,
    pediatricModeType,
    hasSparePads,
    rescueKit: {
      traumaShears,
      razor,
      medicalGloves,
      cprMaskOrShield,
      towelOrWipes,
      alcoholWipes
    },
    cabinet: {
      hasAedSign,
      signVisibleDistance,
      cabinetUnlocked,
      alarmWorking,
      wellLitAndDry,
      accessible24Hours,
      emergencyPhone1669Visible
    },
    custodianName,
    custodianPosition,
    custodianPhone,
    staffTrainedCprAed
  };

  const evalResult = calculateReadiness(currentRecordState);

  // Auto-fill from preset
  const handleSelectPreset = (presetName: string) => {
    const p = SATUN_FACILITIES_PRESET.find(x => x.name === presetName);
    if (p) {
      setDistrict(p.district);
      setFacilityType(p.facilityType);
      setFacilityName(p.name);
      setInstallationLocation(p.defaultLocation);
      setLatitude(p.lat);
      setLongitude(p.lng);
    }
  };

  // Get current GPS
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setGettingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(6)));
          setLongitude(Number(pos.coords.longitude.toFixed(6)));
          setGettingGps(false);
        },
        () => {
          // Fallback to Satun center
          setLatitude(6.6238);
          setLongitude(100.0674);
          setGettingGps(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  // Quick fill scenario test
  const handleQuickFillScenario = (type: 'PERFECT' | 'WARNING' | 'CRITICAL') => {
    if (type === 'PERFECT') {
      setFacilityName('โรงพยาบาลสตูล (OPD อาคาร 100 ปี)');
      setInstallationLocation('โถงบริการผู้ป่วยนอก ชั้น 1 เสา C3');
      setSerialNumber('PH-STN-' + Math.floor(1000 + Math.random() * 9000));
      setSelfTestStatus('OK_GREEN');
      setBatteryLevel('100_FULL');
      setBatteryExpiryDate('2028-12-31');
      setAdultPadsExpiryDate('2027-09-30');
      setAdultPadsStatus('INTACT');
      setHasPediatricPads(true);
      setPediatricModeType('PEDIATRIC_KEY_SWITCH');
      setHasSparePads(true);
      setTraumaShears(true); setRazor(true); setMedicalGloves(true); setCprMaskOrShield(true); setTowelOrWipes(true);
      setHasAedSign(true); setCabinetUnlocked(true); setAlarmWorking(true); setEmergencyPhone1669Visible(true);
      setCustodianName('พว. กัญญา สุขเกษม');
      setCustodianPhone('081-992-3344');
      setStaffTrainedCprAed(true);
    } else if (type === 'WARNING') {
      setFacilityName('รพ.สต.เกาะสาหร่าย');
      setInstallationLocation('จุดปฐมพยาบาลผู้ป่วยฉุกเฉิน');
      setSerialNumber('ZL-KS-' + Math.floor(1000 + Math.random() * 9000));
      setSelfTestStatus('OK_GREEN');
      setBatteryLevel('75_GOOD');
      setBatteryExpiryDate('2026-10-15'); // 55 days!
      setAdultPadsExpiryDate('2026-11-10'); // 80 days!
      setAdultPadsStatus('INTACT');
      setHasPediatricPads(true);
      setHasSparePads(false);
      setTraumaShears(true); setRazor(false); setMedicalGloves(true); setCprMaskOrShield(false); setTowelOrWipes(true);
      setHasAedSign(true); setCabinetUnlocked(true); setAlarmWorking(false); setEmergencyPhone1669Visible(true);
      setCustodianName('นายสมบัติ สุริยันต์');
      setCustodianPhone('089-887-1122');
      setStaffTrainedCprAed(true);
    } else {
      setFacilityName('จุดบริการตรวจเรือ ท่าเทียบเรือตำมะลัง');
      setInstallationLocation('เสาไฟโถงตรวจผู้โดยสาร');
      setSerialNumber('MR-TML-' + Math.floor(1000 + Math.random() * 9000));
      setSelfTestStatus('RED_ERROR');
      setBatteryLevel('25_LOW');
      setBatteryExpiryDate('2026-05-30'); // EXPIRED!
      setAdultPadsExpiryDate('2026-06-15'); // EXPIRED!
      setAdultPadsStatus('DAMAGED');
      setHasPediatricPads(false);
      setPediatricModeType('NONE');
      setHasSparePads(false);
      setTraumaShears(false); setRazor(false); setMedicalGloves(false); setCprMaskOrShield(false); setTowelOrWipes(false);
      setHasAedSign(false); setCabinetUnlocked(false); setAlarmWorking(false); setEmergencyPhone1669Visible(false);
      setCustodianName('');
      setCustodianPhone('');
      setStaffTrainedCprAed(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!facilityName.trim()) {
      alert('กรุณากรอกชื่อหน่วยบริการ / สถานที่ติดตั้ง');
      setActiveStep(1);
      return;
    }
    if (!serialNumber.trim()) {
      alert('กรุณากรอกหมายเลขเครื่อง (Serial Number)');
      setActiveStep(2);
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newRecord: AedRecord = {
      id: initialData?.id || `AED-STN-${Math.floor(100 + Math.random() * 900)}`,
      district,
      facilityType,
      facilityName,
      installationLocation: installationLocation || 'โถงบริการผู้ป่วยนอก',
      latitude,
      longitude,
      gpsUrl: latitude && longitude ? `https://maps.google.com/?q=${latitude},${longitude}` : undefined,
      brand,
      model,
      serialNumber,
      procurementYear,
      ownership,
      selfTestStatus,
      batteryLevel,
      batteryExpiryDate,
      adultPadsExpiryDate,
      adultPadsStatus,
      hasPediatricPads,
      pediatricModeType,
      pediatricPadsExpiryDate,
      hasSparePads,
      rescueKit: {
        traumaShears,
        razor,
        medicalGloves,
        cprMaskOrShield,
        towelOrWipes,
        alcoholWipes
      },
      cabinet: {
        hasAedSign,
        signVisibleDistance,
        cabinetUnlocked,
        alarmWorking,
        wellLitAndDry,
        accessible24Hours,
        emergencyPhone1669Visible
      },
      custodianName: custodianName || 'ผู้รับผิดชอบงาน EMS',
      custodianPosition: custodianPosition || 'พยาบาลวิชาชีพ',
      custodianPhone: custodianPhone || '081-000-0000',
      custodianLineId,
      staffTrainedCprAed,
      trainedStaffCount,
      lastInspectionDate: todayStr,
      nextInspectionDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      readinessScore: evalResult.score,
      readinessLevel: evalResult.level,
      issuesList: evalResult.issues,
      recommendations: evalResult.recommendations,
      notes,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveRecord(newRecord);
  };

  const steps = [
    { num: 1, title: '1. สถานที่ติดตั้ง', icon: MapPin },
    { num: 2, title: '2. ข้อมูลเครื่อง', icon: HeartPulse },
    { num: 3, title: '3. แบตเตอรี่ & ระบบไฟ', icon: BatteryCharging },
    { num: 4, title: '4. แผ่นนำไฟฟ้า (Pads)', icon: Zap },
    { num: 5, title: '5. ชุด Ready Kit', icon: BriefcaseMedical },
    { num: 6, title: '6. ตู้เก็บ & สภาพแวดล้อม', icon: Building2 },
    { num: 7, title: '7. ผู้ดูแล & สรุปผล', icon: UserCheck }
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Header Form Title - Geometric Balance */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
              แบบสำรวจทางการ (Official Survey)
            </span>
            <span className="text-xs text-slate-500 font-medium">มาตรฐาน สพฉ. / สมาคมแพทย์โรคหัวใจ</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1.5">
            แบบสำรวจและประเมินความพร้อมใช้เครื่อง AED หน่วยบริการ จ.สตูล
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            กรอกข้อมูลเพื่อบันทึกทำเนียบและประเมินระดับความพร้อมใช้งานตามหลักวิชาการ
          </p>
        </div>

        {/* Quick Demo Pre-fill Scenarios */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] hidden sm:inline">ชุดทดสอบ:</span>
          <button
            type="button"
            onClick={() => handleQuickFillScenario('PERFECT')}
            className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-md font-bold transition-all text-xs"
            title="ทดสอบข้อมูลแบบพร้อมใช้ 100%"
          >
            พร้อม 100%
          </button>
          <button
            type="button"
            onClick={() => handleQuickFillScenario('WARNING')}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-md font-bold transition-all text-xs"
            title="ทดสอบข้อมูลแบบมีข้อควรระวัง/ใกล้หมดอายุ"
          >
            ใกล้หมดอายุ
          </button>
          <button
            type="button"
            onClick={() => handleQuickFillScenario('CRITICAL')}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-md font-bold transition-all text-xs"
            title="ทดสอบข้อมูลแบบไม่พร้อมใช้งาน/วิกฤต"
          >
            ไม่พร้อมใช้
          </button>
        </div>
      </div>

      {/* Realtime Readiness Assessment Gauge Bar - Geometric Balance */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-xs border ${
              evalResult.level === 'READY' ? 'bg-teal-700 text-white border-teal-800' :
              evalResult.level === 'WARNING' ? 'bg-amber-500 text-slate-900 border-amber-600' :
              'bg-rose-600 text-white border-rose-700'
            }`}>
              {evalResult.score}%
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">ความพร้อม Real-time:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  evalResult.level === 'READY' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                  evalResult.level === 'WARNING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                  'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {evalResult.statusTextTh}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {evalResult.issues.length === 0 
                  ? 'เครื่องและอุปกรณ์สมบูรณ์ครบถ้วนตามเกณฑ์มาตรฐาน' 
                  : `ตรวจพบข้อสังเกต/จุดปรับปรุง ${evalResult.issues.length} รายการ`}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div 
              className={`h-full transition-all duration-300 ${
                evalResult.level === 'READY' ? 'bg-teal-600' :
                evalResult.level === 'WARNING' ? 'bg-amber-500' :
                'bg-rose-500'
              }`}
              style={{ width: `${evalResult.score}%` }}
            />
          </div>
        </div>

        {/* Warning Chips if any */}
        {evalResult.issues.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
            {evalResult.issues.slice(0, 3).map((issue, idx) => (
              <span key={idx} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                <AlertTriangle className="w-3 h-3 text-rose-500" />
                <span>{issue}</span>
              </span>
            ))}
            {evalResult.issues.length > 3 && (
              <span className="text-[11px] text-slate-500 self-center font-medium">
                + อีก {evalResult.issues.length - 3} รายการ
              </span>
            )}
          </div>
        )}
      </div>

      {/* Step Navigator Bar - Geometric Balance */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
        {steps.map(step => {
          const StepIcon = step.icon;
          const isCurrent = activeStep === step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(step.num)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                isCurrent 
                  ? 'bg-teal-700 text-white border-teal-800 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isCurrent ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {step.num}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">

        {/* STEP 1: Location & Facility */}
        {activeStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 1: ข้อมูลหน่วยบริการและสถานที่ติดตั้งในจังหวัดสตูล</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                กำหนดตำแหน่งที่ตั้งของเครื่อง AED เพื่อให้ศูนย์กู้ชีพ 1669 และประชาชนเข้าถึงได้ภายใน 3-5 นาที
              </p>
            </div>

            {/* Quick Facility Preset Selector */}
            <div className="bg-teal-50/50 p-3.5 rounded-xl border border-teal-100">
              <label className="block text-xs font-bold text-teal-950 mb-1">
                เลือกจากฐานข้อมูลหน่วยบริการสตูล (Auto-fill):
              </label>
              <select
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="w-full bg-white border border-teal-200 text-slate-800 text-xs rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">-- เลือกหน่วยบริการใน จ.สตูล เพื่อดึงข้อมูลอัตโนมัติ --</option>
                {SATUN_FACILITIES_PRESET.map((f, i) => (
                  <option key={i} value={f.name}>
                    [{f.district}] {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1.1 อำเภอ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as SatunDistrict)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {SATUN_DISTRICTS.map(d => (
                    <option key={d.code} value={d.name}>{d.name} ({d.subdistrictsCount} ตำบล)</option>
                  ))}
                </select>
              </div>

              {/* Facility Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1.2 ประเภทหน่วยบริการ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value as HealthFacilityType)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="รพศ./รพท./รพช. (โรงพยาบาล)">รพศ./รพท./รพช. (โรงพยาบาล)</option>
                  <option value="รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)">รพ.สต. / สอน. (รพ.สต.)</option>
                  <option value="สสจ. / สสอ. (สำนักงานสาธารณสุข)">สสจ. / สสอ. (สำนักงานสาธารณสุข)</option>
                  <option value="ศูนย์บริการสาธารณสุข / คลินิกชุมชนอบอุ่น">ศูนย์บริการสาธารณสุข / คลินิกชุมชน</option>
                  <option value="ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669">ศูนย์สั่งการกู้ชีพ 1669 / EMS</option>
                  <option value="จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.">จุดบริการสาธารณะ / ท่าเรือท่องเที่ยว / ด่านพรมแดน</option>
                </select>
              </div>

              {/* Facility Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1.3 ชื่อหน่วยบริการ / สถานที่ติดตั้ง <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="เช่น โรงพยาบาลสตูล, รพ.สต.ตำมะลัง, ท่าเทียบเรือปากบารา"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Exact Location detail */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1.4 ตำแหน่งจุดติดตั้งเครื่องอย่างละเอียด (Installation Spot) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={installationLocation}
                  onChange={(e) => setInstallationLocation(e.target.value)}
                  placeholder="เช่น ชั้น 1 อาคารผู้ป่วยนอก หน้าห้องเวชระเบียน เสาหมายเลข 2"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 คำแนะนำ: จุดติดตั้งควรเป็นจุดที่เปิดโล่ง มีคนเดินผ่านบ่อย ไม่โดนแดด/ฝน และหยิบได้เร็ว
                </p>
              </div>

              {/* GPS Coordinates */}
              <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>1.5 พิกัด GPS (Latitude, Longitude)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    disabled={gettingGps}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-all flex items-center space-x-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{gettingGps ? 'กำลังระบุพิกัด...' : 'ดึงพิกัดปัจจุบัน (GPS)'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500">Latitude (ละติจูด):</span>
                    <input
                      type="number"
                      step="0.000001"
                      value={latitude || ''}
                      onChange={(e) => setLatitude(parseFloat(e.target.value))}
                      placeholder="6.6218"
                      className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg p-2.5 mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500">Longitude (ลองจิจูด):</span>
                    <input
                      type="number"
                      step="0.000001"
                      value={longitude || ''}
                      onChange={(e) => setLongitude(parseFloat(e.target.value))}
                      placeholder="100.0686"
                      className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg p-2.5 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Device Specifications */}
        {activeStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ระบุยี่ห้อ รุ่น หมายเลขครุภัณฑ์ (S/N) และแหล่งงบประมาณในการจัดซื้อ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Brand */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2.1 ยี่ห้อของเครื่อง (Brand) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    const b = POPULAR_AED_BRANDS.find(x => x.brand === e.target.value);
                    if (b && b.models.length > 0) {
                      setModel(b.models[0]);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {POPULAR_AED_BRANDS.map(b => (
                    <option key={b.brand} value={b.brand}>{b.brand}</option>
                  ))}
                  <option value="อื่นๆ">อื่นๆ (ระบุในรุ่น)</option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2.2 รุ่นของเครื่อง (Model) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="เช่น HeartStart FRx, AED Plus, BeneHeart C1A"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Serial Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2.3 หมายเลขเครื่อง (Serial Number - S/N) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="เช่น PH-STN-2022-0941"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">ดูได้จากสติกเกอร์บาร์โค้ดด้านหลังหรือใต้ตัวเครื่อง</p>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2.4 ปีที่จัดซื้อ / ได้รับเครื่อง (พ.ศ.)
                </label>
                <input
                  type="text"
                  value={procurementYear}
                  onChange={(e) => setProcurementYear(e.target.value)}
                  placeholder="เช่น 2565, 2566"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Ownership */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2.5 แหล่งงบประมาณ / ความเป็นเจ้าของ <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['งบกระทรวงสาธารณสุข', 'งบ สพฉ.', 'งบ อบจ./อบต./เทศบาล', 'เงินบริจาค/มูลนิธิ', 'เช่า/ยืม'] as const).map(opt => (
                    <label 
                      key={opt}
                      className={`flex items-center space-x-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        ownership === opt 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ownership"
                        checked={ownership === opt}
                        onChange={() => setOwnership(opt)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Battery & Self-test */}
        {activeStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BatteryCharging className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 3: ความพร้อมใช้งานของตัวเครื่องและพลังงานแบตเตอรี่</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                การตรวจสอบสถานะไฟ Self-test อัตโนมัติ และวันหมดอายุของแบตเตอรี่ (เกณฑ์ชี้ขาดความพร้อมใช้)
              </p>
            </div>

            <div className="space-y-4">
              {/* Self Test */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  3.1 สถานะไฟแสดงความพร้อมอัตโนมัติ (Status Indicator / Self-test) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { val: 'OK_GREEN', title: 'ไฟเขียวกระพริบปกติ / เครื่องหมายถูก OK', desc: 'พร้อมใช้งานสมบูรณ์ (ผ่านการทดสอบภายใน)', color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900' },
                    { val: 'FLASHING_NORMAL', title: 'ไฟเขียวค้างปกติ', desc: 'สถานะสแตนด์บายปกติ', color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900' },
                    { val: 'WARNING_BEEP', title: 'มีเสียงบี๊บเตือน (Warning Beep)', desc: 'เครื่องตรวจพบความผิดปกติ หรือแบตใกล้หมด', color: 'border-amber-300 bg-amber-50/40 text-amber-900' },
                    { val: 'RED_ERROR', title: 'ไฟแดงเตือน หรือเครื่องหมายกากบาท', desc: 'เครื่องชำรุด ไม่พร้อมใช้งาน (Critical Failure)', color: 'border-rose-300 bg-rose-50/40 text-rose-900' },
                    { val: 'DEAD_NO_DISPLAY', title: 'ไม่มีไฟ / หน้าจอดับสนิท', desc: 'แบตเตอรี่หมดเกลี้ยง หรือวงจรเสีย', color: 'border-slate-300 bg-slate-100 text-slate-900' }
                  ].map(opt => (
                    <label 
                      key={opt.val}
                      className={`flex items-start space-x-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        selfTestStatus === opt.val 
                          ? `${opt.color} ring-2 ring-emerald-500 font-medium shadow-xs` 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selfTestStatus"
                        checked={selfTestStatus === opt.val}
                        onChange={() => setSelfTestStatus(opt.val as SelfTestStatus)}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <div className="font-semibold">{opt.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Battery Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  3.2 ระดับพลังงานแบตเตอรี่คงเหลือ <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { val: '100_FULL', label: '100% (เต็ม)' },
                    { val: '75_GOOD', label: '75% (ดี)' },
                    { val: '50_FAIR', label: '50% (ปานกลาง)' },
                    { val: '25_LOW', label: '25% (ต่ำ/เตือน)' },
                    { val: 'DEAD_EMPTY', label: '0% (หมดเกลี้ยง)' }
                  ].map(b => (
                    <label
                      key={b.val}
                      className={`p-2.5 rounded-xl border text-xs text-center cursor-pointer transition-all ${
                        batteryLevel === b.val 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="batteryLevel"
                        checked={batteryLevel === b.val}
                        onChange={() => setBatteryLevel(b.val as BatteryEnergyLevel)}
                        className="sr-only"
                      />
                      {b.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Battery Expiry */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3.3 วันหมดอายุของแบตเตอรี่ (Battery Expiration Date) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={batteryExpiryDate}
                  onChange={(e) => setBatteryExpiryDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>💡 แบตเตอรี่ AED แบบ Non-rechargeable มีอายุประมาณ 2-5 ปี</span>
                  <span className="font-semibold text-emerald-700">
                    {evalResult.daysUntilBatteryExpiry >= 0 
                      ? `เหลืออีก ${evalResult.daysUntilBatteryExpiry} วัน`
                      : `หมดอายุแล้ว ${Math.abs(evalResult.daysUntilBatteryExpiry)} วัน!`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Electrode Pads */}
        {activeStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                การตรวจสอบวันหมดอายุ สภาพซองเจลนำไฟฟ้า แผ่นผู้ใหญ่ และการรองรับผู้ป่วยเด็ก
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Adult Pads Expiry */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  4.1 วันหมดอายุของแผ่นนำไฟฟ้าผู้ใหญ่ (Adult Pads Expiry) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={adultPadsExpiryDate}
                  onChange={(e) => setAdultPadsExpiryDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <div className="text-[11px] font-semibold text-emerald-700 mt-2">
                  {evalResult.daysUntilAdultPadsExpiry >= 0 
                    ? `เหลืออายุการใช้งาน ${evalResult.daysUntilAdultPadsExpiry} วัน`
                    : `⚠️ แผ่นหมดอายุแล้ว ${Math.abs(evalResult.daysUntilAdultPadsExpiry)} วัน (ต้องเปลี่ยนทันที)`}
                </div>
              </div>

              {/* Adult Pads Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  4.2 สภาพซองและสายต่อแผ่นผู้ใหญ่ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={adultPadsStatus}
                  onChange={(e) => setAdultPadsStatus(e.target.value as AedRecord['adultPadsStatus'])}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="INTACT">สมบูรณ์ ไม่ฉีกขาด เสียบต่อพร้อมใช้ (Pre-connected)</option>
                  <option value="DAMAGED">ซองฉีกขาด มีรอยรั่ว หรือเจลแห้ง</option>
                  <option value="EXPIRED">แผ่นหมดอายุ</option>
                  <option value="MISSING">ไม่มีแผ่นนำไฟฟ้าติดตั้งอยู่</option>
                </select>
              </div>

              {/* Pediatric Mode */}
              <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  4.3 ความพร้อมสำหรับการช่วยชีวิตเด็ก (Pediatric Capability) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'PEDIATRIC_KEY_SWITCH', title: 'มีกุญแจลดพลังงานสำหรับเด็ก (Pediatric Key)', desc: 'เสียบกุญแจเข้าเครื่องเพื่อปรับโหมดเด็ก' },
                    { val: 'BUILTIN_CHILD_MODE', title: 'มีปุ่มสลับโหมดเด็กในตัวเครื่อง (Child Button)', desc: 'กดปุ่มเพื่อลดพลังงานเป็น 50-75J' },
                    { val: 'PEDIATRIC_PADS', title: 'มีแผ่นนำไฟฟ้าสำหรับเด็กโดยเฉพาะ', desc: 'แยกซองแผ่นเด็กต่างหาก' },
                    { val: 'NONE', title: 'ไม่มีระบบลดพลังงานสำหรับเด็ก', desc: 'มีเฉพาะแผ่นผู้ใหญ่' }
                  ].map(m => (
                    <label
                      key={m.val}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        pediatricModeType === m.val 
                          ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold ring-1 ring-teal-500' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pediatricModeType"
                        checked={pediatricModeType === m.val}
                        onChange={() => {
                          setPediatricModeType(m.val as AedRecord['pediatricModeType']);
                          setHasPediatricPads(m.val !== 'NONE');
                        }}
                        className="mr-2 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="font-semibold">{m.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spare Pads */}
              <div className="sm:col-span-2">
                <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSparePads}
                    onChange={(e) => setHasSparePads(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800">4.4 มีชุดแผ่นนำไฟฟ้าสำรอง (Spare Pads) บรรจุอยู่ในตู้/กระเป๋า</span>
                    <p className="text-[11px] text-slate-500">ช่วยให้มีแผ่นเปลี่ยนทันทีในกรณีติดผิดตำแหน่งหรือมีเหตุการณ์ต่อเนื่อง</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Rescue Ready Kit */}
        {activeStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BriefcaseMedical className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 5: ชุดอุปกรณ์ช่วยชีวิตฉุกเฉินประจำเครื่อง (Rescue Ready Kit)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ตรวจนับอุปกรณ์จำเป็น 5 รายการมาตรฐาน สพฉ. สำหรับเตรียมผู้ป่วยก่อนการช็อกไฟฟ้า
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { state: traumaShears, set: setTraumaShears, name: 'กรรไกรตัดเสื้อผ้าฉุกเฉิน (Trauma Shears)', desc: 'สำหรับตัดเสื้อผ้าผู้ป่วยเพื่อเปิดหน้าอกอย่างรวดเร็ว' },
                { state: razor, set: setRazor, name: 'มีดโกนหนวด/ขนหน้าอก (Medical Razor)', desc: 'จำเป็นมากสำหรับโกนขนหน้าอกผู้ป่วยที่ดกเพื่อให้แผ่นแนบสนิท' },
                { state: medicalGloves, set: setMedicalGloves, name: 'ถุงมือยางแพทย์ (Medical Gloves)', desc: 'ป้องกันการสัมผัสสารคัดหลั่งและการติดเชื้อ' },
                { state: cprMaskOrShield, set: setCprMaskOrShield, name: 'หน้ากากช่วยหายใจ CPR (Pocket Mask / Face Shield)', desc: 'มีวาล์วทางเดียว (One-way valve) สำหรับเป่าลมหายใจ' },
                { state: towelOrWipes, set: setTowelOrWipes, name: 'ผ้าแห้ง/กระดาษเช็ดน้ำและเหงื่อ (Towel/Wipes)', desc: 'สำหรับเช็ดผิวหนังบริเวณหน้าอกให้แห้งสนิทก่อนติดแผ่น' },
                { state: alcoholWipes, set: setAlcoholWipes, name: 'แผ่นแอลกอฮอล์ทำความสะอาด (Alcohol Prep Pads)', desc: 'ทำความสะอาดอุปกรณ์และมือก่อน/หลังปฏิบัติการ' }
              ].map((kit, i) => (
                <label 
                  key={i}
                  className={`flex items-start space-x-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    kit.state 
                      ? 'bg-emerald-50/50 border-emerald-300 text-slate-800' 
                      : 'bg-rose-50/40 border-rose-200 text-rose-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={kit.state}
                    onChange={(e) => kit.set(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{kit.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{kit.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Cabinet & Environment */}
        {activeStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 6: สภาพแวดล้อม ตู้จัดเก็บ และการเข้าถึง (Cabinet & Accessibility)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                การประเมินตู้เก็บ สัญญาณเตือน ป้ายสัญลักษณ์ 1669 และความสะดวกในการหยิบใช้
              </p>
            </div>

            <div className="space-y-3">
              {[
                { state: hasAedSign, set: setHasAedSign, title: '6.1 มีป้ายสัญลักษณ์ AED ชัดเจนตามมาตรฐานสากล', desc: 'ป้ายสีเขียวรูปหัวใจและสายฟ้าสีขาว (สัญลักษณ์ ILCOR / ERC)' },
                { state: signVisibleDistance, set: setSignVisibleDistance, title: '6.2 มองเห็นป้ายสัญลักษณ์ได้ชัดเจนจากระยะไกล (>10 เมตร)', desc: 'ติดตั้งในระดับสายตา ไม่มีสิ่งกีดขวาง' },
                { state: cabinetUnlocked, set: setCabinetUnlocked, title: '6.3 ตู้เก็บ "ไม่ล็อคกุญแจ" พร้อมเปิดใช้ทันที', desc: '⚠️ สำคัญ: ห้ามล็อคกุญแจตู้ AED เด็ดขาด เพื่อไม่ให้เสียเวลาค้นหากุญแจในนาทีวิกฤต' },
                { state: alarmWorking, set: setAlarmWorking, title: '6.4 สัญญาณเตือนเปิดตู้ (Cabinet Alarm) ทำงานปกติ', desc: 'ส่งเสียงดังเตือนเมื่อเปิดประตูตู้' },
                { state: wellLitAndDry, set: setWellLitAndDry, title: '6.5 จุดติดตั้งมีแสงสว่างเพียงพอ ไม่อับชื้น และไม่โดนแดด/ฝน', desc: 'อุณหภูมิเหมาะสม ป้องกันความชื้นและฝุ่นละออง' },
                { state: accessible24Hours, set: setAccessible24Hours, title: '6.6 เข้าถึงได้ตลอด 24 ชั่วโมง หรือตลอดเวลาเปิดทำการ', desc: 'ประชาชนหรือเจ้าหน้าที่สามารถหยิบได้โดยไม่ต้องขออนุญาตข้ามห้อง' },
                { state: emergencyPhone1669Visible, set: setEmergencyPhone1669Visible, title: '6.7 มีป้ายแสดงเบอร์โทรฉุกเฉิน 1669 ติดชัดเจน', desc: 'มีข้อความเตือนให้โทร 1669 ทันทีที่พบผู้หมดสติ' }
              ].map((item, idx) => (
                <label 
                  key={idx}
                  className={`flex items-start space-x-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    item.state 
                      ? 'bg-slate-50 border-slate-200 text-slate-800' 
                      : 'bg-rose-50/50 border-rose-200 text-rose-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={(e) => item.set(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Custodian, Training & Submission */}
        {activeStep === 7 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <span>ส่วนที่ 7: ผู้รับผิดชอบดูแลเครื่อง การฝึกอบรม และสรุปการประเมิน</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                บันทึกข้อมูลผู้ดูแลประจำจุดและการผ่านการอบรมฟื้นคืนชีพ CPR & AED
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  7.1 ชื่อ-นามสกุล ผู้รับผิดชอบดูแลเครื่อง <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={custodianName}
                  onChange={(e) => setCustodianName(e.target.value)}
                  placeholder="เช่น พว. มะลิวัลย์ สุวรรณรัตน์"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  7.2 ตำแหน่ง / ฝ่ายงาน <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={custodianPosition}
                  onChange={(e) => setCustodianPosition(e.target.value)}
                  placeholder="เช่น พยาบาลวิชาชีพชำนาญการ, นักวิชาการสาธารณสุข"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  7.3 เบอร์โทรศัพท์ติดต่อผู้รับผิดชอบ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={custodianPhone}
                  onChange={(e) => setCustodianPhone(e.target.value)}
                  placeholder="เช่น 081-542-8921"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  7.4 Line ID หรือช่องทางติดต่อสำรอง
                </label>
                <input
                  type="text"
                  value={custodianLineId}
                  onChange={(e) => setCustodianLineId(e.target.value)}
                  placeholder="เช่น maliwan_er"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Training */}
              <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={staffTrainedCprAed}
                    onChange={(e) => setStaffTrainedCprAed(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800">
                      7.5 บุคลากรประจำหน่วยบริการผ่านการอบรม CPR & AED ในรอบ 1-2 ปี
                    </span>
                    <p className="text-[11px] text-slate-500">
                      ตามเกณฑ์มาตรฐาน สพฉ. ผู้ดูแลและเจ้าหน้าที่ประจำจุดควรได้รับการอบรมทบทวนอย่างน้อยทุก 2 ปี
                    </p>
                  </div>
                </label>
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  7.6 ข้อเสนอแนะ / ปัญหาอุปสรรค / สิ่งที่ต้องการให้ สสจ. สนับสนุน
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="เช่น ขอรับการสนับสนุนชุดแผ่นนำไฟฟ้าสำหรับเด็ก, ขอเข้าร่วมโครงการฝึกอบรม CPR ประจำปี..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Diagnostic Summary Box */}
            <div className={`p-4 rounded-xl border ${
              evalResult.level === 'READY' ? 'bg-emerald-50/80 border-emerald-300' :
              evalResult.level === 'WARNING' ? 'bg-amber-50/80 border-amber-300' :
              'bg-rose-50/80 border-rose-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">ผลการประเมินความพร้อมใช้ตามหลักวิชาการ:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  evalResult.level === 'READY' ? 'bg-emerald-600 text-white' :
                  evalResult.level === 'WARNING' ? 'bg-amber-600 text-white' :
                  'bg-rose-600 text-white'
                }`}>
                  {evalResult.score} คะแนน - {evalResult.statusTextTh}
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-slate-700">
                {evalResult.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Step Navigation & Action Buttons */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-200">
          <div>
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition-all shadow-xs"
              >
                ย้อนกลับ (ส่วนที่ {activeStep - 1})
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {activeStep < 7 ? (
              <button
                type="button"
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm border border-teal-800 flex items-center space-x-1.5"
              >
                <span>ถัดไป (ส่วนที่ {activeStep + 1})</span>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm border border-teal-800 flex items-center space-x-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกเข้าทำเนียบ AED จังหวัดสตูล</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
