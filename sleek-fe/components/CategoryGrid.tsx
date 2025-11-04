import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Laptop, 
  BookOpen, 
  Shirt, 
  Armchair, 
  Code, 
  GraduationCap,
  Headphones,
  Calculator
} from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Laptop,
    count: 284,
  gradient: 'bg-brand',
    items: ['Laptops', 'Phones', 'Accessories']
  },
  {
    id: 'books',
    name: 'Books & Academic',
    icon: BookOpen,
    count: 512,
  gradient: 'bg-brand',
    items: ['Textbooks', 'Study Guides', 'Notebooks']
  },
  {
    id: 'fashion',
    name: 'Fashion & Style',
    icon: Shirt,
    count: 196,
  gradient: 'bg-brand',
    items: ['Clothing', 'Shoes', 'Accessories']
  },
  {
    id: 'furniture',
    name: 'Furniture & Living',
    icon: Armchair,
    count: 147,
  gradient: 'bg-brand',
    items: ['Desks', 'Chairs', 'Storage']
  },
  {
    id: 'software',
    name: 'Software & Digital',
    icon: Code,
    count: 89,
  gradient: 'bg-brand',
    items: ['Licenses', 'Tools', 'Resources']
  },
  {
    id: 'tutoring',
    name: 'Tutoring & Services',
    icon: GraduationCap,
    count: 156,
  gradient: 'bg-brand',
    items: ['Math', 'Science', 'Languages']
  },
  {
    id: 'audio',
    name: 'Audio & Music',
    icon: Headphones,
    count: 73,
  gradient: 'bg-brand',
    items: ['Headphones', 'Speakers', 'Instruments']
  },
  {
    id: 'supplies',
    name: 'Study Supplies',
    icon: Calculator,
    count: 201,
  gradient: 'bg-brand',
    items: ['Calculators', 'Stationery', 'Tech']
  }
];

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
          <p className="text-muted-foreground">Find exactly what you need for campus life</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {category.items.map((item, index) => (
                        <span 
                          key={index}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}