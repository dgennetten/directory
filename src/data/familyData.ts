import { FamilyMember } from '../types/FamilyMember';
import { parseBirthday, calculateAge, getGeneration, parseDeathDate, calculateLivedAge } from '../utils/generationUtils';

const rawData = [
  ['Wm Gardner', '', '', '', '26-Jan-1906', '119', true, '15-Mar-1985'],
  ['Ellen Gardner', '', '', '', '17-Feb-1907', '118', true, '22-Jul-1992'],
  ['Delbert Gennetten', '', '', '', '15-Jan-27', '98', true, '11-Apr-2017'],
  ['Virginia Gennetten', '', '', '', '18-Nov-28', '96', true, '21-May-2020'],
  ['Gary Ordway', '(515) 240-6393', '', '', '10-Feb-42', '83', false, ''],
  ['Linda Ordway', '(515) 490-6710', '', '', '17-Apr-41', '84', false, ''],
  ['Judy Wesslen', '', '', '', '17-Sep-50', '74', true, '18-Dec-2023'],
  ['Jim Brauer', '', '', '9232 E Arizona Cypress Pl, Tucson, AZ. 85641', '', '', false, ''],
  ['Janell Brauer', '(720) 449-6159', '', '9232 E Arizona Cypress Pl, Tucson, AZ. 85641', '31-Jan-52', '73', false, ''],
  ['Don Gennetten', '(303) 585-1147', 'dongennetten@yahoo.com', '12896 W Arizona Pl, Lakewood, CO 80228', '23-Jun-54', '70', false, ''],
  ['Nami Gennetten', '', '', 'Heaven', '23-Aug-1955', '', true, '07-Apr-2023'],
  ['Donald Gennetten (Eddie Guner)', '804-467-5723', 'donaldjg78@yahoo.com', '9112 Old Mayland Wy, Henrico, VA, 23294', '','', false, ''],
  ['Douglas Gennetten', '(970) 449-2302', 'douglas@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '12-Mar-56', '69', false, ''],
  ['Diane Gennetten', '', 'dianeordway@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '24-Sep-68', '56', false, ''],
  ['Joel Brauer', '', '', 'heaven', '18-Jun-1978', '', true, '25-Apr-2013'],
  ['Johathan Brauer', '(240) 604-8511', 'jonbrauer2@gmail.com', '3430 Watershed Blvd, Laurel, MD 20724', ' ', ' ', false, ''],
  ['Jeff Joice', '(303) 906-8229', 'jajoice@yahoo.com', '7469 S Teller St, Littleton, CO 80128', ' ', ' ', false, ''],
  ['Jodi Joice', '(720) 840-1717', 'jodijoice@rocketmail.com', '7469 S Teller St, Littleton, CO 80128', ' ', ' ', false, ''],
  ['Angeline Brauer', '(240) 280-4341', 'angberda@gmail.com', '3430 Watershed Blvd, Laurel, MD 20724', ' ', ' ', false, ''],
  ['Darren Gennetten', '(970) 825-8593', 'darren@gennetten.com', '', '07-Apr-86', '39', false, ''],
  ['Landon A', '(970) 219-6075', 'landon@gennetten.com', '2225 Pineview Cir, Spartanburg, SC 29302', '19-Jul-88', '36', false, ''],
  ['Kelley Atlas', '(678) 794-7419', '', '2225 Pineview Cir, Spartanburg, SC 29302', '', '', false, ''],
  ['Evan Gennetten', '(720) 487-6513', 'evan@gennetten.org', '', '07-May-97', '28', false, ''],
  ['Luca Ordway', '(970) 214-8802', '', '', '07-Apr-00', '25', false, ''],
  ['Anthony Ordway', '(970) 481-4362', '', '', '03-Nov-01', '23', false, ''],
  ['Noah Ordway Rodriguez', '(970) 508-7018', 'noah@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '21-Oct-07', '17', false, ''],
  ['Isabella Ordway Rodriguiz', '(970) 231-1316', 'isabella@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '03-Jun-09', '16', false, ''],
  ['Jade Atlas', '', '', '', '06-Jun-19', '6', false, ''],
  ['Julian Atlas', '', '', '', '13-Oct-22', '2', false, '']
];

export const familyMembers: FamilyMember[] = rawData
  .filter(row => String(row[0]).trim() !== '') // Filter out empty names
  .map((row, index) => {
    const birthdayDate = parseBirthday(String(row[4]));
    const deathDate = parseDeathDate(String(row[7] || ''));
    const calculatedAge = row[6] ? (deathDate ? calculateLivedAge(birthdayDate, deathDate) : calculateAge(birthdayDate)) : calculateAge(birthdayDate);
    const generation = getGeneration(birthdayDate.getFullYear());
    
    return {
      id: `member-${index}`,
      name: String(row[0]),
      phone: String(row[1]),
      email: String(row[2]),
      address: String(row[3]),
      birthday: String(row[4]),
      age: calculatedAge,
      generation,
      birthdayDate,
      deceased: Boolean(row[6]),
      dateOfDeath: row[7] ? String(row[7]) : undefined,
      deathDate: deathDate || undefined
    };
  });