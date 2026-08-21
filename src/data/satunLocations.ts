import { SatunDistrict, HealthFacilityType } from '../types';

export interface DistrictInfo {
  name: SatunDistrict;
  code: string;
  subdistrictsCount: number;
  mainHospital: string;
  healthCentersCount: number;
  centerCoordinates: { lat: number; lng: number };
}

export const SATUN_DISTRICTS: DistrictInfo[] = [
  {
    name: 'เมืองสตูล',
    code: '9101',
    subdistrictsCount: 12,
    mainHospital: 'โรงพยาบาลสตูล (รพศ./รพท.)',
    healthCentersCount: 15,
    centerCoordinates: { lat: 6.6238, lng: 100.0674 }
  },
  {
    name: 'ควนโดน',
    code: '9102',
    subdistrictsCount: 4,
    mainHospital: 'โรงพยาบาลควนโดน (รพช.)',
    healthCentersCount: 6,
    centerCoordinates: { lat: 6.7725, lng: 100.1255 }
  },
  {
    name: 'ควนกาหลง',
    code: '9103',
    subdistrictsCount: 3,
    mainHospital: 'โรงพยาบาลควนกาหลง (รพช.)',
    healthCentersCount: 8,
    centerCoordinates: { lat: 6.8443, lng: 100.0784 }
  },
  {
    name: 'ท่าแพ',
    code: '9104',
    subdistrictsCount: 4,
    mainHospital: 'โรงพยาบาลท่าแพ (รพช.)',
    healthCentersCount: 7,
    centerCoordinates: { lat: 6.7456, lng: 99.9327 }
  },
  {
    name: 'ละงู',
    code: '9105',
    subdistrictsCount: 6,
    mainHospital: 'โรงพยาบาลละงู (รพช.)',
    healthCentersCount: 12,
    centerCoordinates: { lat: 6.8833, lng: 99.7833 }
  },
  {
    name: 'ทุ่งหว้า',
    code: '9106',
    subdistrictsCount: 5,
    mainHospital: 'โรงพยาบาลทุ่งหว้า (รพช.)',
    healthCentersCount: 7,
    centerCoordinates: { lat: 7.1028, lng: 99.7561 }
  },
  {
    name: 'มะนัง',
    code: '9107',
    subdistrictsCount: 2,
    mainHospital: 'โรงพยาบาลมะนัง (รพช.)',
    healthCentersCount: 4,
    centerCoordinates: { lat: 6.9667, lng: 99.9833 }
  }
];

export interface SatunFacilityPreset {
  district: SatunDistrict;
  facilityType: HealthFacilityType;
  name: string;
  defaultLocation: string;
  lat: number;
  lng: number;
}

export const SATUN_FACILITIES_PRESET: SatunFacilityPreset[] = [
  // เมืองสตูล
  { district: 'เมืองสตูล', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลสตูล (อาคารผู้ป่วยนอก ชั้น 1)', defaultLocation: 'โถงบริการผู้ป่วยนอก หน้าห้องเวชระเบียน', lat: 6.6214, lng: 100.0682 },
  { district: 'เมืองสตูล', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลสตูล (ห้องฉุกเฉินและอุบัติเหตุ ER)', defaultLocation: 'หน้าประตูทางเข้าห้องฉุกเฉินและอุบัติเหตุ', lat: 6.6218, lng: 100.0686 },
  { district: 'เมืองสตูล', facilityType: 'สสจ. / สสอ. (สำนักงานสาธารณสุข)', name: 'สำนักงานสาธารณสุขจังหวัดสตูล (สสจ.สตูล)', defaultLocation: 'ชั้น 1 อาคารอำนวยการ โถงต้อนรับ', lat: 6.6192, lng: 100.0715 },
  { district: 'เมืองสตูล', facilityType: 'สสจ. / สสอ. (สำนักงานสาธารณสุข)', name: 'สำนักงานสาธารณสุขอำเภอเมืองสตูล (สสอ.เมืองสตูล)', defaultLocation: 'หน้าห้องบริการประชาชน ชั้น 1', lat: 6.6251, lng: 100.0642 },
  { district: 'เมืองสตูล', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ตำมะลัง', defaultLocation: 'จุดคัดกรองผู้รับบริการ ชั้น 1', lat: 6.5385, lng: 100.0489 },
  { district: 'เมืองสตูล', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ฉลุง', defaultLocation: 'หน้าห้องตรวจโรคฉุกเฉิน', lat: 6.7214, lng: 100.0635 },
  { district: 'เมืองสตูล', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.เกาะสาหร่าย', defaultLocation: 'โถงกลางปฐมพยาบาล', lat: 6.5512, lng: 99.8214 },
  { district: 'เมืองสตูล', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.เกาะหลีเป๊ะ (สถานีอนามัยเฉลิมพระเกียรติ)', defaultLocation: 'หน้าอาคารบริการปฐมพยาบาลนักท่องเที่ยว', lat: 6.4912, lng: 99.3045 },
  { district: 'เมืองสตูล', facilityType: 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.', name: 'ท่าเทียบเรือท่องเที่ยวตำมะลัง (จุดผ่านแดนทางน้ำสตูล-มาเลเซีย)', defaultLocation: 'เสาติดตั้ง AED จุดตรวจหนังสือเดินทางขาออก', lat: 6.5412, lng: 100.0468 },
  { district: 'เมืองสตูล', facilityType: 'ศูนย์รับแจ้งเหตุและสั่งการ / หน่วยกู้ชีพ 1669', name: 'ศูนย์สั่งการกู้ชีพ 1669 สตูล (EMS Center)', defaultLocation: 'ห้องวิทยุสื่อสารและเตรียมพร้อมรถกู้ชีพ', lat: 6.6220, lng: 100.0690 },

  // ละงู
  { district: 'ละงู', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลละงู', defaultLocation: 'หน้าห้องอุบัติเหตุ-ฉุกเฉิน ER', lat: 6.8835, lng: 99.7842 },
  { district: 'ละงู', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ปากบารา', defaultLocation: 'จุดคัดกรองหน้าอาคารบริการ', lat: 6.8489, lng: 99.7345 },
  { district: 'ละงู', facilityType: 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.', name: 'ท่าเทียบเรือปากบารา (ศูนย์บริการนักท่องเที่ยวเกาะตะรุเตา-หลีเป๊ะ)', defaultLocation: 'อาคารผู้โดยสารขาออก ท่าเทียบเรือปากบารา', lat: 6.8475, lng: 99.7328 },
  { district: 'ละงู', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.กำแพง', defaultLocation: 'หน้าห้องปฐมพยาบาลเบื้องต้น', lat: 6.8812, lng: 99.7912 },
  { district: 'ละงู', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.เขาขาว', defaultLocation: 'จุดบริการคัดกรอง ชั้น 1', lat: 6.9123, lng: 99.8145 },

  // ควนกาหลง
  { district: 'ควนกาหลง', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลควนกาหลง', defaultLocation: 'โถงทางเข้าแผนกอุบัติเหตุ-ฉุกเฉิน', lat: 6.8451, lng: 100.0792 },
  { district: 'ควนกาหลง', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ทุ่งนุ้ย', defaultLocation: 'บริเวณหน้าเคาน์เตอร์พยาบาล', lat: 6.8124, lng: 100.1456 },
  { district: 'ควนกาหลง', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.อุไดเจริญ', defaultLocation: 'จุดปฐมพยาบาลฉุกเฉิน', lat: 6.8912, lng: 100.0345 },

  // ท่าแพ
  { district: 'ท่าแพ', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลท่าแพ', defaultLocation: 'หน้าห้องเวชระเบียนและจุดปฐมพยาบาล', lat: 6.7462, lng: 99.9334 },
  { district: 'ท่าแพ', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ท่าแพ', defaultLocation: 'จุดคัดกรองผู้ป่วย ชั้น 1', lat: 6.7412, lng: 99.9289 },
  { district: 'ท่าแพ', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.แป-ระ', defaultLocation: 'หน้าห้องตรวจรักษา', lat: 6.7789, lng: 99.9567 },

  // ทุ่งหว้า
  { district: 'ทุ่งหว้า', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลทุ่งหว้า', defaultLocation: 'หน้าแผนกผู้ป่วยนอกและอุบัติเหตุ', lat: 7.1035, lng: 99.7570 },
  { district: 'ทุ่งหว้า', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.นาทอน', defaultLocation: 'จุดบริการผู้ป่วยนอก', lat: 7.0456, lng: 99.7891 },
  { district: 'ทุ่งหว้า', facilityType: 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.', name: 'ศูนย์บริการนักท่องเที่ยวอุทยานธรณีโลกสตูล (Satun Geopark Thung Wa)', defaultLocation: 'โถงนิทรรศการหลัก ชั้น 1', lat: 7.1124, lng: 99.7612 },

  // ควนโดน
  { district: 'ควนโดน', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลควนโดน', defaultLocation: 'หน้าเคาน์เตอร์พยาบาลห้องฉุกเฉิน', lat: 6.7731, lng: 100.1262 },
  { district: 'ควนโดน', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ควนสตอ', defaultLocation: 'จุดคัดกรองผู้รับบริการ', lat: 6.7923, lng: 100.1145 },
  { district: 'ควนโดน', facilityType: 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.', name: 'จุดบริการปฐมพยาบาล ด่านพรมแดนวังประจัน (ชายแดนไทย-มาเลเซีย)', defaultLocation: 'อาคารตรวจคนเข้าเมือง ด่านวังประจัน', lat: 6.6912, lng: 100.1890 },

  // มะนัง
  { district: 'มะนัง', facilityType: 'รพศ./รพท./รพช. (โรงพยาบาล)', name: 'โรงพยาบาลมะนัง', defaultLocation: 'หน้าห้องตรวจฉุกเฉิน ER', lat: 6.9674, lng: 99.9841 },
  { district: 'มะนัง', facilityType: 'รพ.สต. / สอน. (โรงพยาบาลส่งเสริมสุขภาพตำบล)', name: 'รพ.สต.ปาล์มพัฒนา', defaultLocation: 'โถงบริการผู้ป่วย ชั้น 1', lat: 6.9912, lng: 99.9456 },
  { district: 'มะนัง', facilityType: 'จุดบริการสาธารณะ / แหล่งท่องเที่ยวภายใต้การดูแล สธ.', name: 'ศูนย์บริการนักท่องเที่ยวถ้ำภูผาเพชร', defaultLocation: 'จุดปฐมพยาบาล ทางขึ้นถ้ำภูผาเพชร', lat: 7.1245, lng: 99.9982 }
];

export const POPULAR_AED_BRANDS = [
  { brand: 'Philips', models: ['HeartStart FRx', 'HeartStart OnSite (HS1)', 'HeartStart FR3'] },
  { brand: 'Zoll', models: ['AED Plus', 'AED 3', 'AED Pro'] },
  { brand: 'Mindray', models: ['BeneHeart C1A', 'BeneHeart C2', 'BeneHeart D1'] },
  { brand: 'Stryker / Physio-Control', models: ['LIFEPAK CR2', 'LIFEPAK CR Plus', 'LIFEPAK 1000'] },
  { brand: 'Schiller', models: ['FRED PA-1', 'FRED easyport', 'DEFIGARD Touch 7'] },
  { brand: 'Cardiac Science', models: ['Powerheart G5', 'Powerheart G3 Plus'] },
  { brand: 'Nihon Kohden', models: ['Cardiolife AED-3100', 'Cardiolife AED-2150'] },
  { brand: 'CU Medical Systems', models: ['i-PAD NF1200', 'i-PAD CU-SP1'] },
  { brand: 'Mediana', models: ['HeartOn A15', 'HeartOn A10'] }
];
