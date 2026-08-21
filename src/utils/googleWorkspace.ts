import { AedRecord, GoogleFormQuestion } from '../types';

export const OFFICIAL_AED_SURVEY_QUESTIONS: GoogleFormQuestion[] = [
  // Section 1: ข้อมูลหน่วยงานและจุดติดตั้ง
  {
    id: 'q_district',
    section: 'ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง',
    title: '1.1 อำเภอที่ตั้งหน่วยบริการ',
    description: 'เลือกอำเภอในเขตพื้นที่จังหวัดสตูล',
    type: 'CHOICE',
    options: ['เมืองสตูล', 'ควนโดน', 'ควนกาหลง', 'ท่าแพ', 'ละงู', 'ทุ่งหว้า', 'มะนัง'],
    required: true,
    academicStandardRef: 'ระบบการจัดเขตพื้นที่บริการสุขภาพ สป.สธ.'
  },
  {
    id: 'q_facility_type',
    section: 'ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง',
    title: '1.2 ประเภทหน่วยงาน / หน่วยบริการ',
    description: 'ระบุประเภทหน่วยงานตามโครงสร้างสาธารณสุข',
    type: 'CHOICE',
    options: [
      'รพศ./รพท./รพช. (โรงพยาบาล)',
      'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)',
      'สสจ. / สสอ. (สำนักงานสาธารณสุข)',
      'ศูนย์บริการสาธารณสุข / คลินิกชุมชนอบอุ่น',
      'ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669',
      'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.'
    ],
    required: true,
    academicStandardRef: 'มาตรฐานโครงสร้างบริการสุขภาพ'
  },
  {
    id: 'q_facility_name',
    section: 'ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง',
    title: '1.3 ชื่อหน่วยบริการ / สถานที่ติดตั้ง',
    description: 'เช่น โรงพยาบาลสตูล, รพ.สต.ตำมะลัง, ท่าเทียบเรือปากบารา',
    type: 'TEXT',
    required: true,
    academicStandardRef: 'ทะเบียนหน่วยบริการ GIS สธ.'
  },
  {
    id: 'q_location_detail',
    section: 'ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง',
    title: '1.4 ตำแหน่งจุดติดตั้งเครื่องอย่างละเอียด',
    description: 'เช่น ชั้น 1 อาคารผู้ป่วยนอก หน้าห้องเวชระเบียน เสาหมายเลข 2',
    type: 'TEXT',
    required: true,
    academicStandardRef: 'เกณฑ์ความรวดเร็วในการเข้าถึง AED ภายใน 3-5 นาที (สพฉ.)'
  },
  {
    id: 'q_gps',
    section: 'ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง',
    title: '1.5 พิกัด GPS หรือ ลิงก์ Google Maps',
    description: 'เช่น 6.6218, 100.0686 เพื่อใช้ในระบบนำทางกู้ชีพ 1669',
    type: 'TEXT',
    required: false,
    academicStandardRef: 'มาตรฐานระบบสารสนเทศภูมิศาสตร์การแพทย์ฉุกเฉิน (EMS GIS)'
  },

  // Section 2: ข้อมูลจำเพาะของเครื่อง
  {
    id: 'q_brand',
    section: 'ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED',
    title: '2.1 ยี่ห้อของเครื่อง AED',
    description: 'เลือกยี่ห้อผู้ผลิตเครื่อง',
    type: 'CHOICE',
    options: ['Philips', 'Zoll', 'Mindray', 'Stryker / Physio-Control', 'Schiller', 'Cardiac Science', 'Nihon Kohden', 'CU Medical Systems', 'Mediana', 'อื่นๆ'],
    required: true,
    academicStandardRef: 'มาตรฐานความปลอดภัยเครื่องมือแพทย์ อย./มอก.'
  },
  {
    id: 'q_model',
    section: 'ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED',
    title: '2.2 รุ่นของเครื่อง (Model)',
    description: 'เช่น HeartStart FRx, AED Plus, BeneHeart C1A, FRED PA-1',
    type: 'TEXT',
    required: true
  },
  {
    id: 'q_sn',
    section: 'ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED',
    title: '2.3 หมายเลขเครื่อง (Serial Number - S/N)',
    description: 'ดูที่ป้ายสติกเกอร์ด้านหลังหรือใต้เครื่อง',
    type: 'TEXT',
    required: true,
    academicStandardRef: 'การควบคุมทะเบียนครุภัณฑ์การแพทย์'
  },
  {
    id: 'q_procurement_year',
    section: 'ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED',
    title: '2.4 ปีที่จัดซื้อ / ได้รับเครื่อง (พ.ศ.)',
    description: 'เช่น 2564, 2565, 2566',
    type: 'TEXT',
    required: false
  },
  {
    id: 'q_ownership',
    section: 'ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED',
    title: '2.5 แหล่งงบประมาณ / ความเป็นเจ้าของ',
    type: 'CHOICE',
    options: ['งบกระทรวงสาธารณสุข', 'งบ สพฉ.', 'งบ อบจ./อบต./เทศบาล', 'เงินบริจาค/มูลนิธิ', 'เช่า/ยืม'],
    required: true
  },

  // Section 3: ความพร้อมใช้ตัวเครื่องและแบตเตอรี่
  {
    id: 'q_selftest',
    section: 'ส่วนที่ 3: ความพร้อมใช้งานของตัวเครื่องและพลังงานแบตเตอรี่',
    title: '3.1 สถานะไฟแสดงความพร้อมอัตโนมัติ (Status Indicator / Self-test)',
    description: 'สังเกตไฟสถานะที่กระพริบหรือไอคอนแสดงผลบนตัวเครื่อง',
    type: 'CHOICE',
    options: [
      'ไฟเขียวกระพริบปกติ / เครื่องหมายถูก OK (พร้อมใช้งานสมบูรณ์)',
      'ไฟเขียวค้างปกติ',
      'มีเสียงบี๊บเตือน (Warning Beep) หรือมีเครื่องหมายตกใจ',
      'ไฟแดงเตือน หรือเครื่องหมายกากบาท (เครื่องชำรุด/ไม่พร้อมใช้งาน)',
      'ไม่มีไฟ/หน้าจอดับสนิท (แบตหมดเกลี้ยงหรือวงจรเสีย)'
    ],
    required: true,
    academicStandardRef: 'AHA / ERC Guidelines: Daily/Monthly Self-test status validation'
  },
  {
    id: 'q_battery_level',
    section: 'ส่วนที่ 3: ความพร้อมใช้งานของตัวเครื่องและพลังงานแบตเตอรี่',
    title: '3.2 ระดับพลังงานแบตเตอรี่คงเหลือ',
    type: 'CHOICE',
    options: ['100% (เต็ม)', '75% (ปกติ/ดี)', '50% (ปานกลาง)', '25% หรือต่ำกว่า (ใกล้หมด)', '0% (แบตเตอรี่หมดเกลี้ยง)'],
    required: true,
    academicStandardRef: 'กำลังไฟขั้นต่ำสำหรับการปล่อยกระแสไฟฟ้าช็อกอย่างน้อย 20-30 ครั้ง'
  },
  {
    id: 'q_battery_expiry',
    section: 'ส่วนที่ 3: ความพร้อมใช้งานของตัวเครื่องและพลังงานแบตเตอรี่',
    title: '3.3 วันหมดอายุของแบตเตอรี่ (Battery Expiration Date)',
    description: 'ดูวันที่พิมพ์ระบุบนตัวก้อนแบตเตอรี่',
    type: 'DATE',
    required: true,
    academicStandardRef: 'อายุการใช้งานแบตเตอรี่ Non-rechargeable Lithium Standby Life 2-5 ปี'
  },

  // Section 4: แผ่นนำไฟฟ้า (Pads)
  {
    id: 'q_adult_pads_expiry',
    section: 'ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)',
    title: '4.1 วันหมดอายุของแผ่นนำไฟฟ้าผู้ใหญ่ (Adult Pads Expiry Date)',
    description: 'ดูวันหมดอายุบนซองแผ่นนำไฟฟ้า',
    type: 'DATE',
    required: true,
    academicStandardRef: 'เจลนำไฟฟ้า Hydrogel มีอายุจำกัด 2-2.5 ปี ห้ามใช้แผ่นหมดอายุ'
  },
  {
    id: 'q_adult_pads_status',
    section: 'ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)',
    title: '4.2 สภาพซองและสายต่อแผ่นนำไฟฟ้าผู้ใหญ่',
    type: 'CHOICE',
    options: [
      'สมบูรณ์ ไม่ฉีกขาด เสียบต่อกับเครื่องพร้อมใช้ (Pre-connected)',
      'ซองฉีกขาด มีรอยรั่ว หรือเจลแห้ง',
      'แผ่นหมดอายุ',
      'ไม่มีแผ่นนำไฟฟ้าติดตั้งอยู่'
    ],
    required: true
  },
  {
    id: 'q_pediatric_support',
    section: 'ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)',
    title: '4.3 ความพร้อมสำหรับการช่วยชีวิตเด็ก (Pediatric Capability)',
    type: 'CHOICE',
    options: [
      'มีแผ่นนำไฟฟ้าสำหรับเด็กโดยเฉพาะ (Pediatric Pads)',
      'มีกุญแจลดทอนพลังงานสำหรับเด็ก (Pediatric Key / Attenuator)',
      'มีปุ่ม/สวิตช์ปรับเข้าสู่โหมดเด็กในตัวเครื่อง (Child Mode Switch)',
      'ไม่มีระบบลดพลังงานสำหรับเด็ก (มีเฉพาะแผ่นผู้ใหญ่)'
    ],
    required: true,
    academicStandardRef: 'AHA PALS Guidelines: การลดพลังงาน 50-75J สำหรับเด็กอายุ < 8 ปี / นน. < 25 กก.'
  },
  {
    id: 'q_spare_pads',
    section: 'ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)',
    title: '4.4 มีแผ่นนำไฟฟ้าสำรอง (Spare Pads) เพิ่มเติมหรือไม่',
    type: 'CHOICE',
    options: ['มีแผ่นสำรองพร้อมใช้', 'ไม่มีแผ่นสำรอง'],
    required: true
  },

  // Section 5: ชุด Rescue Ready Kit
  {
    id: 'q_ready_kit',
    section: 'ส่วนที่ 5: ชุดอุปกรณ์ช่วยชีวิตฉุกเฉินประจำเครื่อง (Rescue Ready Kit)',
    title: '5.1 รายการอุปกรณ์ช่วยชีวิตที่มีพร้อมอยู่ในซองประจำเครื่อง (เลือกทุกข้อที่มี)',
    description: 'อุปกรณ์จำเป็นสำหรับการเตรียมผู้ป่วยก่อนติดแผ่น AED',
    type: 'CHECKBOX',
    options: [
      'กรรไกรตัดเสื้อผ้าฉุกเฉิน (Trauma Shears)',
      'มีดโกนหนวด/ขนหน้าอก (Razor) สำหรับโกนขนผู้ป่วยก่อนติดแผ่น',
      'ถุงมือยางแพทย์ (Medical Gloves) ป้องกันการติดเชื้อ',
      'หน้ากากช่วยหายใจ CPR (Pocket Mask / Face Shield)',
      'ผ้าแห้ง/กระดาษเช็ดน้ำและเหงื่อบนหน้าอก (Towel/Wipes)',
      'แผ่นแอลกอฮอล์สำหรับทำความสะอาด'
    ],
    required: true,
    academicStandardRef: 'มาตรฐานชุดกู้ชีพเบื้องต้นประกอบเครื่อง AED สพฉ.'
  },

  // Section 6: สภาพแวดล้อม ตู้จัดเก็บ และการเข้าถึง
  {
    id: 'q_cabinet_env',
    section: 'ส่วนที่ 6: สภาพแวดล้อม ตู้จัดเก็บ และการเข้าถึง (Cabinet & Accessibility)',
    title: '6.1 การประเมินจุดติดตั้งและตู้เก็บ AED (เลือกทุกข้อที่ถูกต้อง)',
    type: 'CHECKBOX',
    options: [
      'มีป้ายสัญลักษณ์ AED ชัดเจนตามมาตรฐานสากล (สีเขียวรูปหัวใจและสายฟ้า)',
      'มองเห็นป้ายสัญลักษณ์ได้ชัดเจนจากระยะไกล (>10 เมตร)',
      'ตู้เก็บ "ไม่ล็อคกุญแจ" สามารถเปิดหยิบเครื่องได้ทันทีเมื่อเกิดเหตุ',
      'สัญญาณเตือนเปิดตู้ (Cabinet Alarm) มีเสียงดังทำงานปกติ',
      'จุดติดตั้งมีแสงสว่างเพียงพอ ไม่อับชื้น และไม่โดนแดด/ฝนส่องโดยตรง',
      'เข้าถึงได้ตลอด 24 ชั่วโมง หรือตลอดเวลาเปิดทำการ',
      'มีป้ายแสดงเบอร์โทรฉุกเฉิน 1669 ติดแสดงชัดเจน'
    ],
    required: true,
    academicStandardRef: 'แนวทางการติดตั้งตู้ AED ในพื้นที่สาธารณะและสถานพยาบาล (Public Access Defibrillation)'
  },

  // Section 7: ผู้รับผิดชอบและการฝึกอบรม
  {
    id: 'q_custodian_name',
    section: 'ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรมบุคลากร',
    title: '7.1 ชื่อ-นามสกุล ผู้รับผิดชอบดูแลเครื่องประจำหน่วยบริการ',
    type: 'TEXT',
    required: true
  },
  {
    id: 'q_custodian_position',
    section: 'ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรมบุคลากร',
    title: '7.2 ตำแหน่ง / ฝ่ายงาน',
    description: 'เช่น พยาบาลวิชาชีพ, นักวิชาการสาธารณสุข, เจ้าพนักงานสาธารณสุข',
    type: 'TEXT',
    required: true
  },
  {
    id: 'q_custodian_phone',
    section: 'ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรมบุคลากร',
    title: '7.3 เบอร์โทรศัพท์ติดต่อผู้รับผิดชอบ',
    type: 'TEXT',
    required: true
  },
  {
    id: 'q_staff_training',
    section: 'ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรมบุคลากร',
    title: '7.4 บุคลากรประจำหน่วยงานผ่านการอบรม CPR & AED ในรอบ 1-2 ปีหรือไม่',
    type: 'CHOICE',
    options: [
      'ผ่านการอบรมแล้ว (มีผู้ผ่านการอบรมประจำจุด)',
      'ยังไม่เคยผ่านการอบรม หรือ อบรมเกิน 2 ปีแล้ว'
    ],
    required: true,
    academicStandardRef: 'เกณฑ์มาตรฐานการรับรองการกู้ชีพขั้นพื้นฐาน (BLS Certification Validity 2 Years)'
  },
  {
    id: 'q_notes',
    section: 'ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรมบุคลากร',
    title: '7.5 ข้อเสนอแนะ / ปัญหาอุปสรรคเพิ่มเติม',
    type: 'PARAGRAPH',
    required: false
  }
];

