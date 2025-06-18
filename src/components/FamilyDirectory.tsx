import React, { useState, useMemo } from 'react';
import { Users, LogOut } from 'lucide-react';
import { familyMembers } from '../data/familyData';
import { GenerationFilter, FamilyMember } from '../types/FamilyMember';
import { isBirthdaySoon, calculateAge, calculateLivedAge } from '../utils/generationUtils';
import SearchBar from './SearchBar';
import FamilyMemberCard from './FamilyMemberCard';

interface FamilyDirectoryProps {
  onLogout: () => void;
}

const getSortAge = (member: FamilyMember) => {
  if (member.deceased && member.deathDate) {
    return calculateLivedAge(member.birthdayDate, member.deathDate);
  }
  return calculateAge(member.birthdayDate);
};

const FamilyDirectory: React.FC<FamilyDirectoryProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<GenerationFilter>('All');

  const filteredMembers = useMemo(() => {
    let filtered = familyMembers;

    // Apply generation filter
    if (activeFilter !== 'All') {
      if (activeFilter === 'Birthday Soon') {
        filtered = filtered.filter(member => isBirthdaySoon(member.birthdayDate) && !member.deceased);
      } else if (activeFilter === 'Deceased') {
        filtered = filtered.filter(member => member.deceased);
      } else if (activeFilter === 'Living') {
        filtered = filtered.filter(member => !member.deceased);
      } else {
        filtered = filtered.filter(member => member.generation === activeFilter);
      }
    }

    // Apply search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.phone.includes(term) ||
        member.address.toLowerCase().includes(term)
      );
    }

    // Sort by age (oldest first)
    return filtered.sort((a, b) => getSortAge(b) - getSortAge(a));
  }, [searchTerm, activeFilter]);

  const totalMembers = familyMembers.length;
  const livingMembers = familyMembers.filter(member => !member.deceased).length;
  const deceasedMembers = familyMembers.filter(member => member.deceased).length;
  const upcomingBirthdays = familyMembers.filter(member => isBirthdaySoon(member.birthdayDate) && !member.deceased).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center flex-1">
              <Users className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">Extended Family Directory</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200 shadow-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Connecting generations, preserving memories
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-semibold text-blue-600">{totalMembers}</span> Total Members
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-semibold text-green-600">{livingMembers}</span> Living
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-semibold text-gray-600">{deceasedMembers}</span> Deceased
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-semibold text-yellow-600">{upcomingBirthdays}</span> Upcoming Birthdays
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="font-semibold text-purple-600">{filteredMembers.length}</span> Currently Shown
            </div>
          </div>
        </header>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No family members found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <FamilyMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyDirectory;