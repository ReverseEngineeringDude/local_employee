import { ArrowUpDown, MapPin } from 'lucide-react';

interface FilterBarProps {
  sortBy: 'rating' | 'name';
  onSortChange: (sort: 'rating' | 'name') => void;
  totalResults: number;
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function FilterBar({
  sortBy,
  onSortChange,
  totalResults,
  locations,
  selectedLocation,
  onLocationChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> service providers found
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Filter by:</span>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'rating' | 'name')}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="rating">Highest Rated</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
