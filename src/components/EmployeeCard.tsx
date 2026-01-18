import { Star, MapPin, Phone, Briefcase } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Employee = Database['public']['Tables']['employees']['Row'];

interface EmployeeCardProps {
  employee: Employee;
  onViewProfile: (id: string) => void;
}

export function EmployeeCard({ employee, onViewProfile }: EmployeeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative">
        {employee.photo_url ? (
          <img
            src={employee.photo_url}
            alt={employee.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Briefcase className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black bg-opacity-50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-white">
            {employee.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{employee.name}</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{employee.profession}</p>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{employee.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{employee.experience_years} years experience</span>
          </div>
        </div>

        {employee.skills.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {employee.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {employee.skills.length > 3 && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  +{employee.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onViewProfile(employee.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors font-semibold text-sm"
          >
            View Profile
          </button>
          <a
            href={`tel:${employee.phone}`}
            className="flex items-center justify-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-500 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
