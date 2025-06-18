import React from 'react';
import { Search, X, FileText } from 'lucide-react';
import { GenerationFilter } from '../types/FamilyMember';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: GenerationFilter;
  setActiveFilter: (filter: GenerationFilter) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter
}) => {
  const filters: GenerationFilter[] = [
    'All',
    'Birthday Soon',
    'Living',
    'Deceased',
    'Greatest Generation',
    'Silent Generation',
    'Baby Boomer',
    'Generation X',
    'Millennial',
    'Generation Z',
    'Generation Alpha',
    'Generation Beta'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search family members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {activeFilter !== 'All' && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            <span className="mr-2">{activeFilter}</span>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <a
          href="/Gennetten Directory.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Don's Latest Directory (pdf)
        </a>
      </div>
    </div>
  );
};

export default SearchBar;