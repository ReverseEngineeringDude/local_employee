import { Wrench, Zap, Hammer, Sparkles, Home, Paintbrush } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  { name: 'Plumber', icon: <Wrench className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' },
  { name: 'Electrician', icon: <Zap className="w-8 h-8" />, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' },
  { name: 'Carpenter', icon: <Hammer className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' },
  { name: 'Cleaner', icon: <Sparkles className="w-8 h-8" />, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' },
  { name: 'Painter', icon: <Paintbrush className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300' },
  { name: 'Home Repair', icon: <Home className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' },
];

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Service</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className={`${category.color} p-3 rounded-full group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
