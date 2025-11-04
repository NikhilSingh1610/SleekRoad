import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../firebase/AuthProvider';
import { 
  Search, 
  Plus, 
  Menu,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { User, BarChart, FileText, Lock, Bug, LogOut } from 'lucide-react';

export function Header({ notificationCount = 0 }: { notificationCount?: number; }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOutUser } = useAuth(); // Use signOutUser instead of logout
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const router = useRouter(); // Initialize useRouter

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar:', !isSidebarOpen); // Debug log for state
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOutUser(); // Call the correct logout method
      router.push('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const categories = [
      'All Categories',
      'Clothes',
      'Shoes',
      'Books',
      'Tech Products',
      'Electronics',
      'Instruments',
      'Tutoring & Services',
      'Others'
    ];

    const matchedCategory = categories.find(
      (category) => category.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedCategory) {
      router.push(`/allitems?category=${matchedCategory}`);
    } else {
      alert('No category found');
    }
  };

  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.menu-button')
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideSidebar);

    return () => {
      document.removeEventListener('click', handleClickOutsideSidebar);
    };
  }, [isSidebarOpen]);

  return (
    <header className="w-full sticky py-2 top-0 z-50 backdrop-blur-lg supports-[backdrop-filter]:bg-white/30">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <img src="/logo.svg" alt="SleekRoad Logo" className="w-full h-full object-contain border rounded border-black" />
              </div>
              <span className="brand-title text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SleekRoad
              </span>
            </div>
            <Badge variant="secondary" className="hidden sm:flex gap-1.5 px-3 py-1 bg-green-50 text-green-700 border-green-200">
              <Zap className="w-3.5 h-3.5" />
              Verified
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6 hidden md:block"> {/* Hide search bar on small screens */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-600 transition-colors" />
              <Input
                placeholder="Search electronics, books, furniture, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
                className="pl-12 pr-4 h-11 w-full bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100 focus:bg-white transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button type="button" aria-label="Sell an item" variant="black" className="gap-2 px-6 py-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline font-semibold">Sell Item</span>
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden bg-green-200"
                  aria-label="Menu"
                  onClick={toggleSidebar} // Open sidebar on click
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button variant="outline" className="font-semibold border-2 hover:bg-gray-900 hover:text-white transition-all duration-200">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="h-full fixed inset-0 z-50 flex justify-end ">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar} // Close sidebar when clicking outside
          ></div>
          <div
            className={`w-64 bg-gradient-to-r from-green-300 to-green-500 h-full shadow-lg transform transition-transform duration-700 will-change-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} // Added will-change for smoother animation
          >
            <div className="p-4 border-b flex flex-col items-center bg-gradient-to-r from-green-300 to-green-600"> {/* Centered content */}
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border border-black" // Circular profile photo with black border
                />
              ) : (
                <div className="bg-gradient-to-r from-green-300 to-green-600 w-16 h-16 rounded-full border border-black flex items-center justify-center bg-gray-200">
                  <span className="text-lg font-bold text-gray-600">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-bold mt-2 ">Menu</h2>
            </div>
            <div className="p-4 space-y-2 bg-gradient-to-r from-green-300 to-green-600">
              <Link href="/profile">
                <div className="mb-4 flex items-center px-4 py-3 border border-green-800 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer font-medium">
                  <User className="mr-3 w-5 h-5" />
                  My Profile
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="mb-4 flex items-center px-4 py-3 border border-green-800 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer font-medium">
                  <BarChart className="mr-3 w-5 h-5" />
                  Dashboard
                </div>
              </Link>
              <Link href="/terms">
                <div className="mb-4 flex items-center px-4 py-3 border border-green-800 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer font-medium">
                  <FileText className="mr-3 w-5 h-5" />
                  Terms
                </div>
              </Link>
              <Link href="/privacy-policy">
                <div className="mb-4 flex items-center px-4 py-3 border border-green-800 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer font-medium">
                  <Lock className="mr-3 w-5 h-5" />
                  Privacy Policy
                </div>
              </Link>
              <Link href="/report-issue">
                <div className="mb-4 flex items-center px-4 py-3 border border-green-800 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer font-medium">
                  <Bug className="mr-3 w-5 h-5" />
                  Report Issue
                </div>
              </Link>
              <div
                onClick={handleLogout}
                className="mb-2 flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-800 cursor-pointer font-medium"
              >
                <LogOut className="mr-3 w-5 h-5" />
                Logout
              </div>
              <div className='h-80'></div>
              <div className='h-80'></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}