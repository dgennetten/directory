import { FamilyMember } from '../types/FamilyMember';
import { parseBirthday, calculateAge, getGeneration } from '../utils/generationUtils';

const rawData = [
  ['Wm Gardner', '', '', '', '26-Jan-1906', '119', true],
  ['Ellen Gardner', '', '', '', '17-Feb-1907', '118', true],
  ['Delbert Gennetten', '', '', '', '15-Jan-27', '98', true],
  ['Virginia Gennetten', '', '', '', '18-Nov-28', '96', true],
  ['Gary Ordway', '(515) 240-6393', '', '', '10-Feb-42', '83', false],
  ['Linda Ordway', '(515) 490-6710', '', '', '17-Apr-41', '84', false],
  ['Judy Wesslen', '', '', '', '17-Sep-50', '74', false],
  ['Janell Brauer', '(720) 449-6159', '', '', '31-Jan-52', '73', false],
  ['Don Gennetten', '(303) 585-1147', '', '', '23-Jun-54', '70', false],
  ['Douglas Gennetten', '(970) 449-2302', 'douglas@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '12-Mar-56', '69', false],
  ['Diane Gennetten', '', 'dianeordway@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '24-Sep-68', '56', false],
  ['Darren Gennetten', '(970) 825-8593', 'darren@gennetten.com', '', '07-Apr-86', '39', false],
  ['Landon A', '(970) 219-6075', 'landon@gennetten.com', '', '19-Jul-88', '36', false],
  ['Evan Gennetten', '(720) 487-6513', 'evan@gennetten.org', '', '07-May-97', '28', false],
  ['Luca Ordway', '(970) 214-8802', '', '', '07-Apr-00', '25', false],
  ['Anthony Ordway', '(970) 481-4362', '', '', '03-Nov-01', '23', false],
  ['Noah Ordway Rodriguez', '(970) 508-7018', 'noah@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '21-Oct-07', '17', false],
  ['Isabella Ordway Rodriguiz', '(970) 231-1316', 'isabella@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '03-Jun-09', '16', false],
  ['Jade Atlas', '', '', '', '06-Jun-19', '6', false],
  ['Julian Atlas', '', '', '', '13-Oct-22', '2', false]
];

export const familyMembers: FamilyMember[] = rawData
  .filter(row => row[0].trim() !== '') // Filter out empty names
  .map((row, index) => {
    const birthdayDate = parseBirthday(row[4]);
    const calculatedAge = calculateAge(birthdayDate);
    const generation = getGeneration(birthdayDate.getFullYear());
    
    return {
      id: `member-${index}`,
      name: row[0],
      phone: row[1],
      email: row[2],
      address: row[3],
      birthday: row[4],
      age: calculatedAge,
      generation,
      birthdayDate,
      deceased: row[6] as boolean
    };
  });