import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, TrendingUp, Users, Shield } from 'lucide-react';
// import catImage from '../cat.png';

const quickCategories = [
  'Electronics', 'Textbooks', 'Furniture', 'Fashion', 'Software', 'Tutoring'
];

const stats: { label: string; value: string; icon: React.ComponentType<any>; }[] = [];

export function HeroSection({ onSearch, onCategorySelect }: { onSearch: (query: string) => void; onCategorySelect: (category: string) => void; }) {
  const [searchQuery, setSearchQuery] = useState('');

  // deterministic seeded RNG (persisted to localStorage) to keep decorations stable across reloads
  function mulberry32(seed: number) {
    return function () {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const catTransforms = useMemo(() => {
    const count = 10;
    // try to reuse a seed from localStorage so the layout is stable
    let seed = Date.now() & 0xffffffff;
    try {
      const stored = localStorage.getItem('sleekhub-hero-seed');
      if (stored) seed = Number(stored) || seed;
      else localStorage.setItem('sleekhub-hero-seed', String(seed));
    } catch (e) {
      // localStorage may be unavailable in some environments; fall back to Date.now()
    }
    const randBase = mulberry32(seed);
    const rand = (min: number, max: number) => randBase() * (max - min) + min;
    const positions: { left: number; top: number; angle: number; scale: number }[] = [];
    const minDist = 8; // minimum distance (in percent) between cats
    const centerRect = { left: 25, right: 75, top: 15, bottom: 55 }; // avoid center area

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      while (attempts < 200) {
        const left = Number(rand(2, 98).toFixed(2));
        const top = Number(rand(2, 88).toFixed(2));

        // skip positions that fall inside the central text area
        if (left > centerRect.left && left < centerRect.right && top > centerRect.top && top < centerRect.bottom) {
          attempts++;
          continue;
        }

        // ensure minimum spacing from existing cats
        let ok = true;
        for (const p of positions) {
          const dx = Math.abs(p.left - left);
          const dy = Math.abs(p.top - top);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            ok = false;
            break;
          }
        }

        if (ok) {
          positions.push({ left, top, angle: Math.round(rand(-30, 30)), scale: Number(rand(0.85, 1.15).toFixed(2)) });
          break;
        }

        attempts++;
      }

      // fallback if we couldn't find a spaced position
      if (positions.length <= i) {
        positions.push({ left: Number(rand(2, 98).toFixed(2)), top: Number(rand(2, 88).toFixed(2)), angle: Math.round(rand(-20, 20)), scale: 1 });
      }
    }

    return positions;
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
          {/* Simplified cat image segment */}
          {/* <div className="relative w-full">
            <div
              className="w-full bg-cover bg-center bg-no-repeat cat-segment"
              style={{ backgroundImage: `url(${catImage})` }}
              aria-hidden
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(234,223,198,0.6)]" />
            </div>
          </div> */}
          {/* Background decorations removed to show a clean white hero background */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <Badge className="badge-brand text-black px-4 py-2 text-sm font-medium">
              Community Marketplace
            </Badge><br></br>

            <h1 className="text-4xl lg:text-7xl font-charlsworth leading-tight mt-4">
              SleekRoad <br></br>Buy • Sell • Connect
              <span className="block hero-subtitle font-charlsworth text-base lg:text-lg mt-2">
                {/* A curated local marketplace for students and campus communities */}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
               A curated local marketplace for students and campus communities
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
                <div className="flex gap-3 p-2 bg-brand-soft rounded-2xl shadow-lg border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for textbooks, laptops, furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 border-0 text-lg h-12 focus-visible:ring-0"
                />
              </div>
              <Button 
                type="button"
                aria-label="Search marketplace"
                onClick={handleSearch}
                variant="black"
                className="px-8 h-12 hero-cta"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Popular categories:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickCategories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="rounded-full hover:bg-brand-soft hover:text-primary hover:border-primary/20"
                  onClick={() => onCategorySelect(category.toLowerCase())}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center">
                    <div className="p-3 bg-brand rounded-xl">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}