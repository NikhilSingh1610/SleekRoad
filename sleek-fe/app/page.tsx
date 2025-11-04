"use client"

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AuthProvider, useAuth } from '../firebase/AuthProvider';
import Link from 'next/link';
import { Footer } from '../components/Footer';
import { FeatureCardsCTA } from '../components/FeatureCardsCTA';
import Loader from '../components/Loader';

import { 
  Shield, 
  MessageCircle, 
  TrendingUp, 
  Users,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Student Verified',
    description: 'All users verified with .edu emails for a safe community',
    gradient: 'bg-brand'
  },
  {
    icon: MessageCircle,
    title: 'In-App Messaging',
    description: 'Secure communication with buyers and sellers',
    gradient: 'bg-brand'
  },
  {
    icon: TrendingUp,
    title: 'Smart Pricing',
    description: 'AI-powered price suggestions based on market data',
    gradient: 'bg-brand'
  },
  {
    icon: Users,
    title: 'Campus Community',
    description: 'Connect with students from your university',
    gradient: 'bg-brand'
  }
];

export default function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show loader for 1 second

    return () => clearTimeout(timer);
  }, []);

  // Use effect to automatically move to dashboard when user signs in
  useEffect(() => {
    if (user) {
      // Redirect to dashboard or perform any other action
    } else {
      // if user signed out, return to home or perform any other action
    }
  }, [user]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
  };

  const handleFavorite = (productId: string) => {
    console.log('Favorited product:', productId);
  };

  const handleMessage = (productId: string) => {
    console.log('Message seller for product:', productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        notificationCount={3}
      />

      <main>
        {/* Hero Section */}
        <HeroSection 
          onSearch={handleSearch}
          onCategorySelect={handleCategorySelect}
        />

        {/* Featured Products */}
        <FeaturedProducts 
          onFavorite={handleFavorite}
          onMessage={handleMessage}
        />

        {/* Category Grid */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

        {/* Feature cards + CTA: only show to unauthenticated users on home */}
        {!user && <FeatureCardsCTA />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}