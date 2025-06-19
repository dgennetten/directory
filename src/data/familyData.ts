import { FamilyMember } from '../types/FamilyMember';
import { parseBirthday, getGeneration, parseDeathDate, calculateAge, calculateLivedAge } from '../utils/generationUtils';

const rawData = [
  ['Wm Gardner', '', '', '', '26-Jan-1906', true, '15-Mar-1985'],
  ['Ellen Gardner', '', '', '', '17-Feb-1907', true, '22-Jul-1992'],
  ['Delbert Gennetten', '', '', '', '15-Jan-27', true, '11-Apr-2017'],
  ['Virginia Gennetten', '', '', '', '18-Nov-28', true, '21-May-2020'],
  ['Gary Ordway', '(515) 240-6393', '', '', '10-Feb-42', false, ''],
  ['Linda Ordway', '(515) 490-6710', '', '', '17-Apr-41', false, ''],
  ['Judy Wesslen', '', '', '', '17-Sep-50', true, '12-Nov-2018'],
  ['Jim Brauer', '', 'brauer.jim@me.com', '9232 E Arizona Cypress Pl, Tucson, AZ. 85641', '', false, ''],
  ['Janell Brauer', '(720) 449-6159', 'janellbrauer@yahoo.com', '9232 E Arizona Cypress Pl, Tucson, AZ. 85641', '31-Jan-52', false, ''],
  ['Don Gennetten', '(303) 585-1147', 'dongennetten@yahoo.com', '12896 W Arizona Pl, Lakewood, CO 80228', '23-Jun-54', false, ''],
  ['Donald Gennetten (Eddie Guner)', '804-467-5723', 'donaldjg78@yahoo.com', '9112 Old Mayland Wy, Henrico, VA, 23294', '', false, ''],
  ['Douglas Gennetten', '(970) 449-2302', 'douglas@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '12-Mar-56', false, ''],
  ['Diane Gennetten', '', 'dianeordway@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '24-Sep-68', false, ''],
  ['Joel Brauer', '', '', 'heaven', '18-Jun-1978', true, '25-Apr-2023'],
  ['Jonathan Brauer', '(240) 604-8511', 'jonbrauer2@gmail.com', '3430 Watershed Blvd, Laurel, MD 20724', ' ', false, ''],
  ['Jeff Joice', '(303) 906-8229', 'jajoice@yahoo.com', '7469 S Teller St, Littleton, CO 80128', ' ', false, ''],
  ['Jodi Joice', '(720) 840-1717', 'jodijoice@rocketmail.com', '7469 S Teller St, Littleton, CO 80128', ' ', false, ''],
  ['Angeline Brauer', '(240) 280-4341', 'angberda@gmail.com', '3430 Watershed Blvd, Laurel, MD 20724', ' ', false, ''],
  ['Darren Gennetten', '(970) 825-8593', 'darren@gennetten.com', '', '07-Apr-86', false, ''],
  ['Landon A', '(970) 219-6075', 'landon.atlas@protonmail.com', '2225 Pineview Cir, Spartanburg, SC 29302', '19-Jul-88', false, ''],
  ['Kelley Atlas', '(678) 794-7419', 'kelley.atlas@gmail.com', '2225 Pineview Cir, Spartanburg, SC 29302', '', false, ''],
  ['Evan Gennetten', '(720) 487-6513', 'evan@gennetten.org', '15462 117th Ave, Commerce City, CO 80022', '07-May-97', false, ''],
  ['Luca Ordway', '(970) 214-8802', '', '', '07-Apr-00', false, ''],
  ['Anthony Ordway', '(970) 481-4362', '', '', '03-Nov-01', false, ''],
  ['Noah Ordway Rodriguez', '(970) 508-7018', 'noah@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '21-Oct-07', false, ''],
  ['Isabella Ordway Rodriguiz', '(970) 231-1316', 'isabella@gennetten.com', '1234 Trappers Pt, Fort Collins, CO. 80524', '03-Jun-09', false, ''],
  ['Jade Atlas', '', '', '2225 Pineview Cir, Spartanburg, SC 29302', '06-Jun-19', false, ''],
  ['Julian Atlas', '', '', '2225 Pineview Cir, Spartanburg, SC 29302', '13-Oct-22', false, ''],
];

// Sort rawData by age (oldest first)
const sortedRawData = rawData.sort((a, b) => {
  const birthdayA = parseBirthday(String(a[4]));
  const birthdayB = parseBirthday(String(b[4]));
  const deathDateA = parseDeathDate(String(a[6] || ''));
  const deathDateB = parseDeathDate(String(b[6] || ''));
  
  // Calculate ages for sorting
  const ageA = Boolean(a[5]) && deathDateA 
    ? calculateLivedAge(birthdayA, deathDateA) 
    : calculateAge(birthdayA);
  const ageB = Boolean(b[5]) && deathDateB 
    ? calculateLivedAge(birthdayB, deathDateB) 
    : calculateAge(birthdayB);
  
  return ageB - ageA; // Oldest first
});

export const familyMembers: FamilyMember[] = sortedRawData
  .filter(row => String(row[0]).trim() !== '') // Filter out empty names
  .map((row, index) => {
    const birthdayDate = parseBirthday(String(row[4]));
    const deathDate = parseDeathDate(String(row[6] || ''));
    const generation = getGeneration(birthdayDate.getFullYear());
    
    return {
      id: `member-${index}`,
      name: String(row[0]),
      phone: String(row[1]),
      email: String(row[2]),
      address: String(row[3]),
      birthday: String(row[4]),
      generation,
      birthdayDate,
      deceased: Boolean(row[5]),
      dateOfDeath: row[6] ? String(row[6]) : undefined,
      deathDate: deathDate || undefined
    };
  });