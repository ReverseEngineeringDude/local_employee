import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeProfile } from './components/EmployeeProfile';
import { FilterBar } from './components/FilterBar';
import { ThemeProvider } from './components/ThemeProvider';
import employeesData from './data/employees.json'; // Import local JSON data

interface Employee {
  id: string;
  name: string;
  profession: string;
  location: string;
  phone: string;
  email: string | null;
  rating: number;
  skills: string[];
  availability: string;
  photo_url: string | null;
  description: string;
  experience_years: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [...new Set(employeesData.map((emp) => emp.location))];

  useEffect(() => {
    // Simulate fetching data from a local JSON file
    setEmployees(employeesData as Employee[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterAndSortEmployees();
  }, [employees, searchQuery, sortBy, selectedLocation]);

  const filterAndSortEmployees = () => {
    let filtered = [...employees];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.profession.toLowerCase().includes(query) ||
          emp.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter((emp) => emp.location === selectedLocation);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredEmployees(filtered);
  };

  const handleCategorySelect = (category: string) => {
    setSearchQuery(category);
  };

  const handleViewProfile = (id: string) => {
    setSelectedEmployee(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseProfile = () => {
    setSelectedEmployee(null);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  if (selectedEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <EmployeeProfile employeeId={selectedEmployee} onClose={handleCloseProfile} />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

        {!searchQuery && <Categories onSelectCategory={handleCategorySelect} />}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredEmployees.length}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />

          <EmployeeList
            employees={filteredEmployees}
            loading={loading}
            onViewProfile={handleViewProfile}
          />
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              © 2024 LocalConnect. Connecting you with trusted local service providers.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
