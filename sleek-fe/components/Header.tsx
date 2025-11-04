import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../firebase/AuthProvider';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  Plus, 
  Menu,
  ShoppingBag,
  Zap
} from 'lucide-react';

export function Header({ onLogin, onSignUp, onSell, onNotifications, onMessages, onBrowse, notificationCount = 0, messageCount = 0 }: { onLogin?: () => void; onSignUp?: () => void; onSell?: () => void; onNotifications?: () => void; onMessages?: () => void; onBrowse?: () => void; notificationCount?: number; messageCount?: number; }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3" aria-label="SleekRoad home">
              <img src="/file.svg" alt="SleekRoad" className="h-8 sm:h-10 w-auto" />
            </a>
            <Badge variant="secondary" className="hidden sm:flex gap-1.5 px-3 py-1 bg-green-50 text-green-700 border-green-200">
              <Zap className="w-3.5 h-3.5" />
              Verified
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-600 transition-colors" />
              <Input
                placeholder="Search electronics, books, furniture, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-11 w-full bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100 focus:bg-white transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            <Button type="button" aria-label="Sell an item" variant="black" className="gap-2 px-6 py-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={onSell}>
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">Sell Item</span>
            </Button>

              <div className="hidden sm:flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onNotifications} aria-label="Notifications" className="relative hover:bg-gray-100 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full p-0 flex items-center justify-center animate-pulse"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={onMessages} aria-label="Messages" className="relative hover:bg-gray-100 rounded-xl transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
                {messageCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full p-0 flex items-center justify-center animate-pulse"
                  >
                    {messageCount}
                  </Badge>
                )}
              </Button>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                    <Avatar className="w-9 h-9 border-2 border-gray-200">
                      {user.photoURL ? <AvatarImage src={user.photoURL} alt="avatar" /> : <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>}
                    </Avatar>
                    <div className="hidden md:block text-sm">
                      <div className="font-semibold text-gray-900">{user.displayName || user.email?.split('@')[0]}</div>
                      <div className="text-xs text-gray-500">Student Account</div>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => signOutUser()} className="hover:bg-red-50 hover:text-red-600 transition-all duration-200">Sign out</Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={onLogin} className="font-semibold hover:bg-gray-100 transition-all duration-200">Sign in</Button>
                  <Button variant="outline" onClick={onSignUp} className="font-semibold border-2 hover:bg-gray-900 hover:text-white transition-all duration-200">Sign up</Button>
                </>
              )}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={onBrowse} aria-label="Menu">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}