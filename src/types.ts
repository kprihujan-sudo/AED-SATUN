export type SatunDistrict = 
  | 'เมืองสตูล'
  | 'ควนโดน'
  | 'ควนกาหลง'
  | 'ท่าแพ'
  | 'ละงู'
  | 'ทุ่งหว้า'
  | 'มะนัง';

export type HealthFacilityType = 
  | 'รพศ./รพท./รพช. (โรงพยาบาล)'
  | 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)'
  | 'สสจ. / สสอ. (สำนักงานสาธารณสุข)'
  | 'ศูนย์บริการสาธารณสุข / คลินิกชุมชนอบอุ่น'
  | 'ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669'
  | 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.';

export type ReadinessLevel = 'READY' | 'WARNING' | 'CRITICAL';

export type SelfTestStatus = 'OK_GREEN' | 'FLASHING_NORMAL' | 'WARNING_BEEP' | 'RED_ERROR' | 'DEAD_NO_DISPLAY';

export type BatteryEnergyLevel = '100_FULL' | '75_GOOD' | '50_FAIR' | '25_LOW' | 'DEAD_EMPTY';

export interface RescueKitItems {
  traumaShears: boolean; // กรรไกรตัดเสื้อผ้า
  razor: boolean; // มีดโกนขนหน้าอก
  medicalGloves: boolean; // ถุงมือยาง
  cprMaskOrShield: boolean; // Pocket Mask / CPR Face Shield
  towelOrWipes: boolean; // ผ้าแห้งเช็ดเหงื่อ/น้ำ
  alcoholWipes?: boolean; // แผ่นแอลกอฮอล์
}

export interface CabinetEnvironment {
  hasAedSign: boolean; // มีป้ายสัญลักษณ์ AED ชัดเจน
  signVisibleDistance: boolean; // มองเห็นได้จากระยะไกล (>10 เมตร)
  cabinetUnlocked: boolean; // ไม่ล็อคกุญแจ เข้าถึงได้ทันที
  alarmWorking: boolean; // มีเสียงเตือนเมื่อเปิดตู้ (Cabinet Alarm)
  wellLitAndDry: boolean; // บริเวณติดตั้งมีแสงสว่างและไม่อับชื้น
  accessible24Hours: boolean; // เข้าถึงได้ 24 ชั่วโมง หรือตามเวลาทำการ
  emergencyPhone1669Visible: boolean; // มีป้ายเบอร์โทร 1669 ติดชัดเจน
}

export interface InspectionLog {
  id: string;
  inspectorName: string;
  inspectorPosition: string;
  inspectorPhone: string;
  inspectionDate: string;
  selfTestStatus: SelfTestStatus;
  batteryStatus: BatteryEnergyLevel;
  batteryExpiryDate: string;
  adultPadsExpiryDate: string;
  pediatricPadsAvailable: boolean;
  pediatricPadsExpiryDate?: string;
  padsPackagingIntact: boolean;
  rescueKit: RescueKitItems;
  cabinet: CabinetEnvironment;
  calculatedScore: number;
  readinessLevel: ReadinessLevel;
  remarks?: string;
}

export interface AedRecord {
  id: string;
  district: SatunDistrict;
  facilityType: HealthFacilityType;
  facilityName: string;
  installationLocation: string; // e.g. "หน้าห้องฉุกเฉิน ชั้น 1", "จุดคัดกรอง OPD"
  latitude?: number;
  longitude?: number;
  gpsUrl?: string;

  // Device Info
  brand: string; // e.g. "Philips", "Zoll", "Mindray", "Schiller", "Cardiac Science", "Stryker"
  model: string; // e.g. "HeartStart FRx", "AED Plus", "BeneHeart C1A"
  serialNumber: string;
  procurementYear: string;
  ownership: 'งบกระทรวงสาธารณสุข' | 'งบ สพฉ.' | 'งบ อบจ./อบต./เทศบาล' | 'เงินบริจาค/มูลนิธิ' | 'เช่า/ยืม';
  
  // Technical Readiness
  selfTestStatus: SelfTestStatus;
  batteryLevel: BatteryEnergyLevel;
  batteryExpiryDate: string; // YYYY-MM-DD
  batteryInstallDate?: string;

  // Pads
  adultPadsExpiryDate: string; // YYYY-MM-DD
  adultPadsStatus: 'INTACT' | 'DAMAGED' | 'EXPIRED' | 'MISSING';
  hasPediatricPads: boolean;
  pediatricModeType?: 'PEDIATRIC_PADS' | 'PEDIATRIC_KEY_SWITCH' | 'BUILTIN_CHILD_MODE' | 'NONE';
  pediatricPadsExpiryDate?: string;
  hasSparePads: boolean;

  // Rescue Kit & Environment
  rescueKit: RescueKitItems;
  cabinet: CabinetEnvironment;

  // Management & Training
  custodianName: string;
  custodianPosition: string;
  custodianPhone: string;
  custodianLineId?: string;
  staffTrainedCprAed: boolean;
  trainedStaffCount?: number;
  lastTrainingDate?: string;

  // Status & Scores
  lastInspectionDate: string;
  nextInspectionDue: string;
  readinessScore: number; // 0 - 100
  readinessLevel: ReadinessLevel;
  issuesList: string[];
  recommendations: string[];
  photoUrl?: string;
  notes?: string;

  history?: InspectionLog[];
  createdAt: string;
  updatedAt: string;
}

export interface ReadinessCalculationResult {
  score: number;
  level: ReadinessLevel;
  statusTextTh: string;
  badgeColor: string;
  issues: string[];
  recommendations: string[];
  daysUntilBatteryExpiry: number;
  daysUntilAdultPadsExpiry: number;
  isBatteryExpiringSoon: boolean;
  isBatteryExpired: boolean;
  isPadsExpiringSoon: boolean;
  isPadsExpired: boolean;
}

export interface GoogleFormQuestion {
  id: string;
  section: string;
  title: string;
  description?: string;
  type: 'TEXT' | 'PARAGRAPH' | 'CHOICE' | 'CHECKBOX' | 'DATE' | 'SCALE';
  options?: string[];
  required: boolean;
  academicStandardRef?: string;
}