// Generate ready-to-run Google Apps Script to auto-build Google Form & Google Sheet
export function generateGoogleAppsScriptCode(): string {
  return `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: เครื่องมือสร้าง Google Form สำรวจความพร้อมใช้ AED จ.สตูล อัตโนมัติ
 * จัดทำโดย: สำนักงานสาธารณสุขจังหวัดสตูล & ระบบทำเนียบความพร้อมใช้ AED
 * มาตรฐาน: สพฉ. / สมาคมแพทย์โรคหัวใจแห่งประเทศไทย
 * =========================================================================
 * วิธีใช้งาน:
 * 1. ไปที่ https://script.google.com แล้วคลิก "New project"
 * 2. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดนี้ลงไป
 * 3. กดปุ่ม "บันทึก" และกดปุ่ม "Run" ที่ฟังก์ชัน createSatunAedSurveyForm
 * 4. อนุญาตสิทธิ์ (Grant Permissions)
 * 5. ตรวจสอบใน Google Drive จะได้ Google Form และ Google Sheet พร้อมใช้งานทันที!
 */

function createSatunAedSurveyForm() {
  const formTitle = "แบบสำรวจทำเนียบความพร้อมใช้เครื่อง AED หน่วยบริการสาธารณสุข จ.สตูล";
  const formDesc = "แบบสำรวจข้อมูลทำเนียบและการประเมินความพร้อมใช้ของเครื่องฟื้นคืนคลื่นหัวใจด้วยไฟฟ้าแบบอัตโนมัติ (AED) ประจำหน่วยบริการสาธารณสุข และจุดบริการสาธารณะในจังหวัดสตูล\\nตามเกณฑ์มาตรฐาน สพฉ. และสมาคมแพทย์โรคหัวใจแห่งประเทศไทย";

  // สร้าง Google Form ใหม่
  const form = FormApp.create(formTitle);
  form.setDescription(formDesc);
  form.setConfirmationMessage("บันทึกข้อมูลทำเนียบความพร้อมใช้เครื่อง AED เรียบร้อยแล้ว ขอบคุณสำหรับความร่วมมือเพื่อความปลอดภัยของประชาชนชาวสตูล");
  form.setAllowResponseEdits(true);
  form.setPublishingSummary(true);

  // ส่วนที่ 1
  form.addPageBreakItem().setTitle("ส่วนที่ 1: ข้อมูลทั่วไปของหน่วยบริการและสถานที่ติดตั้ง").setHelpText("ระบุข้อมูลพื้นที่และพิกัดจุดติดตั้งเครื่อง AED");
  
  form.addListItem()
    .setTitle("1.1 อำเภอที่ตั้งหน่วยบริการ")
    .setChoiceValues(["เมืองสตูล", "ควนโดน", "ควนกาหลง", "ท่าแพ", "ละงู", "ทุ่งหว้า", "มะนัง"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("1.2 ประเภทหน่วยงาน / หน่วยบริการ")
    .setChoiceValues([
      "รพศ./รพท./รพช. (โรงพยาบาล)",
      "รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)",
      "สสจ. / สสอ. (สำนักงานสาธารณสุข)",
      "ศูนย์บริการสาธารณสุข / คลินิกชุมชนอบอุ่น",
      "ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669",
      "จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ."
    ])
    .setRequired(true);

  form.addTextItem().setTitle("1.3 ชื่อหน่วยบริการ / สถานที่ติดตั้ง (เช่น โรงพยาบาลสตูล, รพ.สต.ตำมะลัง)").setRequired(true);
  form.addTextItem().setTitle("1.4 ตำแหน่งจุดติดตั้งเครื่องอย่างละเอียด (เช่น ชั้น 1 โถง OPD หน้าห้องเวชระเบียน)").setRequired(true);
  form.addTextItem().setTitle("1.5 พิกัด GPS หรือลิงก์ Google Maps (ถ้ามี)");

  // ส่วนที่ 2
  form.addPageBreakItem().setTitle("ส่วนที่ 2: ข้อมูลจำเพาะและที่มาของเครื่อง AED").setHelpText("ข้อมูลยี่ห้อ รุ่น หมายเลขครุภัณฑ์");

  form.addListItem()
    .setTitle("2.1 ยี่ห้อของเครื่อง AED")
    .setChoiceValues(["Philips", "Zoll", "Mindray", "Stryker / Physio-Control", "Schiller", "Cardiac Science", "Nihon Kohden", "CU Medical Systems", "Mediana", "อื่นๆ"])
    .setRequired(true);

  form.addTextItem().setTitle("2.2 รุ่นของเครื่อง (Model เช่น HeartStart FRx, AED Plus, BeneHeart C1A)").setRequired(true);
  form.addTextItem().setTitle("2.3 หมายเลขเครื่อง (Serial Number - S/N)").setRequired(true);
  form.addTextItem().setTitle("2.4 ปีที่จัดซื้อ / ได้รับเครื่อง (พ.ศ.)");
  
  form.addMultipleChoiceItem()
    .setTitle("2.5 แหล่งงบประมาณ / ความเป็นเจ้าของ")
    .setChoiceValues(["งบกระทรวงสาธารณสุข", "งบ สพฉ.", "งบ อบจ./อบต./เทศบาล", "เงินบริจาค/มูลนิธิ", "เช่า/ยืม"])
    .setRequired(true);

  // ส่วนที่ 3
  form.addPageBreakItem().setTitle("ส่วนที่ 3: ความพร้อมใช้งานของตัวเครื่องและพลังงานแบตเตอรี่").setHelpText("ตรวจสอบไฟสถานะและวันหมดอายุแบตเตอรี่");

  form.addMultipleChoiceItem()
    .setTitle("3.1 สถานะไฟแสดงความพร้อมอัตโนมัติ (Status Indicator / Self-test)")
    .setChoiceValues([
      "ไฟเขียวกระพริบปกติ / เครื่องหมายถูก OK (พร้อมใช้งานสมบูรณ์)",
      "ไฟเขียวค้างปกติ",
      "มีเสียงบี๊บเตือน (Warning Beep) หรือมีเครื่องหมายตกใจ",
      "ไฟแดงเตือน หรือเครื่องหมายกากบาท (เครื่องชำรุด/ไม่พร้อมใช้งาน)",
      "ไม่มีไฟ/หน้าจอดับสนิท (แบตหมดเกลี้ยงหรือวงจรเสีย)"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("3.2 ระดับพลังงานแบตเตอรี่คงเหลือ")
    .setChoiceValues(["100% (เต็ม)", "75% (ปกติ/ดี)", "50% (ปานกลาง)", "25% หรือต่ำกว่า (ใกล้หมด)", "0% (แบตเตอรี่หมดเกลี้ยง)"])
    .setRequired(true);

  form.addDateItem().setTitle("3.3 วันหมดอายุของแบตเตอรี่ (Battery Expiration Date)").setRequired(true);

  // ส่วนที่ 4
  form.addPageBreakItem().setTitle("ส่วนที่ 4: ความพร้อมใช้งานของแผ่นนำไฟฟ้า (Electrode Pads)").setHelpText("ตรวจสอบแผ่นนำไฟฟ้าผู้ใหญ่และเด็ก");

  form.addDateItem().setTitle("4.1 วันหมดอายุของแผ่นนำไฟฟ้าผู้ใหญ่ (Adult Pads Expiration Date)").setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("4.2 สภาพซองและสายต่อแผ่นนำไฟฟ้าผู้ใหญ่")
    .setChoiceValues([
      "สมบูรณ์ ไม่ฉีกขาด เสียบต่อกับเครื่องพร้อมใช้ (Pre-connected)",
      "ซองฉีกขาด มีรอยรั่ว หรือเจลแห้ง",
      "แผ่นหมดอายุ",
      "ไม่มีแผ่นนำไฟฟ้าติดตั้งอยู่"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("4.3 ความพร้อมสำหรับการช่วยชีวิตเด็ก (Pediatric Capability)")
    .setChoiceValues([
      "มีแผ่นนำไฟฟ้าสำหรับเด็กโดยเฉพาะ (Pediatric Pads)",
      "มีกุญแจลดทอนพลังงานสำหรับเด็ก (Pediatric Key / Attenuator)",
      "มีปุ่ม/สวิตช์ปรับเข้าสู่โหมดเด็กในตัวเครื่อง (Child Mode Switch)",
      "ไม่มีระบบลดพลังงานสำหรับเด็ก (มีเฉพาะแผ่นผู้ใหญ่)"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("4.4 มีแผ่นนำไฟฟ้าสำรอง (Spare Pads) หรือไม่")
    .setChoiceValues(["มีแผ่นสำรองพร้อมใช้", "ไม่มีแผ่นสำรอง"])
    .setRequired(true);

  // ส่วนที่ 5
  form.addPageBreakItem().setTitle("ส่วนที่ 5: ชุดอุปกรณ์ช่วยชีวิตฉุกเฉินประจำเครื่อง (Rescue Ready Kit)").setHelpText("ตรวจนับอุปกรณ์เสริม 5 รายการจำเป็น");

  form.addCheckboxItem()
    .setTitle("5.1 รายการอุปกรณ์ช่วยชีวิตที่มีพร้อมอยู่ในซองประจำเครื่อง (เลือกทุกข้อที่มี)")
    .setChoiceValues([
      "กรรไกรตัดเสื้อผ้าฉุกเฉิน (Trauma Shears)",
      "มีดโกนหนวด/ขนหน้าอก (Razor)",
      "ถุงมือยางแพทย์ (Medical Gloves)",
      "หน้ากากช่วยหายใจ CPR (Pocket Mask / Face Shield)",
      "ผ้าแห้ง/กระดาษเช็ดน้ำและเหงื่อบนหน้าอก (Towel/Wipes)",
      "แผ่นแอลกอฮอล์สำหรับทำความสะอาด"
    ])
    .setRequired(true);

  // ส่วนที่ 6
  form.addPageBreakItem().setTitle("ส่วนที่ 6: สภาพแวดล้อม ตู้จัดเก็บ และการเข้าถึง").setHelpText("การประเมินตู้เก็บ สัญญาณเตือน และการมองเห็น");

  form.addCheckboxItem()
    .setTitle("6.1 การประเมินจุดติดตั้งและตู้เก็บ AED (เลือกทุกข้อที่ถูกต้อง)")
    .setChoiceValues([
      "มีป้ายสัญลักษณ์ AED ชัดเจนตามมาตรฐานสากล (สีเขียวรูปหัวใจและสายฟ้า)",
      "มองเห็นป้ายสัญลักษณ์ได้ชัดเจนจากระยะไกล (>10 เมตร)",
      "ตู้เก็บ 'ไม่ล็อคกุญแจ' สามารถเปิดหยิบเครื่องได้ทันทีเมื่อเกิดเหตุ",
      "สัญญาณเตือนเปิดตู้ (Cabinet Alarm) มีเสียงดังทำงานปกติ",
      "จุดติดตั้งมีแสงสว่างเพียงพอ ไม่อับชื้น และไม่โดนแดด/ฝนส่องโดยตรง",
      "เข้าถึงได้ตลอด 24 ชั่วโมง หรือตลอดเวลาเปิดทำการ",
      "มีป้ายแสดงเบอร์โทรฉุกเฉิน 1669 ติดแสดงชัดเจน"
    ])
    .setRequired(true);

  // ส่วนที่ 7
  form.addPageBreakItem().setTitle("ส่วนที่ 7: ผู้รับผิดชอบและการฝึกอบรม").setHelpText("ข้อมูลผู้ดูแลและประวัติการฝึกอบรม");

  form.addTextItem().setTitle("7.1 ชื่อ-นามสกุล ผู้รับผิดชอบดูแลเครื่องประจำหน่วยบริการ").setRequired(true);
  form.addTextItem().setTitle("7.2 ตำแหน่ง / ฝ่ายงาน").setRequired(true);
  form.addTextItem().setTitle("7.3 เบอร์โทรศัพท์ติดต่อผู้รับผิดชอบ").setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("7.4 บุคลากรประจำหน่วยงานผ่านการอบรม CPR & AED ในรอบ 1-2 ปีหรือไม่")
    .setChoiceValues([
      "ผ่านการอบรมแล้ว (มีผู้ผ่านการอบรมประจำจุด)",
      "ยังไม่เคยผ่านการอบรม หรือ อบรมเกิน 2 ปีแล้ว"
    ])
    .setRequired(true);

  form.addParagraphTextItem().setTitle("7.5 ข้อเสนอแนะ / ปัญหาอุปสรรคเพิ่มเติม");

  // สร้าง Google Sheet และผูกเข้ากับฟอร์มอัตโนมัติ
  const ss = SpreadsheetApp.create("ทะเบียนสำรวจความพร้อมใช้ AED จ.สตูล (Google Form Responses)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log("✅ สร้าง Google Form สำเร็จแล้ว!");
  Logger.log("🔗 ลิงก์สำหรับแก้ไขฟอร์ม (Edit URL): " + form.getEditUrl());
  Logger.log("🔗 ลิงก์สำหรับให้ รพ.สต./หน่วยบริการกรอก (Published URL): " + form.getPublishedUrl());
  Logger.log("📊 ลิงก์ Google Sheet เก็บข้อมูล: " + ss.getUrl());
}
`;
}

