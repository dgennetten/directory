export const getGeneration = (birthYear: number): string => {
  if (birthYear >= 1901 && birthYear <= 1927) return 'Greatest Generation';
  if (birthYear >= 1928 && birthYear <= 1945) return 'Silent Generation';
  if (birthYear >= 1946 && birthYear <= 1964) return 'Baby Boomer';
  if (birthYear >= 1965 && birthYear <= 1980) return 'Generation X';
  if (birthYear >= 1981 && birthYear <= 1996) return 'Millennial';
  if (birthYear >= 1997 && birthYear <= 2012) return 'Generation Z';
  if (birthYear >= 2013 && birthYear <= 2028) return 'Generation Alpha';
  if (birthYear >= 2029 && birthYear <= 2044) return 'Generation Beta';
  return 'Unknown';
};

export const parseBirthday = (birthdayStr: string): Date => {
  if (!birthdayStr.trim()) return new Date();
  
  const [day, month, year] = birthdayStr.split('-');
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  let fullYear: number;
  const yearNum = parseInt(year);
  
  // Handle 2-digit years - assume 19xx for years >= 25, 20xx for < 25
  if (yearNum < 100) {
    fullYear = yearNum >= 25 ? 1900 + yearNum : 2000 + yearNum;
  } else {
    fullYear = yearNum;
  }
  
  return new Date(fullYear, monthMap[month] || 0, parseInt(day));
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const isBirthdaySoon = (birthDate: Date): boolean => {
  const today = new Date();
  const thisYear = today.getFullYear();
  
  // Create birthday for this year and next year
  const thisYearBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
  const nextYearBirthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate());
  
  // Check if birthday already passed this year
  const birthdayToCheck = thisYearBirthday < today ? nextYearBirthday : thisYearBirthday;
  
  // Calculate days difference
  const timeDiff = birthdayToCheck.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return daysDiff <= 30 && daysDiff >= 0;
};

export const getGenerationColor = (generation: string): string => {
  const colors: { [key: string]: string } = {
    'Greatest Generation': 'bg-purple-100 border-purple-300 text-purple-800',
    'Silent Generation': 'bg-blue-100 border-blue-300 text-blue-800',
    'Baby Boomer': 'bg-green-100 border-green-300 text-green-800',
    'Generation X': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'Millennial': 'bg-orange-100 border-orange-300 text-orange-800',
    'Generation Z': 'bg-red-100 border-red-300 text-red-800',
    'Generation Alpha': 'bg-pink-100 border-pink-300 text-pink-800',
    'Generation Beta': 'bg-indigo-100 border-indigo-300 text-indigo-800'
  };
  return colors[generation] || 'bg-gray-100 border-gray-300 text-gray-800';
};