import { EmployeeCard } from './EmployeeCard';
import { Loader2, UserX } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Employee = Database['public']['Tables']['employees']['Row'];

interface EmployeeListProps {
  employees: Employee[];
  loading: boolean;
  onViewProfile: (id: string) => void;
}

export function EmployeeList({ employees, loading, onViewProfile }: EmployeeListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-600">Loading service providers...</span>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <UserX className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
}
