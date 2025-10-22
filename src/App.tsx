import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SellPage from './pages/SellPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import BrowsePage from './pages/BrowsePage';
import TrendingPage from './pages/TrendingPage';
import HelpCenterPage from './pages/HelpCenterPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import ContactUsPage from './pages/ContactUsPage';
import ReportIssuePage from './pages/ReportIssuePage';
import LearnMorePage from './pages/LearnMorePage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider, useAuth } from './firebase/AuthProvider';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
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

const testimonials = [
  {
    name: 'Jessica Park',
    role: 'Computer Science Student',
    content: 'Sold my old textbooks for next semester\'s tuition. The platform makes it so easy to connect with other students!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e605?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Michael Chen',
    role: 'Business Major',
    content: 'Found the perfect desk for my dorm room at half the retail price. Love supporting fellow students!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Amanda Rodriguez',
    role: 'Engineering Student',
    content: 'The tutoring marketplace helped me find a great math tutor. My grades improved significantly!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  }
];

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [view, setView] = useState<'home' | 'login' | 'signup' | 'sell' | 'notifications' | 'messages' | 'browse' | 'trending' | 'learn' | 'dashboard' | 'help' | 'safety' | 'contact' | 'report'>('home');
  const { user } = useAuth();

  // Use effect to automatically move to dashboard when user signs in
  useEffect(() => {
    if (user) {
      setView('dashboard');
    } else {
      // if user signed out, return to home
      setView(prev => (prev === 'dashboard' ? 'home' : prev));
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

  return (
    <div className="min-h-screen bg-background background-catty">
      <Header 
        onLogin={() => setView('login')} 
        onSignUp={() => setView('signup')} 
        onSell={() => setView('sell')}
        onNotifications={() => setView('notifications')}
        onMessages={() => setView('messages')}
        onBrowse={() => setView('browse')}
        notificationCount={3}
        messageCount={2}
      />

    <main>
      {view === 'home' && (
        <>
          {/* Hero Section */}
          <HeroSection 
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />

          {/* Category Grid */}
          <CategoryGrid onCategorySelect={handleCategorySelect} />

          {/* Featured Products */}
          <FeaturedProducts 
            onFavorite={handleFavorite}
            onMessage={handleMessage}
          />
        </>
      )}

      {/* Feature cards + CTA: only show to unauthenticated users on home */}
      {view === 'home' && !user && (
        <>
          <section className="py-16 bg-brand-soft">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose SleekRoad?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Built for local communities. SleekRoad gives you a modern, safe, and beautiful way
                  to buy and sell nearby — fast.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className={`inline-flex p-4 rounded-2xl ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-foreground" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-16 bg-brand-soft">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Ready to Ride with SleekRoad?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Start buying and selling locally with a clean, curated experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="black" className="gap-2 px-6 h-12">
                    <CheckCircle className="w-5 h-5 text-white" />
                    Sign Up Now
                  </Button>
                  <Button size="lg" variant="ghost" className="bg-white text-foreground px-6 h-12 gap-2 rounded-md">
                    Learn More
                    <ArrowRight className="w-5 h-5 text-foreground" />
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 mt-8 text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Student verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Secure messaging</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

  {view === 'signup' && <SignUpPage onBack={() => setView('home')} />}
  {view === 'login' && <LoginPage onBack={() => setView('home')} />}
  {view === 'sell' && <SellPage onBack={() => setView('home')} />}
  {view === 'notifications' && <NotificationsPage onBack={() => setView('home')} />}
  {view === 'messages' && <MessagesPage onBack={() => setView('home')} />}
  {view === 'browse' && <BrowsePage onBack={() => setView('home')} />}
  {view === 'trending' && <TrendingPage onBack={() => setView('home')} />}
  {view === 'learn' && <LearnMorePage onBack={() => setView('home')} />}
  {view === 'dashboard' && <DashboardPage onBack={() => setView('home')} />}
  {view === 'help' && <HelpCenterPage onBack={() => setView('home')} />}
  {view === 'safety' && <SafetyTipsPage onBack={() => setView('home')} />}
  {view === 'contact' && <ContactUsPage onBack={() => setView('home')} />}
  {view === 'report' && <ReportIssuePage onBack={() => setView('home')} />}

      {/* Features and CTA are handled above (rendered only for unauthenticated users) */}
    </main>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl">S</span>
              <span className="font-bold text-xl">SleekRoad</span>
            </div>
            <p className="text-gray-400 text-sm">
              A modern local marketplace connecting neighbors and campus communities.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Browse Items</li>
              <li>Sell Items</li>
              <li>Services</li>
              <li>Tutoring</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button className="hover:text-white transition-colors" onClick={() => setView('help')}>Help Center</button>
              </li>
              <li>
                <button className="hover:text-white transition-colors" onClick={() => setView('safety')}>Safety Tips</button>
              </li>
              <li>
                <button className="hover:text-white transition-colors" onClick={() => setView('contact')}>Contact Us</button>
              </li>
              <li>
                <button className="hover:text-white transition-colors" onClick={() => setView('report')}>Report Issue</button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 SleekRoad. All rights reserved. Made for local communities.</p>
        </div>
      </div>
    </footer>
    </div>
  );
}