// Convert AED records to CSV
export function exportAedRecordsToCsv(records: AedRecord[]): string {
  const headers = [
    'รหัสเครื่อง',
    'อำเภอ',
    'ประเภทหน่วยบริการ',
    'ชื่อหน่วยบริการ/สถานที่',
    'ตำแหน่งจุดติดตั้ง',
    'พิกัด GPS',
    'ยี่ห้อ',
    'รุ่น',
    'Serial Number',
    'ปีจัดซื้อ',
    'แหล่งงบประมาณ',
    'สถานะไฟ Self-test',
    'ระดับแบตเตอรี่',
    'วันหมดอายุแบตเตอรี่',
    'วันหมดอายุแผ่นผู้ใหญ่',
    'สภาพแผ่นผู้ใหญ่',
    'โหมดเด็ก',
    'แผ่นสำรอง',
    'กรรไกรตัดเสื้อ',
    'มีดโกน',
    'ถุงมือแพทย์',
    'หน้ากาก CPR',
    'ผ้าเช็ดแห้ง',
    'ป้าย AED ชัดเจน',
    'ตู้ไม่ล็อคกุญแจ',
    'สัญญาณเตือนตู้ทำงาน',
    'เบอร์ 1669 ชัดเจน',
    'ผู้รับผิดชอบ',
    'ตำแหน่ง',
    'เบอร์โทร',
    'อบรม CPR ใน 2 ปี',
    'คะแนนความพร้อม (%)',
    'ระดับความพร้อม',
    'วันที่ตรวจสอบล่าสุด',
    'หมายเหตุ/ปัญหา'
  ];

  const rows = records.map(r => [
    `"${r.id}"`,
    `"${r.district}"`,
    `"${r.facilityType}"`,
    `"${r.facilityName.replace(/"/g, '""')}"`,
    `"${r.installationLocation.replace(/"/g, '""')}"`,
    `"${r.latitude && r.longitude ? `${r.latitude}, ${r.longitude}` : ''}"`,
    `"${r.brand}"`,
    `"${r.model}"`,
    `"${r.serialNumber}"`,
    `"${r.procurementYear || ''}"`,
    `"${r.ownership}"`,
    `"${r.selfTestStatus}"`,
    `"${r.batteryLevel}"`,
    `"${r.batteryExpiryDate}"`,
    `"${r.adultPadsExpiryDate}"`,
    `"${r.adultPadsStatus}"`,
    `"${r.hasPediatricPads || r.pediatricModeType ? 'มี' : 'ไม่มี'}"`,
    `"${r.hasSparePads ? 'มี' : 'ไม่มี'}"`,
    `"${r.rescueKit?.traumaShears ? 'มี' : 'ไม่มี'}"`,
    `"${r.rescueKit?.razor ? 'มี' : 'ไม่มี'}"`,
    `"${r.rescueKit?.medicalGloves ? 'มี' : 'ไม่มี'}"`,
    `"${r.rescueKit?.cprMaskOrShield ? 'มี' : 'ไม่มี'}"`,
    `"${r.rescueKit?.towelOrWipes ? 'มี' : 'ไม่มี'}"`,
    `"${r.cabinet?.hasAedSign ? 'มี' : 'ไม่มี'}"`,
    `"${r.cabinet?.cabinetUnlocked ? 'ไม่ล็อค (พร้อมใช้)' : 'ล็อคกุญแจ'}"`,
    `"${r.cabinet?.alarmWorking ? 'ทำงานปกติ' : 'ไม่ทำงาน'}"`,
    `"${r.cabinet?.emergencyPhone1669Visible ? 'มีป้าย 1669' : 'ไม่มีป้าย 1669'}"`,
    `"${r.custodianName}"`,
    `"${r.custodianPosition}"`,
    `"${r.custodianPhone}"`,
    `"${r.staffTrainedCprAed ? 'ผ่านการอบรม' : 'ยังไม่ผ่าน'}"`,
    `"${r.readinessScore}"`,
    `"${r.readinessLevel}"`,
    `"${r.lastInspectionDate}"`,
    `"${(r.issuesList || []).join('; ').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function downloadCsvFile(content: string, fileName = 'satun-aed-readiness-registry.csv') {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
