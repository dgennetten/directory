import React from 'react';
import { Phone, Mail, MapPin, Calendar, User, Heart } from 'lucide-react';
import { FamilyMember } from '../types/FamilyMember';
import { isBirthdaySoon, getGenerationColor, calculateWouldBeAge } from '../utils/generationUtils';

interface FamilyMemberCardProps {
  member: FamilyMember;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member }) => {
  const birthdaySoon = isBirthdaySoon(member.birthdayDate) && !member.deceased;
  const generationColorClass = getGenerationColor(member.generation);
  const wouldBeAge = calculateWouldBeAge(member.birthdayDate);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        birthdaySoon ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''
      } ${
        member.deceased ? 'bg-gray-50 border-gray-300' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h3 className={`text-xl font-bold ${
                birthdaySoon ? 'text-yellow-800' : 
                member.deceased ? 'text-gray-600' : 'text-gray-900'
              } mr-2`}>
                {member.name}
              </h3>
              {member.deceased && (
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <span className="ml-1 text-xs text-gray-500 font-medium">In Memory</span>
                </div>
              )}
            </div>
            {birthdaySoon && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full mb-2">
                🎂 Birthday Soon!
              </span>
            )}
            <div className="flex items-center text-gray-600 mb-2">
              <User className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {member.deceased ? (
                  <span>
                    Would be {wouldBeAge} • Lived {member.age} years
                  </span>
                ) : (
                  `Age ${member.age}`
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${generationColorClass}`}>
          {member.generation}
        </div>

        <div className="space-y-3">
          {member.birthday && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">
                {new Date(member.birthdayDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}

          {member.deceased && member.deathDate && (
            <div className="flex items-center text-gray-500">
              <Heart className="w-4 h-4 mr-3 text-red-400" />
              <span className="text-sm">
                Passed away {member.deathDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {member.phone && !member.deceased && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <a 
                href={`tel:${member.phone}`}
                className="text-sm hover:text-blue-600 transition-colors"
              >
                {member.phone}
              </a>
            </div>
          )}

          {member.phone && member.deceased && (
            <div className="flex items-center text-gray-500">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm">{member.phone}</span>
            </div>
          )}
          
          {member.email && !member.deceased && (
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <a 
                href={`mailto:${member.email}`}
                className="text-sm hover:text-blue-600 transition-colors break-all"
              >
                {member.email}
              </a>
            </div>
          )}

          {member.email && member.deceased && (
            <div className="flex items-center text-gray-500">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="text-sm break-all">{member.email}</span>
            </div>
          )}
          
          {member.address && (
            <div className="flex items-start text-gray-600">
              <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className={`text-sm leading-relaxed ${member.deceased ? 'text-gray-500' : ''}`}>
                {member.address}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyMemberCard;