import { ShifaAmalItem } from '../components/ShifaAlAsqamTab';
import { SHIFA_AMALS_PART_1 } from './shifaAlAsqamPart1';
import { SHIFA_AMALS_PART_2 } from './shifaAlAsqamPart2';
import { SHIFA_AMALS_PART_3 } from './shifaAlAsqamPart3';
import { SHIFA_AMALS_PART_4 } from './shifaAlAsqamPart4';
import { SHIFA_AMALS_PART_5, SHIFA_AMALS_51_TO_118 } from './shifaAlAsqamPart5';

// Complete Encyclopedic Catalog of ALL 118 Amals of "Shifa-ul-Asqam wa-al-Ahzan مع ضمیمہ جدیدہ"
// Authored by Hazrat Maulana Mohammad Omar Sarbazi (رحمہ اللہ)
export const SHIFA_AL_ASQAM_118_CATALOG: ShifaAmalItem[] = [
  ...SHIFA_AMALS_PART_1,
  ...SHIFA_AMALS_PART_2,
  ...SHIFA_AMALS_PART_3,
  ...SHIFA_AMALS_PART_4,
  ...SHIFA_AMALS_PART_5,
  ...SHIFA_AMALS_51_TO_118
];
