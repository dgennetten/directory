export interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
  age: number;
  generation: string;
  birthdayDate: Date;
  deceased: boolean;
  dateOfDeath?: string;
  deathDate?: Date;
}

export type GenerationFilter = 
  | 'All' 
  | 'Birthday Soon'
  | 'Deceased'
  | 'Living'
  | 'Greatest Generation' 
  | 'Silent Generation' 
  | 'Baby Boomer' 
  | 'Generation X' 
  | 'Millennial' 
  | 'Generation Z' 
  | 'Generation Alpha' 
  | 'Generation Beta';