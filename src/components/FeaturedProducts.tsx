import * as React from 'react';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Flame, ChevronRight } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    title: 'MacBook Pro 13" M2 - Excellent Condition',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1643290369779-c6bec760cf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc1OTQxNjgyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'Like New' as const,
    seller: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e605?w=32&h=32&fit=crop&crop=face',
      rating: 4.9,
      verified: true
      ,
      email: 'sarah.chen@example.edu'
    },
    location: 'Main Campus',
    postedTime: '2h ago',
    category: 'Electronics',
    isFavorited: false
  },
  {
    id: '2',
    title: 'Calculus & Physics Textbook Bundle',
    price: 120,
    originalPrice: 400,
    image: 'https://images.unsplash.com/photo-1633707392225-d883c8cd3e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwdGV4dGJvb2slMjBzdGFja3xlbnwxfHx8fDE3NTk0OTA2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'Good' as const,
    seller: {
      name: 'Marcus Lee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      rating: 4.7,
      verified: true
      ,
      email: 'marcus.lee@example.edu'
    },
    location: 'North Dorms',
    postedTime: '5h ago',
    category: 'Books & Academic',
    isFavorited: true
  },
  {
    id: '3',
    title: 'Vintage Band T-Shirt Collection',
    price: 45,
    image: 'https://images.unsplash.com/photo-1634133118577-d70216e68eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZmFzaGlvbiUyMGNsb3RoZXN8ZW58MXx8fHwxNzU5NDkwNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'Good' as const,
    seller: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
      rating: 4.5,
      verified: false
      ,
      email: 'alex.rivera@example.edu'
    },
    location: 'South Campus',
    postedTime: '1d ago',
    category: 'Fashion & Style',
    isFavorited: false
  },
  {
    id: '4',
    title: 'Study Desk with Storage - Perfect for Dorms',
    price: 85,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1699831112447-9c8c803f584b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3JtJTIwZnVybml0dXJlJTIwZGVza3xlbnwxfHx8fDE3NTk0OTA2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'Good' as const,
    seller: {
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      rating: 4.8,
      verified: true
      ,
      email: 'emma.watson@example.edu'
    },
    location: 'West Hall',
    postedTime: '1d ago',
    category: 'Furniture & Living',
    isFavorited: false
  },
  {
    id: '5',
    title: 'iPhone 14 Pro - Space Black, 256GB',
    price: 750,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1557817683-5cfe3620b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk0NzcwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'Like New' as const,
    seller: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      rating: 4.9,
      verified: true
      ,
      email: 'david.kim@example.edu'
    },
    location: 'Engineering Building',
    postedTime: '3h ago',
    category: 'Electronics',
    isFavorited: true
  },
  {
    id: '6',
    title: 'Math Tutoring - Calculus & Statistics',
    price: 25,
    image: 'https://images.unsplash.com/photo-1704748082614-8163a88e56b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTk0MTYxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    condition: 'New' as const,
    seller: {
      name: 'Prof. Julia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e605?w=32&h=32&fit=crop&crop=face',
      rating: 5.0,
      verified: true
      ,
      email: 'julia.prof@example.edu'
    },
    location: 'Library',
    postedTime: '4h ago',
    category: 'Tutoring & Services',
    isFavorited: false
  }
];

interface FeaturedProductsProps {
  onFavorite?: (productId: string) => void;
  onMessage?: (productId: string, recipientEmail?: string) => void;
}

export function FeaturedProducts({ onFavorite, onMessage }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/10 dark:to-red-950/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground">Hot picks from the campus community</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2 group">
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Featured Badge */}
        <div className="flex justify-center mb-8">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
            🔥 Most Popular This Week
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <React.Fragment key={product.id}>
              <ProductCard
                product={product}
                onFavorite={onFavorite}
                onMessage={onMessage}
              />
            </React.Fragment>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Ready to start selling?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students earning money by selling items they no longer need.
            </p>
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              List Your First Item
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}