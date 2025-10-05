import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  ShoppingBag, 
  BookOpen, 
  Monitor, 
  Smartphone,
  Plus,
  ArrowRight,
  Search,
  Filter,
  Heart,
  Package,
  Zap,
  Sparkles,
  Trophy,
  MessageSquare,
  Eye,
  Star
} from 'lucide-react';

const categories = [
  { id: 'books', title: 'Textbooks', icon: BookOpen, count: 234, color: 'from-blue-500 to-cyan-500' },
  { id: 'electronics', title: 'Electronics', icon: Monitor, count: 189, color: 'from-purple-500 to-pink-500' },
  { id: 'furniture', title: 'Furniture', icon: ShoppingBag, count: 156, color: 'from-orange-500 to-red-500' },
  { id: 'phones', title: 'Phones', icon: Smartphone, count: 142, color: 'from-green-500 to-emerald-500' },
  { id: 'services', title: 'Services', icon: Users, count: 98, color: 'from-indigo-500 to-blue-500' },
  { id: 'clothing', title: 'Fashion', icon: Sparkles, count: 167, color: 'from-pink-500 to-rose-500' },
  { id: 'sports', title: 'Sports', icon: Trophy, count: 89, color: 'from-yellow-500 to-orange-500' },
  { id: 'other', title: 'More', icon: Package, count: 210, color: 'from-gray-500 to-slate-500' }
];

const trendingTags = ['Laptops', 'Dorm Furniture', 'Textbooks', 'iPhone', 'Study Desk', 'Bike'];

export default function DashboardPage({ onBack }: { onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Welcome Badge */}
            <Badge className="bg-beige-100/10 text-cream-100 border-beige-300/30 px-4 py-2 backdrop-blur-sm animate-fade-in">
              <Zap className="w-4 h-4 mr-2 inline" />
              Welcome to Your Marketplace
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold animate-slide-up text-cream-50">
              Discover. Buy. Sell.
            </h1>
            <p className="text-lg md:text-xl text-beige-200 max-w-2xl mx-auto animate-fade-in">
              Your campus marketplace with thousands of verified listings from students like you
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto animate-scale-in">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-beige-400" />
                <Input
                  placeholder="Search for textbooks, electronics, furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-14 pr-32 text-base bg-cream-50 border-beige-200 rounded-xl shadow-lg focus:ring-2 focus:ring-beige-300"
                />
                <Button 
                  variant="black" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-lg"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-sm text-beige-300">Trending:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-1.5 bg-beige-100/10 hover:bg-beige-100/20 rounded-full text-sm font-medium text-cream-100 transition-all duration-200 backdrop-blur-sm border border-beige-300/20"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-sm">
                <TrendingUp className="w-6 h-6 text-cream-50" />
              </div>
             
            </div>
            
              
            
        
          </div>

          {/* Featured Products */}
          <FeaturedProducts />
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-black">Browse Categories</h2>
              <p className="text-beige-600 mt-0.5">Find what you need by category</p>
            </div>
            <Button variant="outline" className="gap-2 border-beige-300 text-beige-700 hover:bg-beige-50 hover:border-beige-400">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="group p-6 cursor-pointer hover:shadow-md transition-all duration-300 border border-beige-200 bg-white overflow-hidden relative card-hover"
                >
                  {/* Subtle Background */}
                  <div className="absolute inset-0 bg-cream-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-xl bg-beige-100 group-hover:bg-beige-200 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 border border-beige-200">
                      <Icon className="w-8 h-8 text-beige-800" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black group-hover:text-beige-900 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-beige-600 mt-1">{category.count} items</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust Banner */}
        <Card className="p-8 bg-cream-100 border border-beige-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center">
                <Shield className="w-8 h-8 text-cream-50" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Safe & Verified</h3>
                <p className="text-beige-600 mt-1">All users verified with university emails</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">98%</div>
                <div className="text-sm text-beige-600">Trust Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">12k+</div>
                <div className="text-sm text-beige-600">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Star className="w-6 h-6 fill-beige-500 text-beige-500" />
                  <span className="text-3xl font-bold text-black">4.8</span>
                </div>
                <div className="text-sm text-beige-600">Avg Rating</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
