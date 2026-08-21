import { AedRecord, ReadinessCalculationResult, ReadinessLevel } from '../types';

export function calculateReadiness(record: Partial<AedRecord>): ReadinessCalculationResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Calculate Days until Expiration
  let daysUntilBatteryExpiry = 999;
  let isBatteryExpired = false;
  let isBatteryExpiringSoon = false;

  if (record.batteryExpiryDate) {
    const battDate = new Date(record.batteryExpiryDate);
    const diffTime = battDate.getTime() - today.getTime();
    daysUntilBatteryExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysUntilBatteryExpiry < 0) {
      isBatteryExpired = true;
      issues.push(`แบตเตอรี่หมดอายุแล้ว (${Math.abs(daysUntilBatteryExpiry)} วันที่ผ่านมา)`);
      recommendations.push('จัดซื้อ/เบิกเปลี่ยนแบตเตอรี่ AED ก้อนใหม่ทันที');
    } else if (daysUntilBatteryExpiry <= 90) {
      isBatteryExpiringSoon = true;
      issues.push(`แบตเตอรี่จะหมดอายุในอีก ${daysUntilBatteryExpiry} วัน (เหลือ < 3 เดือน)`);
      recommendations.push('เตรียมดำเนินการจัดซื้อ/ทำเรื่องเบิกแบตเตอรี่สำรองล่วงหน้า');
    }
  }

  let daysUntilAdultPadsExpiry = 999;
  let isPadsExpired = false;
  let isPadsExpiringSoon = false;

  if (record.adultPadsExpiryDate) {
    const padsDate = new Date(record.adultPadsExpiryDate);
    const diffTime = padsDate.getTime() - today.getTime();
    daysUntilAdultPadsExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysUntilAdultPadsExpiry < 0) {
      isPadsExpired = true;
      issues.push(`แผ่นนำไฟฟ้าสำหรับผู้ใหญ่ (Adult Pads) หมดอายุแล้ว (${Math.abs(daysUntilAdultPadsExpiry)} วันที่ผ่านมา)`);
      recommendations.push('เปลี่ยนแผ่นนำไฟฟ้า Adult Pads ทันที ห้ามใช้แผ่นหมดอายุเพราะเจลอาจแห้งนำไฟฟ้าไม่ได้');
    } else if (daysUntilAdultPadsExpiry <= 90) {
      isPadsExpiringSoon = true;
      issues.push(`แผ่นนำไฟฟ้าสำหรับผู้ใหญ่จะหมดอายุในอีก ${daysUntilAdultPadsExpiry} วัน (เหลือ < 3 เดือน)`);
      recommendations.push('เตรียมสั่งซื้อชุดแผ่นนำไฟฟ้า Adult Pads ใหม่ก่อนวันหมดอายุ');
    }
  }

  // 2. Score breakdown (100 Points Total)
  let score = 0;

  // --- Category A: Self-test & Battery (35 points) ---
  if (record.selfTestStatus === 'OK_GREEN' || record.selfTestStatus === 'FLASHING_NORMAL') {
    score += 20;
  } else if (record.selfTestStatus === 'WARNING_BEEP') {
    score += 5;
    issues.push('เครื่องมีเสียงบี๊บเตือน (Warning Beep) บ่งบอกความผิดปกติของระบบหรือแบตเตอรี่');
    recommendations.push('เปิดฝาเครื่องตรวจสอบรหัส Error หรือไฟเตือนตามคู่มือประจำเครื่อง');
  } else {
    issues.push('ไฟสถานะเครื่องไม่พร้อมใช้ (ไฟแดงเตือน หรือหน้าจอ/ไฟดับสนิท)');
    recommendations.push('ส่งตรวจเช็คหรือติดต่อศูนย์บริการตัวแทนจำหน่าย/ช่างเครื่องมือแพทย์ทันที');
  }

  if (record.batteryLevel === '100_FULL' || record.batteryLevel === '75_GOOD') {
    score += 15;
  } else if (record.batteryLevel === '50_FAIR') {
    score += 10;
  } else if (record.batteryLevel === '25_LOW') {
    score += 3;
    issues.push('ระดับพลังงานแบตเตอรี่ต่ำ (เหลือประมาณ 25%)');
    recommendations.push('เปลี่ยนแบตเตอรี่ก้อนใหม่เพื่อป้องกันเครื่องตัดการทำงานขณะทำการช็อกไฟฟ้า');
  } else {
    issues.push('แบตเตอรี่หมดเกลี้ยง (Dead/Empty)');
    recommendations.push('เปลี่ยนแบตเตอรี่ทันที เครื่องจะไม่สามารถปล่อยกระแสไฟฟ้าช็อกได้');
  }

  if (isBatteryExpired) {
    score = Math.max(0, score - 15);
  }

  // --- Category B: Electrode Pads (25 points) ---
  if (record.adultPadsStatus === 'INTACT') {
    score += 15;
  } else if (record.adultPadsStatus === 'DAMAGED') {
    issues.push('ซองแผ่นนำไฟฟ้าชำรุด ฉีกขาด หรือมีรอยรั่ว');
    recommendations.push('เปลี่ยนแผ่นนำไฟฟ้าทันที อากาศที่รั่วเข้าซองทำให้ไฮโดรเจลแห้งกรอบ');
  } else if (record.adultPadsStatus === 'MISSING') {
    issues.push('ไม่มีแผ่นนำไฟฟ้าติดตั้งอยู่กับเครื่อง');
    recommendations.push('ติดตั้งแผ่นนำไฟฟ้าเข้ากับตัวเครื่อง (Pre-connected) ทันที');
  }

  if (isPadsExpired) {
    score = Math.max(0, score - 15);
  }

  // Pediatric readiness (5 points)
  if (record.hasPediatricPads || record.pediatricModeType === 'PEDIATRIC_KEY_SWITCH' || record.pediatricModeType === 'BUILTIN_CHILD_MODE') {
    score += 5;
  } else {
    issues.push('ไม่มีแผ่นนำไฟฟ้าสำหรับเด็ก/สวิตช์โหมดเด็ก (Pediatric Key/Pads)');
    recommendations.push('พิจารณาจัดหาแผ่นเด็กหรือกุญแจลดพลังงานสำหรับผู้ป่วยเด็กอายุต่ำกว่า 8 ปี');
  }

  // Spare pads (5 points)
  if (record.hasSparePads) {
    score += 5;
  }

  // --- Category C: Rescue Ready Kit (15 points) ---
  const kit = record.rescueKit || {
    traumaShears: false,
    razor: false,
    medicalGloves: false,
    cprMaskOrShield: false,
    towelOrWipes: false
  };

  let kitScore = 0;
  if (kit.traumaShears) kitScore += 3; else issues.push('ขาดกรรไกรตัดเสื้อผ้าฉุกเฉิน (Trauma Shears)');
  if (kit.razor) kitScore += 3; else issues.push('ขาดมีดโกนหนวด/ขนหน้าอก (จำเป็นมากในกรณีผู้ป่วยชายขนหน้าอกดก)');
  if (kit.medicalGloves) kitScore += 3; else issues.push('ขาดถุงมือยางสำหรับผู้ช่วยเหลือ (Medical Gloves)');
  if (kit.cprMaskOrShield) kitScore += 3; else issues.push('ขาดหน้ากากช่วยหายใจ Pocket Mask / Face Shield');
  if (kit.towelOrWipes) kitScore += 3; else issues.push('ขาดผ้าแห้งสำหรับเช็ดเหงื่อ/น้ำก่อนติดแผ่นแปะ');

  score += kitScore;
  if (kitScore < 15) {
    recommendations.push('เติมอุปกรณ์ในชุด Ready Kit ประจำเครื่องให้ครบทั้ง 5 รายการมาตรฐาน');
  }

  // --- Category D: Cabinet, Alarm & Environment (15 points) ---
  const cab = record.cabinet || {
    hasAedSign: false,
    signVisibleDistance: false,
    cabinetUnlocked: false,
    alarmWorking: false,
    wellLitAndDry: false,
    accessible24Hours: false,
    emergencyPhone1669Visible: false
  };

  let cabScore = 0;
  if (cab.hasAedSign) cabScore += 3; else issues.push('ไม่มีป้ายสัญลักษณ์ AED ตามมาตรฐานสากล (สีเขียวรูปหัวใจและสายฟ้า)');
  if (cab.cabinetUnlocked) cabScore += 3; else {
    issues.push('ตู้เก็บ AED มีการล็อคกุญแจ (เสี่ยงต่อการหยิบใช้ล่าช้าในภาวะวิกฤต)');
    recommendations.push('ปลดล็อคกุญแจตู้ หรือใช้ซีลล็อคแบบดึงขาดฉุกเฉิน ห้ามล็อคกุญแจเด็ดขาด');
  }
  if (cab.alarmWorking) cabScore += 3;
  if (cab.wellLitAndDry) cabScore += 2;
  if (cab.accessible24Hours) cabScore += 2;
  if (cab.emergencyPhone1669Visible) cabScore += 2; else issues.push('ไม่มีป้ายแสดงเบอร์โทรฉุกเฉิน 1669 ที่จุดติดตั้ง');

  score += cabScore;

  // --- Category E: Custodian & Training (10 points) ---
  if (record.custodianName && record.custodianPhone) {
    score += 5;
  } else {
    issues.push('ไม่มีชื่อหรือเบอร์โทรผู้รับผิดชอบดูแลเครื่องประจำจุด');
    recommendations.push('กำหนดผู้รับผิดชอบดูแลเครื่องพร้อมระบุเบอร์ติดต่อฉุกเฉินให้ชัดเจน');
  }

  if (record.staffTrainedCprAed) {
    score += 5;
  } else {
    issues.push('บุคลากรประจำจุดยังไม่ได้รับการอบรมฟื้นคืนชีพ CPR & AED ภายใน 1-2 ปี');
    recommendations.push('จัดตารางฝึกอบรมทบทวน CPR & AED ให้กับเจ้าหน้าที่ประจำหน่วยบริการ');
  }

  // 3. Determine Overall Readiness Level
  let level: ReadinessLevel = 'READY';
  let statusTextTh = 'พร้อมใช้งานสมบูรณ์ (Fully Ready)';
  let badgeColor = 'bg-emerald-500 text-white';

  const hasCriticalFailure = 
    record.selfTestStatus === 'RED_ERROR' ||
    record.selfTestStatus === 'DEAD_NO_DISPLAY' ||
    isBatteryExpired ||
    record.batteryLevel === 'DEAD_EMPTY' ||
    isPadsExpired ||
    record.adultPadsStatus === 'DAMAGED' ||
    record.adultPadsStatus === 'MISSING' ||
    cab.cabinetUnlocked === false;

  if (hasCriticalFailure || score < 70) {
    level = 'CRITICAL';
    statusTextTh = 'ไม่พร้อมใช้งาน / วิกฤต (Critical)';
    badgeColor = 'bg-rose-600 text-white';
  } else if (isBatteryExpiringSoon || isPadsExpiringSoon || score < 90 || kitScore < 12) {
    level = 'WARNING';
    statusTextTh = 'พร้อมใช้แต่มีข้อควรระวัง (Attention)';
    badgeColor = 'bg-amber-500 text-slate-900';
  }

  if (recommendations.length === 0) {
    recommendations.push('เครื่องและอุปกรณ์อยู่ในเกณฑ์สมบูรณ์ดีเยี่ยม ให้ตรวจเช็คตามรอบปกติประจำเดือน');
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    level,
    statusTextTh,
    badgeColor,
    issues,
    recommendations,
    daysUntilBatteryExpiry,
    daysUntilAdultPadsExpiry,
    isBatteryExpiringSoon,
    isBatteryExpired,
    isPadsExpiringSoon,
    isPadsExpired
  };
}
